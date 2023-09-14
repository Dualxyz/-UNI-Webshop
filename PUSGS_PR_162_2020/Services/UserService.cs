using AutoMapper;
using EntityFramework.Exceptions.Common;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using PUSGS_PR_162_2020.DTO.LoginDTO;
using PUSGS_PR_162_2020.DTO.RegisterDTO;
using PUSGS_PR_162_2020.DTO.UserInfoDTO;
using PUSGS_PR_162_2020.Enums;
using PUSGS_PR_162_2020.Infrastructure;
using PUSGS_PR_162_2020.Interfaces;
using PUSGS_PR_162_2020.Models;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PUSGS_PR_162_2020.Services
{
    public class UserService : IUserService
    {
        private readonly APIDBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;

        public UserService(IConfiguration config, APIDBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _secretKey = config.GetSection("secret");
        }
        public List<UserResponseDTO> GetAllUsers()
        {
            return _mapper.Map<List<UserResponseDTO>>(_dbContext.Users.ToList());
        }

        public UserResponseDTO GetUserById(long id)
        {
            UserResponseDTO user = _mapper.Map<UserResponseDTO>(_dbContext.Users.Find(id));
            if (user == null)
            {
                throw new Exception("User doesn't exist with the provided ID");
            }

            return user;
        }

        public LoginResponseDTO LoginUser(LoginRequestDTO requestDto)
        {
            User? user = _dbContext.Users.FirstOrDefault(u => u.Email == requestDto.Email);
            if (user == null)
            {
                throw new Exception("Incorrect login credentials");
            }

            if (!BCrypt.Net.BCrypt.Verify(requestDto.Password, user.Password))
            {
                throw new Exception("Incorrect login credentials");
            }

            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("Id", user.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Role, user.Type.ToString()));

            //if (user.Type == AccType.SELLER && user.VerificationStatus == VerificationStatus.Accepted)
            //{
            //    claims.Add(new Claim("VerificationStatus", user.VerificationStatus.ToString()));
            //}

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));

            SigningCredentials signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken securityToken = new JwtSecurityToken(
                //issuer: "http://localhost",
                claims: claims,
                expires: DateTime.Now.AddMinutes(2),
                signingCredentials: signingCredentials
            );

            LoginResponseDTO responseDto = new LoginResponseDTO()
            {
                Id = user.Id,
                Token = new JwtSecurityTokenHandler().WriteToken(securityToken)
            };

            return responseDto;
        }

        public UserResponseDTO RegisterUser(RegisterRequestDTO requestDto)
        {
            User user = _mapper.Map<User>(requestDto);
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, BCrypt.Net.BCrypt.GenerateSalt());

            //Add verification status field (=

            try
            {
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
            }
            catch (UniqueConstraintException)
            {
                throw new Exception("Username/email already exist");
            }
            catch (Exception ex) { throw new Exception(ex.InnerException?.Message); }  

            return _mapper.Map<UserResponseDTO>(user);
        }

        public UserResponseDTO UpdateUser(long id, UserRequestDTO requestDto)
        {
            User? user = _dbContext.Users.Find(id);
            if(user != null)
            {
                _mapper.Map(requestDto, user);   
            } else
            {
                throw new Exception("User Not found");
            }

            try
            {
                _dbContext.SaveChanges();
                return _mapper.Map<UserResponseDTO>(user);
            } catch (Exception ex) { throw new Exception(ex.Message); }
        }
    }
}

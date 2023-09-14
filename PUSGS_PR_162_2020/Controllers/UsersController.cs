using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PUSGS_PR_162_2020.DTO.LoginDTO;
using PUSGS_PR_162_2020.DTO.RegisterDTO;
using PUSGS_PR_162_2020.DTO.UserInfoDTO;
using PUSGS_PR_162_2020.Infrastructure;
using PUSGS_PR_162_2020.Interfaces;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService service)
        {
            //_context = context;
            _userService = service;
        }

        // GET: api/Users
        [HttpGet]
        public IActionResult GetUsers()
        {
            return Ok(_userService.GetAllUsers());
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public IActionResult GetUser(long id)
        {
            UserResponseDTO userResponse;
            try
            {
                userResponse = _userService.GetUserById(id);
            } catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
            return Ok(userResponse);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public IActionResult PutUser(long id, [FromBody] UserRequestDTO requestDto)
        {
            //var smt = User.HasClaim("Id", id.ToString());
            //if (!User.HasClaim("Id", id.ToString()))
            //{
            //    return Forbid();
            //}

            UserResponseDTO user;

            try
            {
                user = _userService.UpdateUser(id, requestDto);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(user);
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult PostUser([FromBody] RegisterRequestDTO user)
        {
            UserResponseDTO userResponse;

            try
            {
                userResponse = _userService.RegisterUser(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(userResponse);
        }

        // DELETE: api/Users/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteUser(long id)
        //{
        //    if (_context.Users == null)
        //    {
        //        return NotFound();
        //    }
        //    var user = await _context.Users.FindAsync(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Users.Remove(user);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}


        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] LoginRequestDTO req)
        {
            LoginResponseDTO resp;

            try
            {
                resp = _userService.LoginUser(req);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(resp);
        }

        [HttpPost("verify/{id}")]
        //[Authorize(Roles = "Admin")]
        public IActionResult VerifyUser(long id, [FromBody] VerificationResponseDTO requestDto)
        {
            VerificationResponseDTO user;

            try
            {
                user = _userService.VerifyUser(id, requestDto);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

            return Ok(user);
        }
    }
}

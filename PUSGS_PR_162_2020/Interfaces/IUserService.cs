using PUSGS_PR_162_2020.DTO.LoginDTO;
using PUSGS_PR_162_2020.DTO.RegisterDTO;
using PUSGS_PR_162_2020.DTO.UserInfoDTO;

namespace PUSGS_PR_162_2020.Interfaces
{
    public interface IUserService
    {
        List<UserResponseDTO> GetAllUsers();
        UserResponseDTO GetUserById(long id);
        UserResponseDTO RegisterUser(RegisterRequestDTO requestDto);
        UserResponseDTO UpdateUser(long id, UserRequestDTO requestDto);
        LoginResponseDTO LoginUser(LoginRequestDTO requestDto);
        ////VerificationResponseDto VerifyUser(long id, VerificationRequestDto requestDto);
    }
}

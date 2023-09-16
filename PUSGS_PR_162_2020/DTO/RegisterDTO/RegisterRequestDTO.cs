using PUSGS_PR_162_2020.Enums;

namespace PUSGS_PR_162_2020.DTO.RegisterDTO
{
    public class RegisterRequestDTO
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Birthdate { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public UserRole Role { get; set; }
    }
}

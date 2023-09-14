using PUSGS_PR_162_2020.DTO.LoginDTO;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Interfaces.RepoInterfaces
{
    public interface IUserRepository
    {
        List<User> GetAllUsers();
        User? GetUserById(long id);
        User? FindUser(LoginRequestDTO user);
        User? AddUser(User user);
        void SaveChanges();

    }
}

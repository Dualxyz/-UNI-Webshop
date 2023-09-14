using PUSGS_PR_162_2020.DTO.LoginDTO;
using PUSGS_PR_162_2020.Infrastructure;
using PUSGS_PR_162_2020.Interfaces.RepoInterfaces;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly APIDBContext _dbContext;
        public UserRepository(APIDBContext dbContext)
        { 
            _dbContext = dbContext;
        }
        public User AddUser(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return user;
        }

        public User? FindUser(LoginRequestDTO user)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Email == user.Email);
        }

        public List<User> GetAllUsers()
        {
            return _dbContext.Users.ToList();
        }

        public User? GetUserById(long id)
        {
            return _dbContext.Users.Find(id);
        }

        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }
    }
}

using Microsoft.EntityFrameworkCore;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Infrastructure
{
    public class APIDBContext : DbContext
    {

        //Ask from program.cs to provide options to connect to the database (the connection string etc..)
        public APIDBContext(DbContextOptions options):base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }  //Will be used to create a table with migrations
    }
}

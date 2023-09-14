using Microsoft.EntityFrameworkCore;
using NuGet.Packaging.Signing;
using PUSGS_PR_162_2020.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PUSGS_PR_162_2020.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; }  = string.Empty;
        public string LastName { get; set;} = string.Empty;
        public string Address { get; set;} = string.Empty;
        public string Birthdate { get; set; } = string.Empty;
        public AccType Type { get; set; }
        public VerificationStatus VerificationStatus { get; set; }
        public List<Article>? Articles { get; set; }
        public List<Order>? Orders { get; set; }

        //Slika korisnika
    }
}

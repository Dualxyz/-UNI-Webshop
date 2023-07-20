using PUSGS_PR_162_2020.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PUSGS_PR_162_2020.Models
{
    public class User
    {
        [Key]
        public long Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(250)")]
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Name { get; set; }  = string.Empty;
        public string Surname { get; set;} = string.Empty;
        public string Adress { get; set;} = string.Empty;
        public AccType Type { get; set; }

        //Slika korisnika
    }
}

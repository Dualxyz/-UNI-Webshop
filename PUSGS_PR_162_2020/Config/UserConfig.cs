using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Config
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Username).IsRequired().HasMaxLength(100);

            builder.Property(x => x.Email).IsRequired().HasMaxLength(100);
            builder.HasIndex(x => x.Email).IsUnique();

            builder.Property(x => x.Password).IsRequired().HasMaxLength(200);

            builder.Property(x => x.FirstName).IsRequired().HasMaxLength(100);

            builder.Property(x => x.LastName).IsRequired().HasMaxLength(100);

            builder.Property(x => x.Birthdate).HasMaxLength(100);

            builder.Property(x => x.Address).IsRequired().HasMaxLength(100);

            builder.Property(x => x.Role).HasConversion<string>();

            builder.Property(x => x.VerificationStatus).HasConversion<string>();
        }
    }
}

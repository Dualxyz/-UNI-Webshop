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

            builder.Property(x => x.Username).IsRequired().HasMaxLength(24);
            builder.HasIndex(x => x.Username).IsUnique();

            builder.Property(x => x.Email).IsRequired().HasMaxLength(40);
            builder.HasIndex(x => x.Email).IsUnique();

            builder.Property(x => x.FirstName).IsRequired().HasMaxLength(24);
            builder.Property(x => x.LastName).IsRequired().HasMaxLength(24);
            builder.Property(x => x.Birthdate).IsRequired().HasMaxLength(24);
            builder.Property(x => x.Address).IsRequired().HasMaxLength(30);
            builder.Property(x => x.Type).HasConversion<string>();

            builder.Property(x => x.VerificationStatus).HasConversion<string>();

        }
    }
}

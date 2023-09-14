using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Config
{
    public class ArticleConfig : IEntityTypeConfiguration<Article>
    {
        public void Configure(EntityTypeBuilder<Article> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Name).IsRequired().HasMaxLength(30);

            builder.Property(x => x.Price).IsRequired();

            builder.Property(x => x.Quantity).IsRequired();

            builder.Property(x => x.Description).IsRequired().HasMaxLength(120);

            builder.HasOne(x => x.Seller).WithMany(x => x.Articles).HasForeignKey(x => x.SellerId);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PUSGS_PR_162_2020.Models;

namespace PUSGS_PR_162_2020.Config
{
    public class OrderConfig : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Quantity).IsRequired();

            builder.Property(x => x.Comment).HasMaxLength(120);

            builder.Property(x => x.Address).IsRequired().HasMaxLength(60);

            builder
                .HasOne(x => x.Article)
                .WithMany(x => x.Orders)
                .HasForeignKey(x => x.ArticleId);

            builder
                .HasOne(x => x.Buyer)
                .WithMany(x => x.Orders)
                .HasForeignKey(x => x.BuyerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(x => x.OrderStatus).HasConversion<string>();
        }
    }
}

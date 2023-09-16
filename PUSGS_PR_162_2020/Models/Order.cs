using PUSGS_PR_162_2020.Enums;

namespace PUSGS_PR_162_2020.Models
{
    public class Order
    {
        public long Id {  get; set; }
        public int Quantity { get; set; }
        public string? Address { get; set; }
        public string? Comment { get; set; }
        public long BuyerId { get; set; }
        public User? Buyer { get; set; }
        public Article? Article { get; set; }
        public long ArticleId { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? DeliveryTime { get; set; }
        public double? Price { get; set; }
    }
}

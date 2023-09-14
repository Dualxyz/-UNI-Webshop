namespace PUSGS_PR_162_2020.Models
{
    public class Article
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; } = string.Empty;
        public long SellerId { get; set; }
        public User? Seller { get; set; }
        public List<Order>? Orders { get; set; }
    }
}

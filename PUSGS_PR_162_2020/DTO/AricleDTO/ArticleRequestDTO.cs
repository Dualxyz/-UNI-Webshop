namespace PUSGS_PR_162_2020.DTO.AricleDTO
{
    public class ArticleRequestDTO
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; } = string.Empty;
        public long SellerId { get; set; }
    }
}

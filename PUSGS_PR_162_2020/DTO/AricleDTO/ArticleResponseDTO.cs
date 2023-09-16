namespace PUSGS_PR_162_2020.DTO.AricleDTO
{
    public class ArticleResponseDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public long SellerId { get; set; }
    }
}

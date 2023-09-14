namespace PUSGS_PR_162_2020.DTO.OrderDTO
{
    public class OrderRequestDTO
    {
        public int Quantity { get; set; }
        public string? Comment { get; set; }
        public string? Address { get; set; }
        public long ArticleId { get; set; }
    }
}

namespace Knowlify.Domain.DTOs.Review
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public string ReviewerId { get; set; }
        public int Rating { get; set; }
        public string RevieweeId { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;

    }
}

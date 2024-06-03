namespace Knowlify.Domain.DTOs.Review
{
    public class AddReviewDto
    {
        public string ReviewerId { get; set; }
        public int Rating { get; set; }
        public string RevieweeId { get; set; }
        public int BarterId { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;

    }
}

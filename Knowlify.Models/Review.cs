namespace Knowlify.Data.Models
{
    public class Review 
    {
        public int Id { get; set; }
        public int ReviewerId { get; set; }
        public User Reviewer { get; set; }
        public int Rating { get; set; }
        public int RevieweeId { get; set; }
        public User Reviewee { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }

    }
}


namespace Knowlify.Data.Models
{
    public class Barter
    {
        public int Id { get; set; }
        public string OfferedById { get; set; }
        public User OfferedBy { get; set; }
        public int SkillId { get; set; }
        public Skill Skill { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public int Credits { get; set; }
        public int TransactionId { get; set; }
        public string? ImageUrl { get; set; }
        public Transaction Transaction { get; set; }
        public DateTime DatePosted { get; set; } = DateTime.Now;
    }
}

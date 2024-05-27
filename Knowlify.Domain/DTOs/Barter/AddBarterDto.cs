
namespace Knowlify.Domain.DTOs.Barter
{
    public class AddBarterDto
    {
        public string OfferedById { get; set; }
        public int SkillId { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public int Credits { get; set; } = 0;
        public int TransactionId { get; set; }
        public DateTime DatePosted { get; set; } = DateTime.Now;
    }
}

using Knowlify.Domain.DTOs.User;

namespace Knowlify.Domain.DTOs.Review
{
    public class AddTransactionDto
    {
        public string RequesterId { get; set; } 
        public string ProviderId { get; set; }
        public int BarterId { get; set; }

        public int Credits { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}


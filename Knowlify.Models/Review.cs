using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Knowlify.Data.Models
{
    public class Review 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string ReviewerId { get; set; }
        public User Reviewer { get; set; }
        public int Rating { get; set; }
        public string RevieweeId { get; set; }
        public User Reviewee { get; set; }
        public Barter Barter { get; set; }
        public int BarterId { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
         
    }
}


namespace Knowlify.Data.Models
{
    public class User 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Credits { get; set; } = 0;
        public List<Skill> SkillsOffered { get; set; }
        public List<Skill> SkillsWanted { get; set; }
    }
}
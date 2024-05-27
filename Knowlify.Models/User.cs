
using Microsoft.AspNetCore.Identity;

namespace Knowlify.Data.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public int Credits { get; set; } = 0;
        public string? ProfilePicture { get; set; }
        public string? Description { get; set; }
        public string? City { get; set; }
        public List<Skill> SkillsOffered { get; set; }
        public List<Skill> SkillsWanted { get; set; }
    }
}
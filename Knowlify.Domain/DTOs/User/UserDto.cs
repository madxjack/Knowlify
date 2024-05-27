
namespace Knowlify.Domain.DTOs.User
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public int Credits { get; set; }
        public string? ProfilePicture { get; set; }
        public string? Description { get; set; }
        public string? City { get; set; }
        public List<int> SkillsOffered { get; set; }
        public List<int> SkillsWanted { get; set; }
    }
}

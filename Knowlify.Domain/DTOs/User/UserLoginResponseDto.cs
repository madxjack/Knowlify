namespace Knowlify.Domain.DTOs.User
{
    public class UserLoginResponseDto
    {
        public string id { get; set; }
        public string JwtToken { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProfilePicture { get; set; }
        public string City { get; set; }
        public int Credits { get; set; }
    }
}

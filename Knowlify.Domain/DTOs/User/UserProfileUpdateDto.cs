﻿
namespace Knowlify.Domain.DTOs.User
{
    public class UserProfileUpdateDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string? ProfilePicture { get; set; }
    }
}

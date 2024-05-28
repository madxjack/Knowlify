using Knowlify.Data.Models;
using Knowlify.Domain.DTOs.User;
using Knowlify.Infraestructure.Abstract;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Knowlify.Domain
{
    public class UserDomain
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;


        public UserDomain(IUserRepository userRepository, UserManager<User> userManager, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<UserLoginResponseDto> Login(UserLoginDto user)
        {
            var normalizedEmail = _userManager.NormalizeEmail(user.Email);
            var existingUser = await _userManager.FindByEmailAsync(normalizedEmail);
            if (existingUser == null)
            {
                throw new UnauthorizedAccessException("User not found");
            }
            var result = await _userManager.CheckPasswordAsync(existingUser, user.Password);
            if (!result)
            {
                throw new UnauthorizedAccessException("Invalid password");
            }

            var jwtTokenService = new JwtTokenService(_configuration);
            var token = jwtTokenService.GenerateToken(existingUser.Email);

            var userResponse = new UserLoginResponseDto
            {
                id = existingUser.Id,
                JwtToken = token,
                Email = existingUser.Email,
                Name = existingUser.Name,
                Description = existingUser.Description,
                City = existingUser.City,
                Credits = existingUser.Credits
            };

            return userResponse;
        }

        public async Task<UserDto> Register(UserRegisterDto user)
        {
            var existingUser = await _userRepository.Get(user.Email);
            if (existingUser != null)
            {
                throw new Exception("User already exists");
            }
            var newUser = new User
            {
                UserName = user.Email,
                Email = user.Email,
                Name = user.Name,
                Description = user.Description,
                City = user.City
            };

            var result = await _userManager.CreateAsync(newUser, user.Password);

            if (!result.Succeeded)
            {
                var errors = string.Join(" ", result.Errors.Select(e => e.Description));
                throw new Exception("Error creating user: " + errors);
            }

            var userResponse = new UserDto
            {
                Name = newUser.Name,
                Credits = newUser.Credits,
                ProfilePicture = newUser.ProfilePicture,
                Description = newUser.Description,
                City = newUser.City,
                SkillsOffered = [],
                SkillsWanted = [],
                Id = newUser.Id,
                Email = newUser.Email
            };

            return userResponse;
        }   

        public async Task<UserDto> Get(string email)
        {
            var user = await _userRepository.Get(email);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            var userResponse = new UserDto
            {
                Name = user.Name,
                Credits = user.Credits,
                ProfilePicture = user.ProfilePicture,
                Description = user.Description,
                City = user.City,
                SkillsOffered = user.SkillsOffered?.Select(skill => skill.Id).ToList() ?? new List<int>(),
                SkillsWanted = user.SkillsWanted?.Select(skill => skill.Id).ToList() ?? new List<int>(),
                Id = user.Id,
                Email = user.Email
            };

            return userResponse;
        }

        public async Task<IEnumerable<UserDto>> GetAll()
        {
            var users = await _userManager.Users.ToListAsync();

            var usersResponse = users.Select(user => new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Credits = user.Credits,
                ProfilePicture = user.ProfilePicture,
                Description = user.Description,
                City = user.City,
                SkillsOffered = user.SkillsOffered?.Select(skill => skill.Id).ToList() ?? new List<int>(),
                SkillsWanted = user.SkillsWanted?.Select(skill => skill.Id).ToList() ?? new List<int>()
            }).ToList();
            return usersResponse;
        }

        //public async Task<UserDto> Add(User user, string password)
        //{
        //    var existingUser = await _userManager.FindByEmailAsync(user.Email);
        //    if (existingUser != null)
        //    {
        //        throw new Exception("User already exists");
        //    }

        //    var result = await _userManager.CreateAsync(user, password);
        //    if (!result.Succeeded)
        //    {
        //        var errors = string.Join(" ", result.Errors.Select(e => e.Description));
        //        throw new Exception("Error creating user: " + errors);
        //    }

        //    var userResponse = new UserDto
        //    {
        //        Name = user.Name,
        //        Credits = user.Credits,
        //        ProfilePicture = user.ProfilePicture,
        //        Description = user.Description,
        //        City = user.City,
        //        SkillsOffered = user.SkillsOffered,
        //        SkillsWanted = user.SkillsWanted,
        //        Id = user.Id,
        //        Email = user.Email
        //    };

        //    return userResponse;
        //}

        public async Task<User> Delete(int id)
        {
            var user = await _userRepository.Get(id);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            return await _userRepository.Delete(user);
        }

        public async Task<User> Update(User user)
        {
            var existingUser = await _userManager.FindByEmailAsync(user.Email);
            if (existingUser == null)
            {
                throw new Exception("User not found");
            }
            var result =  await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                var errors = string.Join(" ", result.Errors.Select(e => e.Description));
                throw new Exception("Error updating user: " + errors);
            }

            return user;
        }

        public async Task<User> UpdateCredits(string id, int credits)
        {
            var user = await _userRepository.GetById(id);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            user.Credits += credits;
            return await _userRepository.Update(user);
        }

        public async Task<UserDto> UpdateBasicProfileInfo (UserProfileUpdateDto user)
        {
            if(string.IsNullOrWhiteSpace(user.NewPassword) || string.IsNullOrWhiteSpace(user.OldPassword)) {
                throw new Exception("Password cannot be empty.");
            }
            var existingUser = await _userManager.FindByIdAsync(user.Id);
            if (existingUser == null)
            {
                throw new Exception("User not found");
            }
            var result = await _userManager.CheckPasswordAsync(existingUser, user.OldPassword);
            if (!result)
            {
                throw new UnauthorizedAccessException("Invalid old password");
            }
            var passwordResult = await _userManager.ChangePasswordAsync(existingUser, user.OldPassword, user.NewPassword);
            if (!passwordResult.Succeeded)
            {
                var errors = string.Join(" ", passwordResult.Errors.Select(e => e.Description));
                throw new Exception("Error updating password: " + errors);
            }

            existingUser.Name = user.Name;
            existingUser.Email = user.Email;

            var resultUpdate =  await _userManager.UpdateAsync(existingUser);

            if (!resultUpdate.Succeeded)
            {
                var errors = string.Join(" ", resultUpdate.Errors.Select(e => e.Description));
                throw new Exception("Error updating user: " + errors);
            }


            var userResponse = new UserDto
            {
                Id = existingUser.Id,
                Email = existingUser.Email,
                Name = existingUser.Name,
                Credits = existingUser.Credits,
                ProfilePicture = existingUser.ProfilePicture,
                Description = existingUser.Description,
                City = existingUser.City,
                SkillsOffered = existingUser.SkillsOffered?.Select(skill => skill.Id).ToList() ?? new List<int>(),
                SkillsWanted = existingUser.SkillsWanted?.Select(skill => skill.Id).ToList() ?? new List<int>()
            };

            return userResponse;
        }
    }
}

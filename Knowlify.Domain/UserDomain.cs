using Knowlify.Data.Models;
using Knowlify.Domain.Abstract;
using Knowlify.Infraestructure.Abstract;

namespace Knowlify.Domain
{
    public class UserDomain : IUserDomain
    {
        private readonly IUserRepository _userRepository;

        public UserDomain(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<User> Get(int id)
        {
            return await _userRepository.Get(id);
        }

        public async Task<User> Get(string email)
        {
            return await _userRepository.Get(email);
        }

        public Task<User> Create(User user)
        {
            return _userRepository.Add(user);
        }

        public async Task<User> Delete(int id)
        {
            var user = await _userRepository.Get(id);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            return await _userRepository.Delete(user);
        }

        public Task<User> Update(User user)
        {
            var existingUser = _userRepository.Get(user.Id);
            if (existingUser == null)
            {
                throw new Exception("User not found");
            }
            return _userRepository.Update(user);
        }
    }
}


using Knowlify.Data.Models;

namespace Knowlify.Domain.Abstract
{
    public interface IUserDomain
    {
        public Task<User> Get(int id);
        public Task<User> Get(string email);
        public Task<User> Create(User user);
        public Task<User> Update(User user);
        public Task<User> Delete(int id);
    }
}

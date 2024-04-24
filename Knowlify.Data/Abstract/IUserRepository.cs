using Knowlify.Data.Models;

namespace Knowlify.Infraestructure.Abstract
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User> Get(string email);
    }
}
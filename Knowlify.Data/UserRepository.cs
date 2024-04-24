using Knowlify.Infraestructure.Abstract;
using Knowlify.Data.Models;
using Knowlify.Data.Db;
using Microsoft.EntityFrameworkCore;

namespace Knowlify.Infraestructure
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<User> Get(string email)
        {
            return await _context.Set<User>().FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
using Knowlify.Data.Db;
using Knowlify.Data.Models;
using Knowlify.Infraestructure.Abstract;
using Microsoft.EntityFrameworkCore;

namespace Knowlify.Infraestructure
{
    public class BarterRepository : BaseRepository<Barter> , IBarterRepository 
    {
        private readonly ApplicationDbContext context;
        public BarterRepository(ApplicationDbContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Barter>> GetAllBySkillId(int id)
        {
            return await context.Barter.Where(b => b.SkillId == id).ToListAsync();
        }
    }
}

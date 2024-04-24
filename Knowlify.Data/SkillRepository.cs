using Knowlify.Data.Db;
using Knowlify.Data.Models;
using Knowlify.Infraestructure.Abstract;

namespace Knowlify.Infraestructure
{
    public class SkillRepository : BaseRepository<Skill>, ISkillRepository
    { 
        public SkillRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}

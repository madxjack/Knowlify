using Knowlify.Data.Models;

namespace Knowlify.Infraestructure.Abstract
{
    public interface IBarterRepository : IBaseRepository<Barter>
    {
        Task<IEnumerable<Barter>> GetAllBySkillId(int id);
    }

}

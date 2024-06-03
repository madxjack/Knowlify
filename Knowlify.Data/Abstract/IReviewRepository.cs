using Knowlify.Data.Models;

namespace Knowlify.Infraestructure.Abstract
{
    public interface IReviewRepository : IBaseRepository<Review>
    {
        Task<IEnumerable<Review>> GetAllByBarterId(int barterId);

    }
}
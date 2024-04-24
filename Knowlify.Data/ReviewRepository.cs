using Knowlify.Infraestructure.Abstract;
using Knowlify.Data.Models;
using Knowlify.Data.Db;

namespace Knowlify.Infraestructure
{
    public class ReviewRepository : BaseRepository<Review>, IReviewRepository
    {
        public ReviewRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
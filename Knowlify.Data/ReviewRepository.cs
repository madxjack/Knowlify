using Knowlify.Infraestructure.Abstract;
using Knowlify.Data.Models;
using Knowlify.Data.Db;
using Microsoft.EntityFrameworkCore;

namespace Knowlify.Infraestructure
{
    public class ReviewRepository : BaseRepository<Review>, IReviewRepository
    {
        private readonly ApplicationDbContext context;
        public ReviewRepository(ApplicationDbContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Review>> GetAllByBarterId(int barterId)
        {
            return await context.Set<Review>().Where(r => r.BarterId == barterId).ToListAsync();
        }
    }
}
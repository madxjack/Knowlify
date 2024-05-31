using Knowlify.Data.Db;
using Knowlify.Data.Models;
using Knowlify.Infraestructure.Abstract;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace Knowlify.Infraestructure
{
    public class TransactionRepository : BaseRepository<Transaction>, ITransactionRepository
    {
        private readonly ApplicationDbContext context;
        public TransactionRepository(ApplicationDbContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Transaction>> GetLastTransactions(int num)
        {
            return await context.Transaction.OrderByDescending(t => t.Date).Take(num).ToListAsync();
        }

    }
}

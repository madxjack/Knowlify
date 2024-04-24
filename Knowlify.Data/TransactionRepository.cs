using Knowlify.Data.Db;
using Knowlify.Data.Models;
using Knowlify.Infraestructure.Abstract;

namespace Knowlify.Infraestructure
{
    public class TransactionRepository : BaseRepository<Transaction>, ITransactionRepository
    {
        public TransactionRepository(ApplicationDbContext context) : base(context)
        {
        }
    }

}

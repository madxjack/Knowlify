using Knowlify.Data.Models;

namespace Knowlify.Infraestructure.Abstract
{
    public interface ITransactionRepository : IBaseRepository<Transaction>
    {
        Task<IEnumerable<Transaction>> GetLastTransactions(int num);
        
    }
}

using Knowlify.Domain.DTOs.Review;
using Knowlify.Infraestructure.Abstract;
using Knowlify.Data.Models;

namespace Knowlify.Domain
{
    public class TransactionDomain
    {
        public readonly ITransactionRepository transactionRepository;

        public TransactionDomain(ITransactionRepository transactionRepository)
        {
            this.transactionRepository = transactionRepository;
        }

        public async Task<TransactionDto> Add(AddTransactionDto transactionRequest)
        {
            var newTransaction = new Transaction
            {
                RequesterId = transactionRequest.RequesterId,
                ProviderId = transactionRequest.ProviderId,
                BarterId = transactionRequest.BarterId,
                Credits = transactionRequest.Credits,
                Date = DateTime.Now
            };

            await transactionRepository.Add(newTransaction);

            return new TransactionDto
            {
                Id = newTransaction.Id,
                RequesterId = newTransaction.RequesterId,
                ProviderId = newTransaction.ProviderId,
                BarterId = newTransaction.BarterId,
                Credits = newTransaction.Credits,
                Date = newTransaction.Date
            };
        }

        public async Task<TransactionDto> Get(int id)
        {
            var transaction = await transactionRepository.Get(id);

            if (transaction == null)
            {
                throw new Exception("Transaction not found");
            }

            return new TransactionDto
            {
                Id = transaction.Id,
                RequesterId = transaction.RequesterId,
                ProviderId = transaction.ProviderId,
                BarterId = transaction.BarterId,
                Credits = transaction.Credits,
                Date = transaction.Date
            };
        }

        public async Task<IEnumerable<TransactionDto>> GetAll()
        {
            var transactions = await transactionRepository.GetAll();

            return transactions.Select(t => new TransactionDto
            {
                Id = t.Id,
                RequesterId = t.RequesterId,
                ProviderId = t.ProviderId,
                BarterId = t.BarterId,
                Credits = t.Credits,
                Date = t.Date
            });
        }

        //public async Task<TransactionDto> Update(TransactionDto transactionRequest)
        //{
        //    var transaction = await transactionRepository.Get(transactionRequest.Id);

        //    if (transaction == null)
        //    {
        //        throw new Exception("Transaction not found");
        //    }


        //    await transactionRepository.Update(transaction);

        //    return new TransactionDto
        //    {
        //        Id = transaction.Id,
        //        RequesterId = transaction.RequesterId,
        //        ProviderId = transaction.ProviderId,
        //        Credits = transaction.Credits,
        //        Date = transaction.Date
        //    };
        //}

        public async Task<TransactionDto> Delete(int id)
        {
            var transaction = await transactionRepository.Get(id);

            if (transaction == null)
            {
                throw new Exception("Transaction not found");
            }

            await transactionRepository.Delete(transaction);

            return new TransactionDto
            {
                Id = transaction.Id,
                RequesterId = transaction.RequesterId,
                ProviderId = transaction.ProviderId,
                BarterId = transaction.BarterId,
                Credits = transaction.Credits,
                Date = transaction.Date
            };
        }
    }
}

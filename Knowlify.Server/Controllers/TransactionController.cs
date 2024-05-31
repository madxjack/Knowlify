using Knowlify.Domain;
using Knowlify.Domain.DTOs.Review;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Knowlify.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : Controller
    {
        private readonly TransactionDomain transactionDomain;

        public TransactionController(TransactionDomain transactionDomain)
        {
            this.transactionDomain = transactionDomain;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AddTransactionDto transactionRequest)
        {
            try
            {
                var transaction = await transactionDomain.Add(transactionRequest);
                return Ok(transaction);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var transaction = await transactionDomain.Get(id);
                return Ok(transaction);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var transactions = await transactionDomain.GetAll();
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        //[HttpPut]
        //public async Task<IActionResult> Update([FromBody] TransactionDto transactionRequest)
        //{
        //    try
        //    {
        //        var transaction = await transactionDomain.Update(transactionRequest);
        //        return Ok(transaction);
        //    }
        //    catch (Exception ex)
        //    {
        //        return new ObjectResult(ex.Message) { StatusCode = 500 };
        //    }
        //}

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var transaction = await transactionDomain.Delete(id);
                return Ok(transaction);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [HttpGet("LastTransactions")]
        public async Task<IActionResult> GetLastTransactions()
        {
            try
            {
                var transactions = await transactionDomain.GetLastTransactions();
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }
    }
}

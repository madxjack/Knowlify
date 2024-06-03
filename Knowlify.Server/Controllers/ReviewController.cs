using Knowlify.Domain;
using Knowlify.Domain.DTOs.Review;
using Microsoft.AspNetCore.Mvc;

namespace Knowlify.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : Controller
    {

        private readonly ReviewDomain reviewDomain;

        public ReviewController(ReviewDomain reviewDomain)
        {
            this.reviewDomain = reviewDomain;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AddReviewDto reviewRequest)
        {
            try
            {
                var review = await reviewDomain.Add(reviewRequest);
                return Ok(review);
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
                var review = await reviewDomain.Get(id);
                return Ok(review);
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
                var reviews = await reviewDomain.GetAll();
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ReviewDto reviewRequest)
        {
            try
            {
                var review = await reviewDomain.Update(reviewRequest);
                return Ok(review);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var review = await reviewDomain.Delete(id);
                return Ok(review);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [HttpGet("ByBarter/{barterId}")]
        public async Task<IActionResult> GetByBarter(int barterId)
        {
            try
            {
                var reviews = await reviewDomain.GetAllByBarterId(barterId);
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }
    }
}

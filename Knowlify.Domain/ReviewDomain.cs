using Knowlify.Domain.DTOs.Review;
using Knowlify.Infraestructure.Abstract;
using Knowlify.Data.Models;
using Knowlify.Infraestructure;

namespace Knowlify.Domain
{
    public class ReviewDomain
    {
        public readonly IReviewRepository ReviewRepository;

        public ReviewDomain(IReviewRepository ReviewRepository)
        {
            this.ReviewRepository = ReviewRepository;
        }

        public async Task<ReviewDto> Add(AddReviewDto ReviewRequest)
        {
            var newReview = new Review
            {
                RevieweeId = ReviewRequest.RevieweeId,
                Rating = ReviewRequest.Rating,
                ReviewerId = ReviewRequest.ReviewerId,
                Comment = ReviewRequest.Comment,
                Date = DateTime.Now
            };

            await ReviewRepository.Add(newReview);

            return new ReviewDto
            {
                Id = newReview.Id,
                ReviewerId = newReview.ReviewerId,
                Rating = newReview.Rating,
                RevieweeId = newReview.RevieweeId,
                Comment = newReview.Comment,
                Date = newReview.Date
            };
        }

        public async Task<ReviewDto> Get(int id)
        {
            var Review = await ReviewRepository.Get(id);

            if (Review == null)
            {
                throw new Exception("Review not found");
            }

            return new ReviewDto
            {
                Id = Review.Id,
                ReviewerId = Review.ReviewerId,
                Rating = Review.Rating,
                RevieweeId = Review.RevieweeId,
                Comment = Review.Comment,
                Date = Review.Date
            };
        }

        public async Task<IEnumerable<ReviewDto>> GetAll()
        {
            var Reviews = await ReviewRepository.GetAll();

            return Reviews.Select(r => new ReviewDto
            {
                Id = r.Id,
                ReviewerId = r.ReviewerId,
                Rating = r.Rating,
                RevieweeId = r.RevieweeId,
                Comment = r.Comment,
                Date = r.Date
            });
        }

        public async Task<ReviewDto> Update(ReviewDto ReviewRequest)
        {
            var Review = await ReviewRepository.Get(ReviewRequest.Id);

            if (Review == null)
            {
                throw new Exception("Review not found");
            }

            Review.ReviewerId = ReviewRequest.ReviewerId;
            Review.Rating = ReviewRequest.Rating;
            Review.RevieweeId = ReviewRequest.RevieweeId;
            Review.Comment = ReviewRequest.Comment;

            await ReviewRepository.Update(Review);

            return new ReviewDto
            {
                Id = Review.Id,
                ReviewerId = Review.ReviewerId,
                Rating = Review.Rating,
                RevieweeId = Review.RevieweeId,
                Comment = Review.Comment,
                Date = Review.Date
            };
        }

        public async Task<ReviewDto> Delete(int id)
        {
            var Review = await ReviewRepository.Get(id);

            if (Review == null)
            {
                throw new Exception("Review not found");
            }

            await ReviewRepository.Delete(Review);

            return new ReviewDto
            {
                Id = Review.Id,
                ReviewerId = Review.ReviewerId,
                Rating = Review.Rating,
                RevieweeId = Review.RevieweeId,
                Comment = Review.Comment,
                Date = Review.Date
            };
        }
    }
}

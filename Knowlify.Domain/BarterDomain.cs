using Knowlify.Data.Models;
using Knowlify.Domain.DTOs.Barter;
using Knowlify.Infraestructure.Abstract;

namespace Knowlify.Domain
{
    public class BarterDomain
    {
        private readonly IBarterRepository barterRepository;

        public BarterDomain(IBarterRepository barterRepository)
        {
            this.barterRepository = barterRepository;
        }

        public async Task<BarterDto> Add(AddBarterDto barterRequest)
        {
            var newBarter = new Barter
            {
                OfferedById = barterRequest.OfferedById,
                SkillId = barterRequest.SkillId,
                Description = barterRequest.Description,
                Status = "Pending",
                DatePosted = DateTime.Now
            };

            await barterRepository.Add(newBarter);

            return new BarterDto
            {
                Id = newBarter.Id,
                OfferedById = newBarter.OfferedById,
                SkillId = newBarter.SkillId,
                Description = newBarter.Description,
                Credits = newBarter.Credits,
                Status = newBarter.Status,
                DatePosted = newBarter.DatePosted
            };
        }

        public async Task<BarterDto> Get(int id)
        {
            var barter = await barterRepository.Get(id);

            if (barter == null)
            {
                throw new Exception("Barter not found");
            }

            return new BarterDto
            {
                Id = barter.Id,
                OfferedById = barter.OfferedById,
                SkillId = barter.SkillId,
                Description = barter.Description,
                Status = barter.Status,
                Credits = barter.Credits,
                DatePosted = barter.DatePosted
            };
        }

        public async Task<IEnumerable<BarterDto>> GetAll()
        {
            var barters = await barterRepository.GetAll();

            return barters.Select(barter => new BarterDto
            {
                Id = barter.Id,
                OfferedById = barter.OfferedById,
                SkillId = barter.SkillId,
                Description = barter.Description,
                Status = barter.Status,
                Credits = barter.Credits,
                DatePosted = barter.DatePosted
            });
        }

        public async Task<BarterDto> Update(BarterDto barterRequest)
        {
            var barter = await barterRepository.Get(barterRequest.Id);

            if (barter == null)
            {
                throw new Exception("Barter not found");
            }

            barter.OfferedById = barterRequest.OfferedById;
            barter.SkillId = barterRequest.SkillId;
            barter.Description = barterRequest.Description;
            barter.Status = barterRequest.Status;
            barter.Credits = barterRequest.Credits;

            await barterRepository.Update(barter);

            return new BarterDto
            {
                Id = barter.Id,
                OfferedById = barter.OfferedById,
                SkillId = barter.SkillId,
                Description = barter.Description,
                Credits = barter.Credits,
                Status = barter.Status,
                DatePosted = barter.DatePosted
            };
        }

        public async Task Delete(int id)
        {
            var barter = await barterRepository.Get(id);

            if (barter == null)
            {
                throw new Exception("Barter not found");
            }

            await barterRepository.Delete(barter);
        }

        public async Task<IEnumerable<BarterDto>> GetAllBartersBySkillId(int id)
        {
            var barters = await barterRepository.GetAllBartersBySkillId(id);

            return barters.Select(barter => new BarterDto
            {
                Id = barter.Id,
                OfferedById = barter.OfferedById,
                SkillId = barter.SkillId,
                Description = barter.Description,
                Status = barter.Status,
                Credits = barter.Credits,
                DatePosted = barter.DatePosted
            });
        }
    }
}

using Knowlify.Domain;
using Knowlify.Domain.DTOs.Barter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Knowlify.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BarterController : ControllerBase
    {
        private readonly BarterDomain barterDomain;

        public BarterController(BarterDomain barterDomain)
        {
            this.barterDomain = barterDomain;
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddBarterDto barterRequest)
        {
            try
            {
                var newBarter = await barterDomain.Add(barterRequest);

                return Ok(newBarter);
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
                var barter = await barterDomain.Get(id);

                return Ok(barter);
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
                var barters = await barterDomain.GetAll();

                return Ok(barters);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(BarterDto barterRequest)
        {
            try
            {
                var updatedBarter = await barterDomain.Update(barterRequest);

                return Ok(updatedBarter);
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
                await barterDomain.Delete(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [HttpGet("GetAllBartersBySkillId/{skillId}")]
        public async Task<IActionResult> GetAllBartersBySkillId(int skillId)
        {
            try
            {
                var barters = await barterDomain.GetAllBartersBySkillId(skillId);

                return Ok(barters);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }
    }
}

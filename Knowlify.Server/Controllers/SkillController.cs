using Knowlify.Domain;
using Knowlify.Domain.DTOs.Skill;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Knowlify.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillController : ControllerBase
    {
        private readonly SkillDomain skillDomain;

        public SkillController(SkillDomain skillDomain)
        {
            this.skillDomain = skillDomain;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Add(AddSkillDto skillRequest)
        {
            try
            {
                var newSkill = await skillDomain.Add(skillRequest);

                return Ok(newSkill);
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
                var skills = await skillDomain.GetAll();

                return Ok(skills);
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
                var skill = await skillDomain.Get(id);

                return Ok(skill);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> Update(SkillDto skillRequest)
        {
            try
            {
                var skill = await skillDomain.Update(skillRequest);

                return Ok(skill);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var skill = await skillDomain.Delete(id);

                return Ok(skill);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }
    }
}

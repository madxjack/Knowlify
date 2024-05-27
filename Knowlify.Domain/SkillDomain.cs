using Knowlify.Data.Models;
using Knowlify.Domain.DTOs.Skill;
using Knowlify.Infraestructure.Abstract;

namespace Knowlify.Domain
{
    public class SkillDomain
    {
        private readonly ISkillRepository skillRepository;

        public SkillDomain(ISkillRepository skillRepository)
        {
            this.skillRepository = skillRepository;
        }

        public async Task<SkillDto> Add(AddSkillDto skillRequest)
        {
            var newSkill = new Skill
            {
                Name = skillRequest.Name,
                Description = skillRequest.Description,
                Category = skillRequest.Category
            };

            await skillRepository.Add(newSkill);

            return new SkillDto
            {
                Id = newSkill.Id,
                Name = newSkill.Name,
                Description = newSkill.Description,
                Category = newSkill.Category
            };
        }

        public async Task<IEnumerable<SkillDto>> GetAll()
        {
            var skills = await skillRepository.GetAll();

            return skills.Select(skill => new SkillDto
            {
                Id = skill.Id,
                Name = skill.Name,
                Description = skill.Description,
                Category = skill.Category
            });
        }

        public async Task<SkillDto> Get(int id)
        {
            var skill = await skillRepository.Get(id);

            return new SkillDto
            {
                Id = skill.Id,
                Name = skill.Name,
                Description = skill.Description,
                Category = skill.Category
            };
        }

        public async Task<SkillDto> Update(SkillDto skill)
        {
            var skillToUpdate = await skillRepository.Get(skill.Id);

            skillToUpdate.Name = skill.Name;
            skillToUpdate.Description = skill.Description;
            skillToUpdate.Category = skill.Category;

            await skillRepository.Update(skillToUpdate);

            return new SkillDto
            {
                Id = skillToUpdate.Id,
                Name = skillToUpdate.Name,
                Description = skillToUpdate.Description,
                Category = skillToUpdate.Category
            };
        }

        public async Task<SkillDto> Delete(int id)
        {
            var skill = await skillRepository.Get(id);

            await skillRepository.Delete(skill);

            return new SkillDto
            {
                Id = skill.Id,
                Name = skill.Name,
                Description = skill.Description,
                Category = skill.Category
            };
        }
    }
}

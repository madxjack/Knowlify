
using Knowlify.Data.Db;
using Knowlify.Infraestructure.Abstract;
using Knowlify.Data.Models;
using Knowlify.Infraestructure;

namespace Knowlify.Data.Seeders
{
    public static class DataSeeder
    {
        public static async Task SeedData(ApplicationDbContext context)
        {
            await SeedUsers(context);
            await SeedSkills(context);
        }
        public static async Task SeedUsers(ApplicationDbContext context)
        {
            // get service for user repository
            var userRepository = new UserRepository(context);
            var users = await userRepository.GetAll();

            if (users != null && users.Any())
            {
                return;
            }

            // Seed users
            users = new List<User>
            {
                new User
                {
                    Name = "John Doe",
                    Email = "test"
                },
                new User
                {
                    Name = "Jane Doe",
                    Email = "test2"
                },
                new User
                {
                    Name = "John Smith",
                    Email = "test3"
                }
            };

            foreach (var user in users)
            {
                await userRepository.Add(user);
                Console.WriteLine($"User {user.Name} added");
            }
        }
        public static async Task SeedSkills(ApplicationDbContext context)
        {
            // get service for skill repository
            var skillRepository = new SkillRepository(context);
            var skills = await skillRepository.GetAll();

            if (skills != null && skills.Any())
            {
                return;
            }

            // Seed skills
            skills = new List<Skill>
            {
                new Skill   
                {
                    Name = "C#",
                    Description = "C# is a general-purpose, multi-paradigm programming language encompassing strong typing, lexically scoped, imperative, declarative, functional, generic, object-oriented, and component-oriented programming disciplines.",
                    Category = "Programming",
                 },
                new Skill
                {
                    Name = "JavaScript",
                    Description = "JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification.",
                    Category = "Programming",
                },
                new Skill
                {
                    Name = "React",
                    Description = "React is an open-source, front end, JavaScript library for building user interfaces or UI components.",
                    Category = "Programming",
                },
            };

            foreach (var skill in skills)
            {
                await skillRepository.Add(skill);
                Console.WriteLine($"Skill {skill.Name} added");
            }
        }
    }
}

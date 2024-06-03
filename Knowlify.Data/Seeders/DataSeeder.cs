
using Knowlify.Data.Db;
using Knowlify.Infraestructure.Abstract;
using Knowlify.Data.Models;
using Knowlify.Infraestructure;
using Microsoft.AspNetCore.Identity;

namespace Knowlify.Data.Seeders
{
    public class DataSeeder
    {
        private UserManager<User> userManager;
        private ISkillRepository skillRepository;

        public DataSeeder(UserManager<User> userManager, ISkillRepository skillRepository)
        {
            this.userManager = userManager;
            this.skillRepository = skillRepository;
        }

        public async Task SeedUsers()
        {
            if (userManager.Users.Any())
            {
                return; // If there are users, assume the database is already seeded
            }

            // List of users to seed
            var users = new List<User>
            {
                new User
                {
                    UserName = "johndoe@johndoe.com",
                    Email = "johndoe@johndoe.com",
                    Name = "John Doe",
                    City = "New York",
                    Description = "Just a regular Joe.",
                    Credits = 100
                },
                new User
                {
                    UserName = "janesmith@example.com",
                    Email = "janesmith@example.com",
                    Name = "Jane Smith",
                    City = "Los Angeles",
                    Description = "Aspiring actress and freelance writer.",
                    Credits = 150
                },
                new User
                {
                    UserName = "bobjones@outlook.com",
                    Email = "bobjones@outlook.com",
                    Name = "Bob Jones",
                    City = "Chicago",
                    Description = "Sports enthusiast and tech guru.",
                    Credits = 120
                },
                new User
                {
                    UserName = "annawhite@gmail.com",
                    Email = "annawhite@gmail.com",
                    Name = "Anna White",
                    City = "Seattle",
                    Description = "Coffee lover and avid blogger.",
                    Credits = 180
                },
                new User
                {
                    UserName = "garyblack@yahoo.com",
                    Email = "garyblack@yahoo.com",
                    Name = "Gary Black",
                    City = "Boston",
                    Description = "Photographer and adventure seeker.",
                    Credits = 200
                }
             };

            foreach (var user in users)
            {
                // Create the user with a default password
                var createResult = await userManager.CreateAsync(user, "Test1.");
                if (createResult.Succeeded)
                {
                    Console.WriteLine($"User {user.Email} added successfully.");
                }
                else
                {
                    Console.WriteLine($"Failed to add user {user.Email}: {createResult.Errors.FirstOrDefault()?.Description}");
                }
            }
        }
        public async Task SeedSkills()
        {
            // get service for skill repository
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
                    Name = "Reparaciones Domésticas",
                    Description = "Habilidades relacionadas con reparaciones menores y mayores en el hogar, incluyendo trabajos básicos de plomería y electricidad.",
                    Category = "Hogar",
                    ImageUrl = ""
                },
                new Skill
                {
                    Name = "Jardinería",
                    Description = "Conocimientos sobre el cuidado de plantas, establecimiento y mantenimiento de jardines para diversos tipos de ambientes.",
                    Category = "Jardineria",
                    ImageUrl = ""
                },
                new Skill
                {
                    Name = "Tutoría de Matemáticas",
                    Description = "Capacidad para enseñar y simplificar conceptos matemáticos desde aritmética básica hasta cálculo avanzado.",
                    Category = "Enseñanza",
                    ImageUrl = ""
                },
                new Skill
                {
                    Name = "Gestión de Proyectos",
                    Description = "Experiencia en planificar, ejecutar y finalizar proyectos de acuerdo con plazos estrictos y dentro de presupuestos establecidos.",
                    Category = "Administración",
                    ImageUrl = ""
                },
                new Skill
                {
                    Name = "Desarrollo Web",
                    Description = "Competencia en la creación de sitios web y aplicaciones utilizando tecnologías y frameworks modernos de la web.",
                    Category = "Tecnología",
                    ImageUrl = ""
                },
                new Skill
                {
                    Name = "Programación en C#",
                    Description = "C# es un lenguaje de programación de propósito general y multi-paradigma que engloba tipado fuerte, ámbito léxico, imperativo, declarativo, funcional, genérico, orientado a objetos y a componentes.",
                    Category = "Desarrollo",
                    ImageUrl = ""
                },
                new Skill
                {
                    Name = "Escritura Creativa",
                    Description = "Capacidad para elaborar contenidos escritos atractivos y provocadores de pensamiento en diversos géneros literarios.",
                    Category = "Otros",
                    ImageUrl = ""
                }
            };


            foreach (var skill in skills)
            {
                await skillRepository.Add(skill);
                Console.WriteLine($"Skill {skill.Name} added");
            }
        }
    }
}

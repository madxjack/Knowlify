using Knowlify.Data.Models;
using Knowlify.Data.Db;
using Knowlify.Infraestructure;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Knowlify.Tests
{
    public class UserRepositoryTests : IDisposable
    {
        private readonly DbContextOptions<ApplicationDbContext> _options;

        public UserRepositoryTests()
        {
            _options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "Test")
                .Options;
        }

        [Fact]
        public async Task AddUser_ShouldAddUserToDatabase()
        {
            // Arrange
            using (var context = new ApplicationDbContext(_options))
            {
                var user = new User { Name = "Test User", Email = "test@test.com" };

                var repository = new UserRepository(context);

                // Act
                await repository.Add(user);
                await context.SaveChangesAsync();

                // Assert
                var userFromDb = await context.User.FirstOrDefaultAsync(u => u.Name == "Test User");
                Assert.NotNull(userFromDb);
                Assert.Equal("Test User", userFromDb.Name);
            }
        }

        [Fact]
        public async Task GetUser_ShouldReturnUserFromDatabase()
        {
            // Arrange
            using (var context = new ApplicationDbContext(_options))
            {
                var user = new User { Name = "Test User", Email = "test@test" };

                var repository = new UserRepository(context);
                await repository.Add(user);
                await context.SaveChangesAsync();

                // Act
                var userFromDb = await repository.Get(1);
                Assert.Equal("Test User", userFromDb.Name);
            }
        }

        [Fact]
        public async Task GetUsers_ShouldReturnAllUsersFromDatabase()
        {
            // Arrange
            using (var context = new ApplicationDbContext(_options))
            {
                var user1 = new User { Name = "Test User 1", Email = "test@test" };
                var user2 = new User { Name = "Test User 2", Email = "test@test" };

                var repository = new UserRepository(context);

                await repository.Add(user1);
                await repository.Add(user2);
                await context.SaveChangesAsync();

                // Act
                var users = await repository.GetAll();
                Assert.Equal(2, users.Count());
            }
        }

        [Fact]
        public async Task UpdateUser_ShouldUpdateUserInDatabase()
        {
            // Arrange
            using (var context = new ApplicationDbContext(_options))
            {
                var user = new User { Name = "Test User", Email = "test@test" };

                var repository = new UserRepository(context);
                await repository.Add(user);
                await context.SaveChangesAsync();

                // Act
                user.Name = "Updated User";
                await repository.Update(user);

                // Assert
                var userFromDb = await repository.Get(1);
                Assert.Equal("Updated User", userFromDb.Name);
            }
        }

        [Fact]
        public async Task DeleteUser_ShouldDeleteUserFromDatabase()
        {
            // Arrange
            using (var context = new ApplicationDbContext(_options))
            {
                var user = new User { Name = "Test User", Email = "test@test" };

                var repository = new UserRepository(context);
                await repository.Add(user);

                // Act
                await repository.Delete(user);
                await context.SaveChangesAsync();

                // Assert
                var userFromDb = await repository.Get(1);
                Assert.Null(userFromDb);
            }
        }
        public void Dispose()
        {
            using (var context = new ApplicationDbContext(_options))
            {
                context.Database.EnsureDeleted();
            }
        }
    }
}

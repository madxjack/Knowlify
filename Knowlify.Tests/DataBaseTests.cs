using Xunit;
using Knowlify.Data.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Knowlify.Tests
{
    public class DataBaseTests
    {
        private readonly IConfiguration _config;
        private readonly DbContextOptions<ApplicationDbContext> _options;

        public DataBaseTests()
        {
            // Configuración de la base de datos
            _config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.Development.json")
                .Build();

            _options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseSqlServer(_config.GetConnectionString("AZURE_SQL_CONNECTIONSTRING"))
                .Options;
        }

        [Fact]
        public async Task TestConnection()
        {
            using (var context = new ApplicationDbContext(_options))
            {
                await context.Database.OpenConnectionAsync();
                Assert.True(context.Database.CanConnect());
            }
        }

    }
}

using Knowlify.Data.Db;
using Microsoft.EntityFrameworkCore;
using Knowlify.Infraestructure.Abstract;
using Knowlify.Data.Seeders;
using Knowlify.Infraestructure;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connection = String.Empty;
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddEnvironmentVariables().AddJsonFile("appsettings.Development.json");
    connection = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
}
else
{
    connection = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING");
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connection));

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    try
    {   
        if(context.Database.CanConnect() == false)
        {
            Console.WriteLine("Database not found");
            return;
        }
        context.Database.EnsureCreated();
        context.Database.Migrate();
        await DataSeeder.SeedData(context);
        Console.WriteLine("Database created and seeded");
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
    }

}


app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

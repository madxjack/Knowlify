using Knowlify.Data.Db;
using Microsoft.EntityFrameworkCore;
using Knowlify.Infraestructure.Abstract;
using Knowlify.Infraestructure;
using Knowlify.Data.Models;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Knowlify.Domain;
using Knowlify.Services.AzureBlobStorage;
using Azure.Storage.Blobs;
using Knowlify.Data.Seeders;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.MinimumSameSitePolicy = SameSiteMode.None;
    options.OnAppendCookie = cookieContext =>
        CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
    options.OnDeleteCookie = cookieContext =>
    CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
});

static void CheckSameSite(HttpContext httpContext, CookieOptions options)
{
    if (options.SameSite == SameSiteMode.None)
    {
        options.SameSite = SameSiteMode.Unspecified;
    }
}

var connection = String.Empty;
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddEnvironmentVariables().AddJsonFile("appsettings.Development.json");
    connection = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
}
else
{
    //connection = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING");
    connection = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");

}
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(connection,
        sqlOptions => sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null));
});

builder.Services.AddIdentityCore<User>(options =>
{
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Password settings.
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;

    // Lockout settings.
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;
});


builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserDomain>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<TransactionDomain>();
builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
builder.Services.AddScoped<ReviewDomain>();
builder.Services.AddScoped<ISkillRepository, SkillRepository>();
builder.Services.AddScoped<SkillDomain>();
builder.Services.AddScoped<IBarterRepository, BarterRepository>();
builder.Services.AddScoped<BarterDomain>();
builder.Services.AddSingleton<JwtTokenService, JwtTokenService>();
builder.Services.AddSingleton<AzureBlobStorage>();
builder.Services.AddSingleton(new BlobServiceClient(builder.Configuration["AzureBlobStorage:ConnectionString"]));
builder.Services.AddSingleton<BlobService>();
builder.Services.AddControllers();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//.AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
    };
})

.AddCookie();

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
        builder.WithOrigins(["https://localhost:5173", "https://agreeable-mud-00348d503.5.azurestaticapps.net"])
               .AllowAnyHeader()
               .AllowAnyMethod());
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Knowlify.Api", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Provide a valid token",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new List<string>()
        }
    });
});
//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
//});



var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    Console.WriteLine($"Current Environment: {app.Environment.EnvironmentName}");

    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var services = scope.ServiceProvider;
    try
    {
        context.Database.EnsureCreated();
        context.Database.Migrate();

        if (app.Environment.IsDevelopment())
        {
            var userManager = services.GetRequiredService<UserManager<User>>();
            var skillRepository = services.GetRequiredService<ISkillRepository>();
            var seeder = new DataSeeder(userManager, skillRepository);
            await seeder.SeedUsers();
            await seeder.SeedSkills();
            Console.WriteLine("Database created and seeded");
        }
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

app.UseCors("AllowSpecificOrigin");
//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using PetSearch.Repositories;
using PetSearch.Repositories.Abstractions;
using PetSearch.Services;
using PetSearch.Services.Abstractions;

namespace PetSearch;

public static class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        ConfigureServices(builder.Services, builder.Configuration);
        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        
        app.MapControllers();

        app.UseAuthentication();
        app.UseAuthorization();
        
        app.UseSwagger();
        app.UseSwaggerUI();
        
        app.Run();
    }

    private static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddSwaggerGen();
        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(
            options =>
            {
                options.Cookie.Name = "auth";
                options.Cookie.HttpOnly = false;
            });

        services.AddDbContext<WebApplicationDbContext>(optionsBuilder =>
        {
            var connectionString = configuration.GetConnectionString("Postgres");
            optionsBuilder.UseNpgsql(connectionString);
        });
        
        services.AddScoped<IAuthRepository, AuthRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IUserService, UserService>();
    }
}
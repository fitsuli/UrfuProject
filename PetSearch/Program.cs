using System.Net;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
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
        else
        {
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        if (app.Environment.IsProduction())
        {
            app.UseSpaStaticFiles();
        }

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapWhen(
            context =>
            {
                return context.Request.Path.StartsWithSegments("/api");
            },
            _ => { app.UseEndpoints(x => x.MapControllers()); });
        
        app.UseSpa(options =>
        {
            options.Options.SourcePath = @"front";
            if (app.Environment.IsDevelopment())
                options.UseReactDevelopmentServer("start");
        });

        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/api/swagger/v1/swagger.json", "My API V1");
            options.RoutePrefix = "/api";
        });

        app.Run();
    }

    private static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
    {
        ConfigureSpa(services);

        services.AddControllers();
        services.AddSwaggerGen();
        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(
            options =>
            {
                options.Cookie.Name = "auth";
                options.Cookie.HttpOnly = false;
                options.LoginPath = PathString.Empty;
                options.AccessDeniedPath = PathString.Empty;
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    return Task.CompletedTask;
                };
            });

        services.AddDbContext<WebApplicationDbContext>(optionsBuilder =>
        {
            var connectionString = configuration.GetConnectionString("Postgres");
            optionsBuilder.UseNpgsql(connectionString);
        });

        services.AddScoped<IAuthRepository, AuthRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ILostAnimalRepository, LostAnimalRepository>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ILostAnimalService, LostAnimalService>();
    }

    private static void ConfigureSpa(IServiceCollection services)
    {
        services.AddSpaStaticFiles(options => options.RootPath = "front/build");
    }
}
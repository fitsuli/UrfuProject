using Microsoft.EntityFrameworkCore;
using PetSearch.Models;

namespace PetSearch.Repositories
{
    public class WebApplicationDbContext : DbContext
    {
        public WebApplicationDbContext(DbContextOptions options) : base(options)
        {
            
        }
        
        public DbSet<UserAuth> UsersAuth { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<LostAnimalEntity> LostAnimals { get; set; }
    }
}
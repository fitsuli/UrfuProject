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
        public DbSet<LostAnimal> LostAnimals { get; set; }
        public DbSet<FoundAnimal> FoundAnimals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Animal>().OwnsOne(x => x.Contacts);
            base.OnModelCreating(modelBuilder);
        }
    }
}
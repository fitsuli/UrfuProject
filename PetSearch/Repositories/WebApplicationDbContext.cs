using Microsoft.EntityFrameworkCore;

namespace PetSearch.Repositories
{
    public class WebApplicationDbContext : DbContext
    {
        public WebApplicationDbContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}
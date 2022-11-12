using PetSearch.Models;
using PetSearch.Repositories.Abstractions;

namespace PetSearch.Repositories
{
    public sealed class UserRepository : EFRepository<User>, IUserRepository
    {
        public UserRepository(WebApplicationDbContext dbContext) : base(dbContext)
        {
        }
    }
}
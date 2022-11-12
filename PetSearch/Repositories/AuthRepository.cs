using PetSearch.Models;
using PetSearch.Repositories.Abstractions;

namespace PetSearch.Repositories
{
    public sealed class AuthRepository : EFRepository<UserAuth>, IAuthRepository
    {
        public AuthRepository(WebApplicationDbContext context) : base(context)
        {
        }
    }
}
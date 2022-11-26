using PetSearch.Models;
using PetSearch.Repositories.Abstractions;

namespace PetSearch.Repositories;

public class LostAnimalRepository : EFRepository<LostAnimalEntity>, ILostAnimalRepository
{
    public LostAnimalRepository(WebApplicationDbContext context) : base(context)
    {
        
    }
}
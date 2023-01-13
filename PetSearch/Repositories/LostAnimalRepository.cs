using PetSearch.Models;

namespace PetSearch.Repositories;

public class LostAnimalRepository : EFRepository<LostAnimal>
{
    public LostAnimalRepository(WebApplicationDbContext context) : base(context)
    {
        
    }
}
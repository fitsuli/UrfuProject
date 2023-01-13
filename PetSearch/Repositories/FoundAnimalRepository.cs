using PetSearch.Models;

namespace PetSearch.Repositories;

public class FoundAnimalRepository : EFRepository<FoundAnimal>
{
    public FoundAnimalRepository(WebApplicationDbContext context) : base(context)
    {
    }
}
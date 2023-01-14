using PetSearch.Models;
using PetSearch.Repositories;
using PetSearch.Services.Providers.Abstractions;

namespace PetSearch.Services;

public class LostAnimalService : AnimalServiceBase<LostAnimal>
{
    public LostAnimalService(IRepository<LostAnimal> repository, IFileProvider fileProvider) 
        : base(repository, fileProvider)
    {
    }
}
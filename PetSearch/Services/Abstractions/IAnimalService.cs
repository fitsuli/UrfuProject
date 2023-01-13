using PetSearch.Common;
using PetSearch.Models;
using PetSearch.Models.DTO;

namespace PetSearch.Services.Abstractions;

public interface IAnimalService<TAnimal> where TAnimal : Animal
{
    Task<IEnumerable<TAnimal>> GetAnimals();
    Task<TAnimal?> GetAnimal(Guid id);
    Task<OperationResult<AnimalEntityDto>> CreateAnimal(CreateAnimalDto createAnimalDto, Guid userId);
    Task CloseAnimalPost(TAnimal animal);
    Task<OperationResult> DeleteAnimal(Guid id);
}
using PetSearch.Common;
using PetSearch.Models;
using PetSearch.Models.DTO;

namespace PetSearch.Services.Abstractions;

public interface ILostAnimalService
{
    Task<IEnumerable<LostAnimalEntity>> GetLostAnimals();
    Task<LostEnimalEntityDto?> GetLostAnimalEntity(Guid id);
    Task<OperationResult<LostAnimalEntity>> CreateLostAnimalEntity(CreateLostAnimalEntityDto createLostAnimalEntityDto, Guid userId);
}
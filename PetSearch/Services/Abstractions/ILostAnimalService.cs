using PetSearch.Common;
using PetSearch.Models;
using PetSearch.Models.DTO;

namespace PetSearch.Services.Abstractions;

public interface ILostAnimalService
{
    Task<IEnumerable<LostAnimalEntity>> GetLostAnimals();
    Task<LostAnimalEntity?> GetLostAnimalEntity(Guid id);
    Task<OperationResult<LostAnimalEntity>> CreateLostAnimalEntity(LostAnimalEntityDto lostAnimalEntityDto, Guid userId);
}
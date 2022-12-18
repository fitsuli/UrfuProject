using PetSearch.Common;
using PetSearch.Models;
using PetSearch.Models.DTO;

namespace PetSearch.Services.Abstractions;

public interface ILostAnimalService
{
    Task<IEnumerable<LostEnimalEntityDto>> GetLostAnimals();
    Task<LostEnimalEntityDto?> GetLostAnimalEntity(Guid id);
    Task<OperationResult<LostEnimalEntityDto>> CreateLostAnimalEntity(CreateLostAnimalEntityDto createLostAnimalEntityDto, Guid userId);
}
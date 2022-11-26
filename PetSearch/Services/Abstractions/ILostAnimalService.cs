using PetSearch.Common;
using PetSearch.Models;

namespace PetSearch.Services.Abstractions;

public interface ILostAnimalService
{
    Task<LostAnimalEntity?> GetLostAnimalEntity(Guid id);
    Task<OperationResult> CreateLostAnimalEntity(LostAnimalEntity lostAnimalEntity);
}
using PetSearch.Common;
using PetSearch.Models;
using PetSearch.Models.DTO;
using PetSearch.Repositories.Abstractions;
using PetSearch.Services.Abstractions;

namespace PetSearch.Services;

public class LostAnimalService : ILostAnimalService
{
    private readonly ILostAnimalRepository repository;
    
    public LostAnimalService(ILostAnimalRepository repository)
    {
        this.repository = repository;
    }

    public async Task<IEnumerable<LostAnimalEntity>> GetLostAnimals()
    {
        return await repository.Query(x => x, CancellationToken.None);
    }

    public async Task<LostAnimalEntity?> GetLostAnimalEntity(Guid id)
    {
        return await repository.FirstOrDefaultAsync(lostAnimal => lostAnimal.Id == id, CancellationToken.None);
    }

    public async Task<OperationResult<LostAnimalEntity>> CreateLostAnimalEntity(LostAnimalEntityDto lostAnimalEntityDto, Guid userId)
    {
        var lostAnimalEntity = new LostAnimalEntity()
        {
            AnimalName = lostAnimalEntityDto.AnimalName,
            AnimalType = lostAnimalEntityDto.AnimalType,
            LostArea = lostAnimalEntityDto.LostArea,
            Description = lostAnimalEntityDto.Description,
            LostDate = lostAnimalEntityDto.LostDate,
            UserId = userId
        };
        
        try
        {
            var result = await repository.AddAsync(lostAnimalEntity, CancellationToken.None);
            await repository.SaveChangesAsync();
            return OperationResult<LostAnimalEntity>.Success(result);
        }
        catch (Exception)
        {
            return OperationResult<LostAnimalEntity>.Failure("Failed to create lostAnimalEntity");
        }
    }
}
using PetSearch.Common;
using PetSearch.Models;
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

    public async Task<LostAnimalEntity?> GetLostAnimalEntity(Guid id)
    {
        return await repository.FirstOrDefaultAsync(lostAnimal => lostAnimal.Id == id, CancellationToken.None);
    }

    public async Task<OperationResult> CreateLostAnimalEntity(LostAnimalEntity lostAnimalEntity)
    {
        try
        {
            await repository.AddAsync(lostAnimalEntity, CancellationToken.None);
            await repository.SaveChangesAsync();
            return OperationResult.Success();
        }
        catch (Exception)
        {
            return OperationResult.Failure("Failed to create lostAnimalEntity");
        }
    }
}
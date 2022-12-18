using PetSearch.Common;
using PetSearch.Models;
using PetSearch.Models.DTO;
using PetSearch.Repositories.Abstractions;
using PetSearch.Services.Abstractions;
using PetSearch.Services.Providers.Abstractions;

namespace PetSearch.Services;

public class LostAnimalService : ILostAnimalService
{
    private readonly ILostAnimalRepository repository;
    private readonly ILostAnimalsFileProvider fileProvider;
    
    public LostAnimalService(ILostAnimalRepository repository, ILostAnimalsFileProvider fileProvider)
    {
        this.repository = repository;
        this.fileProvider = fileProvider;
    }

    public async Task<IEnumerable<LostAnimalEntity>> GetLostAnimals()
    {
        return await repository.Query(x => x, CancellationToken.None);
    }

    public async Task<LostEnimalEntityDto?> GetLostAnimalEntity(Guid id)
    {
        var lostAnimal = await repository.FirstOrDefaultAsync(lostAnimal => lostAnimal.Id == id, CancellationToken.None);
        return lostAnimal == null ? null : new LostEnimalEntityDto(lostAnimal);
    }

    public async Task<OperationResult<LostAnimalEntity>> CreateLostAnimalEntity(
        CreateLostAnimalEntityDto createLostAnimalEntityDto,
        Guid userId)
    {
        var uploadFilesResult = await fileProvider.UploadFiles(createLostAnimalEntityDto.Images);
        if (!uploadFilesResult.IsSuccessful)
            return OperationResult<LostAnimalEntity>.Failure(uploadFilesResult.ErrorMessage);

        var fileNames = uploadFilesResult.Result;
        
        var lostAnimalEntity = new LostAnimalEntity()
        {
            AnimalName = createLostAnimalEntityDto.AnimalName,
            AnimalType = createLostAnimalEntityDto.AnimalType,
            LostArea = createLostAnimalEntityDto.LostArea,
            Description = createLostAnimalEntityDto.Description,
            LostDate = createLostAnimalEntityDto.LostDate,
            UserId = userId,
            FileNames = string.Join(";", fileNames)
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
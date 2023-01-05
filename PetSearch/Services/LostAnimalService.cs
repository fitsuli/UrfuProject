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

    public async Task<IEnumerable<LostEnimalEntityDto>> GetLostAnimals()
    {
        var lostAnimals = await repository.Query(x => x, CancellationToken.None); 
        return lostAnimals.Select(animal => new LostEnimalEntityDto(animal));
    }

    public async Task<LostEnimalEntityDto?> GetLostAnimalEntity(Guid id)
    {
        var lostAnimal = await repository.FirstOrDefaultAsync(lostAnimal => lostAnimal.Id == id, CancellationToken.None);
        return lostAnimal == null ? null : new LostEnimalEntityDto(lostAnimal);
    }

    public async Task<OperationResult<LostEnimalEntityDto>> CreateLostAnimalEntity(
        CreateLostAnimalEntityDto createLostAnimalEntityDto,
        Guid userId)
    {
        var uploadFilesResult = await fileProvider.UploadFiles(createLostAnimalEntityDto.Images);
        if (!uploadFilesResult.IsSuccessful)
            return OperationResult<LostEnimalEntityDto>.Failure(uploadFilesResult.ErrorMessage);

        var fileNames = uploadFilesResult.Result;
        
        var lostAnimalEntity = new LostAnimalEntity
        {
            AnimalName = createLostAnimalEntityDto.AnimalName,
            AnimalType = createLostAnimalEntityDto.AnimalType,
            LostAddressFull = createLostAnimalEntityDto.LostAddressFull,
            LostAddressCity = createLostAnimalEntityDto.LostAddressCity,
            LostGeoPosition = createLostAnimalEntityDto.LostGeoPosition,
            Description = createLostAnimalEntityDto.Description,
            LostDate = createLostAnimalEntityDto.LostDate,
            Gender = createLostAnimalEntityDto.Gender,
            Age = createLostAnimalEntityDto.Age,
            UserId = userId,
            FileNames = string.Join(";", fileNames)
        };
        
        try
        {
            var result = await repository.AddAsync(lostAnimalEntity, CancellationToken.None);
            await repository.SaveChangesAsync();
            var createdLostAnimal = new LostEnimalEntityDto(result);
            return OperationResult<LostEnimalEntityDto>.Success(createdLostAnimal);
        }
        catch (Exception)
        {
            return OperationResult<LostEnimalEntityDto>.Failure("Failed to create lostAnimalEntity");
        }
    }
}
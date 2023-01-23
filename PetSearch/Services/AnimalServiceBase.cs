using System.Linq.Expressions;
using System.Net;
using PetSearch.Common;
using PetSearch.Models;
using PetSearch.Models.DTO;
using PetSearch.Repositories;
using PetSearch.Services.Abstractions;
using PetSearch.Services.Providers.Abstractions;

namespace PetSearch.Services;

public abstract class AnimalServiceBase<TAnimal> : IAnimalService<TAnimal>
    where TAnimal : Animal, new()
{
    private readonly IRepository<TAnimal> repository;
    private readonly IFileProvider fileProvider;

    protected AnimalServiceBase(IRepository<TAnimal> repository, IFileProvider fileProvider)
    {
        this.repository = repository;
        this.fileProvider = fileProvider;
    }

    public async Task<IEnumerable<TAnimal>> GetAnimals(Expression<Func<TAnimal, bool>> expression, bool sortDesc, int take, int skip)
    {
        return await repository.ListWithOrderAsync(expression,
            animal => animal.LostDate,
            sortDesc,
            take,
            skip,
            CancellationToken.None);
    }

    public async Task<IEnumerable<string>> GetAnimalsCities()
    {
        var animals = await repository.ListAsync(animal => animal.LostAddressCity != null,
            animal => animal.LostAddressCity, CancellationToken.None);
        return animals.Distinct()!;
    }

    public async Task<TAnimal?> GetAnimal(Guid id)
    {
        return await repository.FirstOrDefaultAsync(animal => animal.Id == id, CancellationToken.None);
    }

    public async Task<OperationResult<AnimalEntityDto>> CreateAnimal(
        CreateAnimalDto createAnimalDto,
        Guid userId)
    {
        var uploadFilesResult = await fileProvider.UploadFiles(createAnimalDto.Images);
        if (!uploadFilesResult.IsSuccessful)
            return OperationResult<AnimalEntityDto>.Failure(uploadFilesResult.ErrorMessage);

        var fileNames = uploadFilesResult.Result;

        var animal = new TAnimal
        {
            AnimalName = createAnimalDto.AnimalName,
            AnimalType = createAnimalDto.AnimalType,
            LostAddressFull = createAnimalDto.AddressFull,
            LostAddressCity = createAnimalDto.AddressCity,
            LostGeoPosition = createAnimalDto.GeoPosition,
            Description = createAnimalDto.Description,
            Contacts = createAnimalDto.Contacts,
            LostDate = createAnimalDto.Date,
            PostCreationDate = createAnimalDto.PostCreationDate,
            Gender = createAnimalDto.Gender,
            Age = createAnimalDto.Age,
            UserId = userId,
            FileNames = string.Join(";", fileNames)
        };

        try
        {
            var result = await repository.AddAsync(animal, CancellationToken.None);
            await repository.SaveChangesAsync();
            var createdLostAnimal = new AnimalEntityDto(result);
            return OperationResult<AnimalEntityDto>.Success(createdLostAnimal);
        }
        catch (Exception)
        {
            return OperationResult<AnimalEntityDto>.Failure("Failed to create lostAnimalEntity");
        }
    }

    public async Task CloseAnimalPost(TAnimal animal)
    {
        animal.IsClosed = true;
        await repository.SaveChangesAsync();
    }

    public async Task<OperationResult> DeleteAnimal(Guid id)
    {
        var animal = await repository.SingleOrDefaultAsync(animal => animal.Id == id, CancellationToken.None);
        if (animal == null)
            return OperationResult.Failure("Entity not found", (int)HttpStatusCode.NotFound);

        await repository.RemoveAsync(animal);
        await repository.SaveChangesAsync();
        return OperationResult.Success();
    }
}
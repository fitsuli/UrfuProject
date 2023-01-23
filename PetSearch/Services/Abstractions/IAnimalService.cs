using System.Linq.Expressions;
using PetSearch.Common;
using PetSearch.Models;
using PetSearch.Models.DTO;

namespace PetSearch.Services.Abstractions;

public interface IAnimalService<TAnimal> where TAnimal : Animal
{
    Task<IEnumerable<TAnimal>> GetAnimals(Expression<Func<TAnimal, bool>> expression, bool sortDesc, int take, int skip);
    Task<IEnumerable<string>> GetAnimalsCities();
    Task<TAnimal?> GetAnimal(Guid id);
    Task<OperationResult<AnimalEntityDto>> CreateAnimal(CreateAnimalDto createAnimalDto, Guid userId);
    Task CloseAnimalPost(TAnimal animal);
    Task<OperationResult> DeleteAnimal(Guid id);
}
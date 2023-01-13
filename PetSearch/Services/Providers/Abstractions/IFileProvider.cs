using PetSearch.Common;
using PetSearch.Models;

namespace PetSearch.Services.Providers.Abstractions;

public interface IFileProvider<TAnimal> where TAnimal : Animal
{
    Task<OperationResult<IEnumerable<string>>> UploadFiles(IFormFile[] files);
}
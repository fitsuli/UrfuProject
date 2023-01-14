using PetSearch.Common;

namespace PetSearch.Services.Providers.Abstractions;

public interface IFileProvider
{
    Task<OperationResult<IEnumerable<string>>> UploadFiles(IFormFile[] files);
}
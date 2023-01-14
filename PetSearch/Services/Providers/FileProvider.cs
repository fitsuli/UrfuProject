using PetSearch.Common;
using PetSearch.Models;
using PetSearch.Services.Providers.Abstractions;

namespace PetSearch.Services.Providers;

public class FileProvider : IFileProvider
{
    private readonly string filesDirectory;
    private readonly string baseDirectoryPath;
    private readonly string[] permittedExtensions = { ".png", ".jpg", ".bmp", ".jpeg", ".webp" };

    public FileProvider(string filesDirectory, IWebHostEnvironment environment)
    {
        this.filesDirectory = filesDirectory;
        baseDirectoryPath = environment.ContentRootPath;;
    }

    public async Task<OperationResult<IEnumerable<string>>> UploadFiles(IFormFile[] files)
    {
        var fileNames = new List<string>();
        var directory = Path.Combine(baseDirectoryPath, "StaticFiles", filesDirectory);

        if (!IsPermittedFiles(files))
            return OperationResult<IEnumerable<string>>.Failure("Wrong files format");

        if (files.Any())
        {
            if (!Directory.Exists(directory))
                Directory.CreateDirectory(directory);
        }
        
        foreach (var file in files)
        {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            fileNames.Add(fileName);
            var filePath = Path.Combine(directory, fileName);

            await using var stream = File.Create(filePath);
            await file.CopyToAsync(stream);
        }

        return OperationResult<IEnumerable<string>>.Success(fileNames);
    }

    private bool IsPermittedFiles(IFormFile[] files)
    {
        foreach (var file in files)
        {
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (string.IsNullOrEmpty(extension) || !permittedExtensions.Contains(extension))
                return false;
        }

        return true;
    }
}
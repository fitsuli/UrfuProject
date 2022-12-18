using PetSearch.Services.Providers.Abstractions;

namespace PetSearch.Services.Providers;

public class LostAnimalsFileProvider : FileProvider, ILostAnimalsFileProvider
{
    public LostAnimalsFileProvider(string filesDirectory, IWebHostEnvironment environment) : 
        base(filesDirectory, environment)
    {
    }
}
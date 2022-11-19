using PetSearch.Models;

namespace PetSearch.Services.Abstractions;

public interface IUserService
{
    Task<User?> GetUser(Guid userId);
}
using PetSearch.Models;
using PetSearch.Repositories.Abstractions;
using PetSearch.Services.Abstractions;

namespace PetSearch.Services;

public class UserService : IUserService
{
    private readonly IUserRepository userRepository;

    public UserService(IUserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public async Task<User?> GetUser(Guid userId)
    {
        var user = await userRepository.FirstOrDefaultAsync(user => user.Id == userId, CancellationToken.None);
        return user;
    }
}
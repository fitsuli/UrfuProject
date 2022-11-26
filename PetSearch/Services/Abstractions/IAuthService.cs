using PetSearch.Common;
using PetSearch.Models.DTO;

namespace PetSearch.Services.Abstractions
{
    public interface IAuthService
    {
        Task<OperationResult> SignIn(HttpContext httpContext, string login, string password);
        Task<OperationResult> SignUp(HttpContext httpContext, SignUpDto signUpDto);
    }
}
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using PetSearch.Common;
using PetSearch.Models;
using PetSearch.Models.DTO;
using PetSearch.Repositories.Abstractions;
using PetSearch.Services.Abstractions;

namespace PetSearch.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository authRepository;
        private readonly IUserRepository userRepository;

        public AuthService(IAuthRepository authRepository, IUserRepository userRepository)
        {
            this.authRepository = authRepository;
            this.userRepository = userRepository;
        }

        public async Task<OperationResult> SignIn(HttpContext httpContext, string login, string password)
        {
            var userAuth = await authRepository
                .FirstOrDefaultAsync(auth => auth.Login == login && auth.Password == password, CancellationToken.None);
            
            if (userAuth == null)
                return OperationResult.Failure("Неверный логин или пароль");

            await SignIn(httpContext, userAuth.UserId);
            
            return OperationResult.Success();
        }
        
        public async Task<OperationResult> SignUp(HttpContext httpContext, RegistrationDto registrationDto)
        {
            var isUserExists = await authRepository.Any(userAuth => userAuth.Login == registrationDto.Login);
            if (isUserExists)
                return OperationResult.Failure("Пользователь с таким логином уже зарегестрирован");

            var user = new User
            {
                FullName = registrationDto.FullName,
                Role = registrationDto.Role
            };

            await userRepository.AddAsync(user, CancellationToken.None);
            await userRepository.SaveChangesAsync();

            var userAuth = new UserAuth
            {
                Login = registrationDto.Login,
                Password = registrationDto.Password,
                UserId = user.Id
            };

            await authRepository.AddAsync(userAuth, CancellationToken.None);
            await authRepository.SaveChangesAsync();

            await SignIn(httpContext, user.Id);

            return OperationResult.Success();
        }

        private Task SignIn(HttpContext httpContext, Guid userId)
        {
            var claims = new List<Claim>
            {
                new(ClaimsIdentity.DefaultNameClaimType, userId.ToString())
            };

            var id = new ClaimsIdentity(claims, "auth", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            return httpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}
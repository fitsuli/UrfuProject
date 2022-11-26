using Microsoft.AspNetCore.Mvc;
using PetSearch.Models.DTO;
using PetSearch.Services.Abstractions;

namespace PetSearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;
        
        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("signUp")]
        public async Task<IActionResult> SignUp([FromBody] SignUpDto signUpDto)
        {
            var singUpResult = await authService.SignUp(HttpContext, signUpDto);
            if (!singUpResult.IsSuccessful)
                return BadRequest(singUpResult.ErrorMessage);

            return Ok();
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn([FromHeader] string login, [FromHeader] string password)
        {
            var signInResult = await authService.SignIn(HttpContext, login, password);
            if (!signInResult.IsSuccessful)
                return BadRequest(signInResult.ErrorMessage);

            return Ok();
        }
    }
}
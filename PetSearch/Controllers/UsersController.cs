using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetSearch.Common.Extensions;
using PetSearch.Models;
using PetSearch.Services.Abstractions;

namespace PetSearch.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
public class UsersController : ControllerBase
{
    private readonly IUserService userService;
    
    public UsersController(IUserService userService)
    {
        this.userService = userService;
    }
    
    [HttpGet("me")]
    public async Task<ActionResult<User>> GetSignedInUser()
    {
        var userId = HttpContext.GetUserId();
        if (!userId.HasValue)
        {
            return Unauthorized("User is not authorized");
        }

        return await GetUserById(userId.Value);
    }
    
    [HttpGet("{userId}")]
    public async Task<ActionResult<User>> GetUserById([FromRoute] string userId)
    {
        if (!Guid.TryParse(userId, out var parsedUserId))
            return BadRequest();
        
        var currentUserId = HttpContext.GetUserId();

        if (!currentUserId.HasValue)
            return BadRequest();

        if (currentUserId.Value != parsedUserId)
            return Forbid("You can't access other users data");

        return await GetUserById(parsedUserId);
    }

    private async Task<ActionResult<User>> GetUserById(Guid userId)
    {
        var user = await userService.GetUser(userId);
        if (user == null)
            return NotFound();

        return Ok(user);
    }
}
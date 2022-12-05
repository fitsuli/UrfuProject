using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetSearch.Models;
using PetSearch.Services.Abstractions;

namespace PetSearch.Controllers;

[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
[ApiController]
public class LostAnimalController : ControllerBase
{
    private readonly ILostAnimalService lostAnimalService;
    
    public LostAnimalController(ILostAnimalService lostAnimalService)
    {
        this.lostAnimalService = lostAnimalService;
    }

    [HttpGet("{lostAnimalId}")]
    public async Task<ActionResult> GetLostAnimalById([FromRoute] string lostAnimalId)
    {
        if (!Guid.TryParse(lostAnimalId, out var lostAnimalGuid))
            return BadRequest();

        var lostAnimal = await lostAnimalService.GetLostAnimalEntity(lostAnimalGuid);
        return Ok(lostAnimal);
    }

    [HttpPost]
    public async Task<ActionResult> CreateLostAnimal(LostAnimalEntity lostAnimalEntity)
    {
        var createResult = await lostAnimalService.CreateLostAnimalEntity(lostAnimalEntity);
        if (!createResult.IsSuccessful)
        {
            return BadRequest(createResult.ErrorMessage);
        }

        return Ok();
    }
}
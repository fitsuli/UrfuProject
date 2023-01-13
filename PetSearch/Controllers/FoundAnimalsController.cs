using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetSearch.Models;
using PetSearch.Services.Abstractions;

namespace PetSearch.Controllers;

[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
[ApiController]
public class FoundAnimalsController : AnimalControllerBase<FoundAnimal>
{
    public FoundAnimalsController(IAnimalService<FoundAnimal> animalService) : base(animalService)
    {
    }
}
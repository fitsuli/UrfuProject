﻿using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetSearch.Common.Extensions;
using PetSearch.Models.DTO;
using PetSearch.Services.Abstractions;

namespace PetSearch.Controllers;

[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
[ApiController]
public class LostAnimalsController : ControllerBase
{
    private readonly ILostAnimalService lostAnimalService;
    
    public LostAnimalsController(ILostAnimalService lostAnimalService)
    {
        this.lostAnimalService = lostAnimalService;
    }
    
    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        var lostAnimals = await lostAnimalService.GetLostAnimals();
        return Ok(lostAnimals);
    }

    [HttpGet("{lostAnimalId}")]
    public async Task<ActionResult> GetLostAnimalById([FromRoute] string lostAnimalId)
    {
        if (!Guid.TryParse(lostAnimalId, out var lostAnimalGuid))
            return BadRequest();

        var lostAnimal = await lostAnimalService.GetLostAnimalEntity(lostAnimalGuid);
        if (lostAnimal == null)
            return NotFound();
        
        return Ok(lostAnimal);
    }

    [HttpPost]
    public async Task<ActionResult> CreateLostAnimal([FromForm] CreateLostAnimalEntityDto createLostAnimalEntityDto)
    {
        var userId = HttpContext.GetUserId();
        if (userId == null)
            return BadRequest();
        
        var createResult = await lostAnimalService.CreateLostAnimalEntity(createLostAnimalEntityDto, userId.Value);
        if (!createResult.IsSuccessful)
        {
            return BadRequest(createResult.ErrorMessage);
        }

        return Ok(createResult.Result);
    }
}
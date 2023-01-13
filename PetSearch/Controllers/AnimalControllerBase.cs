using Microsoft.AspNetCore.Mvc;
using PetSearch.Common.Extensions;
using PetSearch.Models;
using PetSearch.Models.DTO;
using PetSearch.Services.Abstractions;

namespace PetSearch.Controllers;

public abstract class AnimalControllerBase<TAnimal> : ControllerBase 
    where TAnimal : Animal
{
    private readonly IAnimalService<TAnimal> animalService;
    
    public AnimalControllerBase(IAnimalService<TAnimal> animalService)
    {
        this.animalService = animalService;
    }
    
    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        var lostAnimals = await animalService.GetAnimals();
        var result = lostAnimals.Select(animal => new AnimalEntityDto(animal));
        return Ok(result);
    }

    [HttpGet("{animalId}")]
    public async Task<ActionResult> GetLostAnimalById([FromRoute] Guid animalId)
    {
        var lostAnimal = await animalService.GetAnimal(animalId);
        if (lostAnimal == null)
            return NotFound();
        
        return Ok(new AnimalEntityDto(lostAnimal));
    }

    [HttpPost]
    public async Task<ActionResult> CreateLostAnimal([FromForm] CreateAnimalDto createAnimalDto)
    {
        var userId = HttpContext.GetUserId();
        if (userId == null)
            return BadRequest();
        
        var createResult = await animalService.CreateAnimal(createAnimalDto, userId.Value);
        if (!createResult.IsSuccessful)
        {
            return BadRequest(createResult.ErrorMessage);
        }

        return Ok(createResult.Result);
    }

    [HttpPost("close/{animalId}")]
    public async Task<ActionResult> CloseLostAnimalPost([FromRoute] Guid animalId)
    {
        var userId = HttpContext.GetUserId();
        if (userId == null)
            return BadRequest();
        
        var lostAnimalEntity = await animalService.GetAnimal(animalId);
        if (lostAnimalEntity == null)
            return NotFound("Lost animal not found");

        if (lostAnimalEntity.UserId != userId)
            return Forbid("You cannot close this lost animal post because you didn't create it");

        await animalService.CloseAnimalPost(lostAnimalEntity);
        return Ok();
    }

    [HttpDelete("{animalId}")]
    public async Task<ActionResult> DeleteLostAnimalPost([FromRoute] Guid animalId)
    {
        var userId = HttpContext.GetUserId();
        if (userId == null)
            return BadRequest();
        
        var lostAnimalEntity = await animalService.GetAnimal(animalId);
        if (lostAnimalEntity == null)
            return NotFound("Lost animal not found");

        if (lostAnimalEntity.UserId != userId)
            return Forbid("You cannot delete this lost animal post because you didn't create it");

        var result = await animalService.DeleteAnimal(animalId);
        if (!result.IsSuccessful)
            return StatusCode(result.HttpStatusCode.Value);
        
        return Ok();
    }
}
using Microsoft.AspNetCore.Mvc;
using PetSearch.Common;
using PetSearch.Common.Extensions;
using PetSearch.Models;
using PetSearch.Models.DTO;
using PetSearch.Services.Abstractions;

namespace PetSearch.Controllers;

public abstract class AnimalControllerBase<TAnimal> : ControllerBase
    where TAnimal : Animal
{
    private readonly IAnimalService<TAnimal> animalService;

    protected AnimalControllerBase(IAnimalService<TAnimal> animalService)
    {
        this.animalService = animalService;
    }

    [HttpGet]
    public async Task<ActionResult> GetAll([FromQuery] string? sortType,
        [FromQuery] string? animalType,
        [FromQuery] string? city,
        [FromQuery] int take = 100,
        [FromQuery] int skip = 0)
    {
        /*if (take >= 20)
            return BadRequest();*/

        var searchSpecification = Specification<TAnimal>.Empty();
        if (!string.IsNullOrEmpty(city))
        {
            searchSpecification =
                searchSpecification.And(new Specification<TAnimal>(animal => animal.LostAddressCity == city));
        }

        if (!string.IsNullOrEmpty(animalType))
        {
            if (animalType == "Другой")
                searchSpecification = searchSpecification.And(new Specification<TAnimal>(animal =>
                    animal.AnimalType != "Кошка" && animal.AnimalType != "Собака"));
            else
                searchSpecification =
                    searchSpecification.And(new Specification<TAnimal>(animal => animal.AnimalType == animalType));
        }

        var sortDesc = sortType != "asc";
        var animals = await animalService.GetAnimals(searchSpecification.IsSatisfiedBy(), sortDesc, take, skip);
        var result = animals.Select(animal => new AnimalEntityDto(animal));
        return Ok(result);
    }

    [HttpGet("cities")]
    public async Task<ActionResult> GetAnimalsCities()
    {
        var animalsCities = await animalService.GetAnimalsCities();
        return Ok(animalsCities);
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
        return Ok(lostAnimalEntity);
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

        return Ok(lostAnimalEntity);
    }
}
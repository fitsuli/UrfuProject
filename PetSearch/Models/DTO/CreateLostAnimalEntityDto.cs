namespace PetSearch.Models.DTO;

public class CreateLostAnimalEntityDto
{
    public string AnimalName { get; set; }
    public string AnimalType { get; set; }
    public string LostArea { get; set; }
    public string Description { get; set; }
    public DateTime LostDate { get; set; }
    public IFormFile[] Images { get; set; }
}
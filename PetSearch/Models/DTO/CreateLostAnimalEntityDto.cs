using PetSearch.Models.Enums;

namespace PetSearch.Models.DTO;

public class CreateLostAnimalEntityDto
{
    public string AnimalName { get; set; }
    public string AnimalType { get; set; }
    public string LostAddressFull { get; set; }
    public string LostAddressCity { get; set; }
    public string LostGeoPosition { get; set; }
    public string Description { get; set; }
    public Gender Gender { get; set; }
    public int Age { get; set; }
    public DateTime LostDate { get; set; }
    public IFormFile[] Images { get; set; }
}
using PetSearch.Models.Enums;

namespace PetSearch.Models.DTO;

public class CreateAnimalDto
{
    public string? AnimalName { get; set; }
    public string AnimalType { get; set; }
    public string AddressFull { get; set; }
    public string? AddressCity { get; set; }
    public string GeoPosition { get; set; }
    public string Description { get; set; }
    public Contacts Contacts { get; set; }
    public Gender Gender { get; set; }
    public int Age { get; set; }
    public DateTime Date { get; set; }
    public DateTime PostCreationDate { get; set; }
    public IFormFile[] Images { get; set; }
}
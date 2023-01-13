using PetSearch.Models.Enums;

namespace PetSearch.Models.DTO;

public class AnimalEntityDto : BaseEntity
{
    public string? AnimalName { get; set; }
    public string AnimalType { get; set; }
    public string AddressFull { get; set; }
    public string AddressCity { get; set; }
    public string GeoPosition { get; set; }
    public string Description { get; set; }
    public Contacts Contacts { get; set; }
    public Gender Gender { get; set; }
    public int Age { get; set; }
    public bool IsClosed { get; set; }
    public DateTime Date { get; set; }
    public DateTime PostCreationDate { get; set; }
    public Guid UserId { get; set; }
    public IEnumerable<string> FileNames { get; set; }
    

    public AnimalEntityDto(){}

    public AnimalEntityDto(Animal animal)
    {
        AnimalName = animal.AnimalName;
        AnimalType = animal.AnimalType;
        AddressFull = animal.LostAddressFull;
        AddressCity = animal.LostAddressCity;
        GeoPosition = animal.LostGeoPosition;
        Description = animal.Description;
        Contacts = animal.Contacts;
        Date = animal.LostDate;
        PostCreationDate = animal.PostCreationDate;
        UserId = animal.UserId;
        Gender = animal.Gender;
        Age = animal.Age;
        IsClosed = animal.IsClosed;
        Id = animal.Id;
        FileNames = animal.FileNames.Split(";").Where(x => !string.IsNullOrEmpty(x));
    }
}
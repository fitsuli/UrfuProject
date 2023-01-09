using PetSearch.Models.Enums;

namespace PetSearch.Models.DTO;

public class LostEnimalEntityDto : BaseEntity
{
    public string AnimalName { get; set; }
    public string AnimalType { get; set; }
    public string LostAddressFull { get; set; }
    public string LostAddressCity { get; set; }
    public string LostGeoPosition { get; set; }
    public string Description { get; set; }
    public Contacts Contacts { get; set; }
    public Gender Gender { get; set; }
    public int Age { get; set; }
    public DateTime LostDate { get; set; }
    public Guid UserId { get; set; }
    public IEnumerable<string> FileNames { get; set; }
    

    public LostEnimalEntityDto(){}

    public LostEnimalEntityDto(LostAnimalEntity lostAnimalEntity)
    {
        AnimalName = lostAnimalEntity.AnimalName;
        AnimalType = lostAnimalEntity.AnimalType;
        LostAddressFull = lostAnimalEntity.LostAddressFull;
        LostAddressCity = lostAnimalEntity.LostAddressCity;
        LostGeoPosition = lostAnimalEntity.LostGeoPosition;
        Description = lostAnimalEntity.Description;
        Contacts = lostAnimalEntity.Contacts;
        LostDate = lostAnimalEntity.LostDate;
        UserId = lostAnimalEntity.UserId;
        Gender = lostAnimalEntity.Gender;
        Age = lostAnimalEntity.Age;
        Id = lostAnimalEntity.Id;
        FileNames = lostAnimalEntity.FileNames.Split(";").Where(x => !string.IsNullOrEmpty(x));
    }
}
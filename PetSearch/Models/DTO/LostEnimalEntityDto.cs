using PetSearch.Models.Enums;

namespace PetSearch.Models.DTO;

public class LostEnimalEntityDto : BaseEntity
{
    public string AnimalName { get; set; }
    public string AnimalType { get; set; }
    public string LostArea { get; set; }
    public string Description { get; set; }
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
        LostArea = lostAnimalEntity.LostArea;
        Description = lostAnimalEntity.Description;
        LostDate = lostAnimalEntity.LostDate;
        UserId = lostAnimalEntity.UserId;
        Gender = lostAnimalEntity.Gender;
        Age = lostAnimalEntity.Age;
        Id = lostAnimalEntity.Id;
        FileNames = lostAnimalEntity.FileNames.Split(";").Where(x => !string.IsNullOrEmpty(x));
    }
}
namespace PetSearch.Models.DTO;

public class LostEnimalEntityDto
{
    public string AnimalName { get; set; }
    public string AnimalType { get; set; }
    public string LostArea { get; set; }
    public string Description { get; set; }
    public DateTime LostDate { get; set; }
    public Guid UserId { get; set; }
    public IEnumerable<string> Images { get; set; }
    
    public LostEnimalEntityDto(){}

    public LostEnimalEntityDto(LostAnimalEntity lostAnimalEntity)
    {
        AnimalName = lostAnimalEntity.AnimalName;
        AnimalType = lostAnimalEntity.AnimalType;
        LostArea = lostAnimalEntity.LostArea;
        Description = lostAnimalEntity.Description;
        LostDate = lostAnimalEntity.LostDate;
        UserId = lostAnimalEntity.UserId;
        Images = lostAnimalEntity.FileNames.Split(";");
    }
}
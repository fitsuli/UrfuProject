﻿namespace PetSearch.Models;

public class LostAnimalEntity : BaseEntity
{
    public string AnimalName { get; set; }
    public string AnimalType { get; set; }
    public string LostArea { get; set; }
    public string Description { get; set; }
    public DateTime LostDate { get; set; }
    public Guid UserId { get; set; }
}
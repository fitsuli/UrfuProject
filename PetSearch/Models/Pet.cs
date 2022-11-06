namespace PetSearch.Models
{
    public class Pet : BaseEntity
    {
        public string? Name { get; set; }
        public int? Age { get; set; }
        public string? Description { get; set; }
        public string Type { get; set; } 
    }
}
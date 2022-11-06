namespace PetSearch.Models
{
    public class PetOwner : BaseEntity
    {
        public string Name { get; set; }
        public string? Phone { get; set; }
    }
}
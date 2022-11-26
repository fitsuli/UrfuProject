using PetSearch.Models.Enums;

namespace PetSearch.Models
{
    public class User : BaseEntity
    {
        public string FullName { get; set; }
        public Role Role { get; set; }
        public string? Phone { get; set; }
    }
}
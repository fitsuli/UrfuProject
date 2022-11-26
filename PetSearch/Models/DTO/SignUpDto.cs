using PetSearch.Models.Enums;

namespace PetSearch.Models.DTO
{
    public class SignUpDto
    {
        public string FullName { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
    }
}
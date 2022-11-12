namespace PetSearch.Models
{
    public class UserAuth : BaseEntity
    {
        public Guid UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
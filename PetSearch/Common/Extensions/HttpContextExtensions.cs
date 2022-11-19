namespace PetSearch.Common.Extensions
{
    public static class HttpContextExtensions
    {
        public static Guid? GetUserId(this HttpContext context)
        {
            var id = context.User.Identity?.Name;

            if (id != null && Guid.TryParse(id, out var parsedId))
                return parsedId;

            return null;
        }
    }
}
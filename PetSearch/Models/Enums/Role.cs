using System.Text.Json.Serialization;

namespace PetSearch.Models.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Role
{
    User,
    Admin
}
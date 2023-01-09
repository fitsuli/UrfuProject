using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetSearch.Migrations
{
    public partial class AddedContacts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Contacts_Email",
                table: "LostAnimals",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Contacts_Phone",
                table: "LostAnimals",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Contacts_Telegram",
                table: "LostAnimals",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Contacts_Vk",
                table: "LostAnimals",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Contacts_WhatsApp",
                table: "LostAnimals",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Contacts_Email",
                table: "LostAnimals");

            migrationBuilder.DropColumn(
                name: "Contacts_Phone",
                table: "LostAnimals");

            migrationBuilder.DropColumn(
                name: "Contacts_Telegram",
                table: "LostAnimals");

            migrationBuilder.DropColumn(
                name: "Contacts_Vk",
                table: "LostAnimals");

            migrationBuilder.DropColumn(
                name: "Contacts_WhatsApp",
                table: "LostAnimals");
        }
    }
}

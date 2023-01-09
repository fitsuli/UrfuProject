using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetSearch.Migrations
{
    public partial class DeteletContactsField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Contacts_WhatsApp",
                table: "LostAnimals");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Contacts_WhatsApp",
                table: "LostAnimals",
                type: "text",
                nullable: true);
        }
    }
}

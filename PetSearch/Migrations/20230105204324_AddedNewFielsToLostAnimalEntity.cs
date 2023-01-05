using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetSearch.Migrations
{
    public partial class AddedNewFielsToLostAnimalEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LostArea",
                table: "LostAnimals",
                newName: "LostGeoPosition");

            migrationBuilder.AddColumn<string>(
                name: "LostAddressCity",
                table: "LostAnimals",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LostAddressFull",
                table: "LostAnimals",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LostAddressCity",
                table: "LostAnimals");

            migrationBuilder.DropColumn(
                name: "LostAddressFull",
                table: "LostAnimals");

            migrationBuilder.RenameColumn(
                name: "LostGeoPosition",
                table: "LostAnimals",
                newName: "LostArea");
        }
    }
}

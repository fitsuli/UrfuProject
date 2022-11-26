using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetSearch.Migrations
{
    public partial class UpdatedModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LostAnimals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AnimalName = table.Column<string>(type: "text", nullable: false),
                    AnimalType = table.Column<string>(type: "text", nullable: false),
                    LostArea = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LostAnimals", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LostAnimals");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Users");
        }
    }
}

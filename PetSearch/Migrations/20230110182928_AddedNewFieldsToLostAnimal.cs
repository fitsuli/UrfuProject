using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetSearch.Migrations
{
    public partial class AddedNewFieldsToLostAnimal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsClosed",
                table: "LostAnimals",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "PostCreationDate",
                table: "LostAnimals",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsClosed",
                table: "LostAnimals");

            migrationBuilder.DropColumn(
                name: "PostCreationDate",
                table: "LostAnimals");
        }
    }
}

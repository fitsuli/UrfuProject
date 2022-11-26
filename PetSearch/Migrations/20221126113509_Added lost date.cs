using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetSearch.Migrations
{
    public partial class Addedlostdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LostDate",
                table: "LostAnimals",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LostDate",
                table: "LostAnimals");
        }
    }
}

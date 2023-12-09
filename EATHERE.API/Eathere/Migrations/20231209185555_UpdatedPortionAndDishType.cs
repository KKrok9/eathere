using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eathere.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedPortionAndDishType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasAlcohol",
                table: "DishTypes");

            migrationBuilder.DropColumn(
                name: "IsVegan",
                table: "DishTypes");

            migrationBuilder.RenameColumn(
                name: "PortionName",
                table: "PortionTypes",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "TypeName",
                table: "DishTypes",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "PortionTypes",
                newName: "PortionName");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "DishTypes",
                newName: "TypeName");

            migrationBuilder.AddColumn<bool>(
                name: "HasAlcohol",
                table: "DishTypes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsVegan",
                table: "DishTypes",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}

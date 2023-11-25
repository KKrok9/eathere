using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eathere.Migrations
{
    /// <inheritdoc />
    public partial class DishTableEditAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_PortionTypes_PortionTypeId",
                table: "Dishes");

            migrationBuilder.AlterColumn<Guid>(
                name: "PortionTypeId",
                table: "Dishes",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_PortionTypes_PortionTypeId",
                table: "Dishes",
                column: "PortionTypeId",
                principalTable: "PortionTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_PortionTypes_PortionTypeId",
                table: "Dishes");

            migrationBuilder.AlterColumn<Guid>(
                name: "PortionTypeId",
                table: "Dishes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_PortionTypes_PortionTypeId",
                table: "Dishes",
                column: "PortionTypeId",
                principalTable: "PortionTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

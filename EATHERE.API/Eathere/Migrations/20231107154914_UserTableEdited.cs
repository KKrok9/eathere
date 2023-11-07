using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eathere.Migrations
{
    /// <inheritdoc />
    public partial class UserTableEdited : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BirthdayDate",
                table: "Users",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContactNumber",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthdayDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ContactNumber",
                table: "Users");
        }
    }
}

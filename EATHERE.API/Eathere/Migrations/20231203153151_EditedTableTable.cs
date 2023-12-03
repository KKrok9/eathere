using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eathere.Migrations
{
    /// <inheritdoc />
    public partial class EditedTableTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TableName",
                table: "Tables",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Tables",
                newName: "TableName");
        }
    }
}

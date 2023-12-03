using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Eathere.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedSomeTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_DishTypes_DishTypeId",
                table: "Dishes");

            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_PortionTypes_PortionTypeId",
                table: "Dishes");

            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_Restaurants_RestaurantId",
                table: "Dishes");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Restaurants_RestaurantId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Tables_Orders_OrderId",
                table: "Tables");

            migrationBuilder.DropForeignKey(
                name: "FK_Tables_Restaurants_RestaurantId",
                table: "Tables");

            migrationBuilder.DropIndex(
                name: "IX_Tables_OrderId",
                table: "Tables");

            migrationBuilder.DropIndex(
                name: "IX_Tables_RestaurantId",
                table: "Tables");

            migrationBuilder.DropIndex(
                name: "IX_Orders_RestaurantId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Dishes_DishTypeId",
                table: "Dishes");

            migrationBuilder.DropIndex(
                name: "IX_Dishes_PortionTypeId",
                table: "Dishes");

            migrationBuilder.DropIndex(
                name: "IX_Dishes_RestaurantId",
                table: "Dishes");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Tables");

            migrationBuilder.AlterColumn<Guid>(
                name: "RestaurantId",
                table: "Tables",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "RestaurantId",
                table: "PortionTypes",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DishIds",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "RestaurantId",
                table: "DishTypes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "Ingredients",
                table: "Dishes",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Dishes",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RestaurantId",
                table: "PortionTypes");

            migrationBuilder.DropColumn(
                name: "DishIds",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "RestaurantId",
                table: "DishTypes");

            migrationBuilder.AlterColumn<Guid>(
                name: "RestaurantId",
                table: "Tables",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId",
                table: "Tables",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Ingredients",
                table: "Dishes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Dishes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tables_OrderId",
                table: "Tables",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Tables_RestaurantId",
                table: "Tables",
                column: "RestaurantId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_RestaurantId",
                table: "Orders",
                column: "RestaurantId");

            migrationBuilder.CreateIndex(
                name: "IX_Dishes_DishTypeId",
                table: "Dishes",
                column: "DishTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Dishes_PortionTypeId",
                table: "Dishes",
                column: "PortionTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Dishes_RestaurantId",
                table: "Dishes",
                column: "RestaurantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_DishTypes_DishTypeId",
                table: "Dishes",
                column: "DishTypeId",
                principalTable: "DishTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_PortionTypes_PortionTypeId",
                table: "Dishes",
                column: "PortionTypeId",
                principalTable: "PortionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_Restaurants_RestaurantId",
                table: "Dishes",
                column: "RestaurantId",
                principalTable: "Restaurants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Restaurants_RestaurantId",
                table: "Orders",
                column: "RestaurantId",
                principalTable: "Restaurants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tables_Orders_OrderId",
                table: "Tables",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tables_Restaurants_RestaurantId",
                table: "Tables",
                column: "RestaurantId",
                principalTable: "Restaurants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Knowlify.Infraestructure.Migrations
{
    /// <inheritdoc />
    public partial class BarterChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Transaction");

            migrationBuilder.AddColumn<int>(
                name: "Credits",
                table: "Barter",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Credits",
                table: "Barter");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Transaction",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}

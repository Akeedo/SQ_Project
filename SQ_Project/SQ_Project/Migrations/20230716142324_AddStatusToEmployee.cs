using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SQ_Project.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusToEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "Employee",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "company");

            migrationBuilder.DropTable(
                name: "department");

            migrationBuilder.DropColumn(
                name: "status",
                table: "Employee");
        }
    }
}

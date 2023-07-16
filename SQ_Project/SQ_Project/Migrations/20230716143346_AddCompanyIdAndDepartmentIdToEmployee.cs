using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SQ_Project.Migrations
{
    /// <inheritdoc />
    public partial class AddCompanyIdAndDepartmentIdToEmployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "companyId",
                table: "Employee",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "departmentId",
                table: "Employee",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "companyId",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "departmentId",
                table: "Employee");
        }
    }
}

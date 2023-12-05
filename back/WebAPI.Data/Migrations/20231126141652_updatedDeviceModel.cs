using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Data.Migrations
{
    public partial class updatedDeviceModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaxMessages",
                table: "devices",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Online",
                table: "devices",
                type: "bit",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaxMessages",
                table: "devices");

            migrationBuilder.DropColumn(
                name: "Online",
                table: "devices");
        }
    }
}

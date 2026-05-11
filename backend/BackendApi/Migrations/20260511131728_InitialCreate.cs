using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Simulacoes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ValorInicial = table.Column<decimal>(type: "TEXT", nullable: false),
                    Dias = table.Column<int>(type: "INTEGER", nullable: false),
                    TaxaAnual = table.Column<decimal>(type: "TEXT", nullable: false),
                    RendimentoBruto = table.Column<decimal>(type: "TEXT", nullable: false),
                    Imposto = table.Column<decimal>(type: "TEXT", nullable: false),
                    Liquido = table.Column<decimal>(type: "TEXT", nullable: false),
                    DataConsulta = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Simulacoes", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Simulacoes");
        }
    }
}

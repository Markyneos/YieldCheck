namespace BackendApi.Models;

public class Simulacao
{
    public int Id { get; set; }
    public decimal ValorInicial { get; set; }
    public int Dias { get; set; }
    public decimal TaxaAnual { get; set; }
    public decimal Liquido { get; set; }
    public DateTime DataConsulta { get; set; } = DateTime.Now;
}

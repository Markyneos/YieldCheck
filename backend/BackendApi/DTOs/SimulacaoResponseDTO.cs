namespace BackendApi.DTOs;
public class SimulacaoResponseDTO
{
    public decimal ValorInicial { get; set; }
    public decimal Liquido { get; set; }
    public decimal Imposto { get; set; }
    public decimal RendimentoBruto { get; set; }
    public decimal TaxaAplicada { get; set; }
}

namespace BackendApi.DTOs;
public class ComparacaoDTO
{
    public string Tipo { get; set; } = string.Empty;
    public decimal Taxa { get; set; }
    public decimal Liquido { get; set; }
    public decimal Imposto { get; set; }
    public decimal RendimentoBruto { get; set; }
}

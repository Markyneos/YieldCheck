using BackendApi.Enums;

namespace BackendApi.DTOs;
public class SimulacaoRequestDTO
{
    public decimal ValorInicial { get; set; }
    public int Dias { get; set; }
    public TipoInvestimento TipoInvestimento { get; set; }
}

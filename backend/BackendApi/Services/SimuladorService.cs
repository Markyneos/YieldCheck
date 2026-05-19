using BackendApi.DTOs;
using BackendApi.Enums;

namespace BackendApi.Services;

public class SimuladorService
{
    public SimulacaoResponseDTO Calcular(SimulacaoRequestDTO request)
    {
        decimal taxa = ObterTaxa(request.TipoInvestimento);
        decimal rendimentoBruto =
            request.ValorInicial *
            (taxa / 100) *
            request.Dias / 365;

        decimal aliquota = ObterAliquotaIR(request.Dias);

        decimal imposto =
            request.TipoInvestimento == TipoInvestimento.LCI
            ? 0
            : rendimentoBruto * aliquota;

        decimal liquido =
            request.ValorInicial +
            rendimentoBruto -
            imposto;

        return new SimulacaoResponseDTO
        {
            ValorInicial = request.ValorInicial,
            RendimentoBruto = rendimentoBruto,
            Imposto = imposto,
            Liquido = liquido,
            TaxaAplicada = taxa
        };
    }

    private decimal ObterAliquotaIR(int dias)
    {
        if (dias <= 180)
        {
            return 0.225m;
        }
        if (dias <= 360)
        {
            return 0.20m;
        }
        if (dias <= 720)
        {
            return 0.175m;
        }
        return 0.15m;
    }
    private decimal ObterTaxa(TipoInvestimento tipo)
    {
        return tipo switch
        {
            TipoInvestimento.CDI => 13.15m,
            TipoInvestimento.SELIC => 14.25m,
            TipoInvestimento.LCI => 12.75m,
            TipoInvestimento.CDB => 13.50m,

            _ => 10m
        };
    }

    public List<ComparacaoDTO> CompararInvestimentos(decimal valorInicial, int dias)
    {
        var investimentos = Enum.GetValues<TipoInvestimento>();

        var resultado = new List<ComparacaoDTO>();

        foreach (var investimento in investimentos)
        {
            decimal taxa = ObterTaxa(investimento);

            decimal rendimentoBruto = valorInicial * (taxa / 100) * dias / 365;

            decimal aliquota = ObterAliquotaIR(dias);

            decimal imposto = investimento == TipoInvestimento.LCI ? 0 : rendimentoBruto * aliquota;

            decimal liquido = valorInicial + rendimentoBruto - imposto;

            resultado.Add(new ComparacaoDTO
            {
                Tipo = investimento.ToString(),
                Taxa = taxa,
                Liquido = liquido,
                Imposto = imposto,
                RendimentoBruto = rendimentoBruto
            });
        }

        return resultado;
    }
}
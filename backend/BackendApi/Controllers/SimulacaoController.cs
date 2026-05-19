using Microsoft.AspNetCore.Mvc;
using BackendApi.Data;
using BackendApi.Models;
using BackendApi.Services;
using BackendApi.DTOs;

namespace BackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
    public class SimulacaoController : ControllerBase
    {
    private readonly AppDbContext _context;
    private readonly SimuladorService _service;

    public SimulacaoController(AppDbContext context, SimuladorService service)
    {
        _context = context;
        _service = service;
    }

    [HttpPost]
    public IActionResult Simular([FromBody] SimulacaoRequestDTO request)
    {
        var resultado = _service.Calcular(request);

        var simulacao = new Simulacao
        {
            ValorInicial = request.ValorInicial,
            Dias = request.Dias,
            TaxaAplicada = resultado.TaxaAplicada,
            RendimentoBruto = resultado.RendimentoBruto,
            Imposto = resultado.Imposto,
            Liquido = resultado.Liquido
        };

        _context.Simulacoes.Add(simulacao);

        _context.SaveChanges();

        return Ok(resultado);
    }

    [HttpGet]
    public IActionResult Historico()
    {
        var lista = _context.Simulacoes
            .OrderByDescending(x => x.DataConsulta)
            .ToList();

        return Ok(lista);
    }
}

using Microsoft.AspNetCore.Mvc;
using BackendApi.Data;
using BackendApi.Models;
using BackendApi.Services;

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
    public IActionResult Simular([FromBody] Simulacao request)
    {
        decimal liquido = _service.Calcular(
            request.ValorInicial,
            request.Dias,
            request.TaxaAnual
            );

        request.Liquido = liquido;

        _context.Simulacoes.Add(request);
        _context.SaveChanges();

        return Ok(request);
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

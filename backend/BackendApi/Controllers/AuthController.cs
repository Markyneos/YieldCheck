using BackendApi.Data;
using BackendApi.DTOs;
using BackendApi.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public IActionResult Register(RegisterDTO dto)
    {
        var user = new User
        {
            Nome = dto.Nome,
            Email = dto.Email,
            Senha = dto.Senha
        };

        _context.Users.Add(user);
        _context.SaveChanges();
        return Ok(user);
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDTO dto)
    {
        var user = _context.Users.FirstOrDefault(u =>
            u.Email == dto.Email &&
            u.Senha == dto.Senha);

        if (user == null)
        {
            return Unauthorized();
        }

        var token = GerarToken(user);
        return Ok(new { token });
    }

    private string GerarToken(User user)
    {
        var claims = new[]
        {
            new Claim(
                ClaimTypes.Name,
                user.Email)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"], 
            claims: claims, 
            expires: DateTime.Now.AddHours(2),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

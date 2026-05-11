using Microsoft.EntityFrameworkCore;
using BackendApi.Data;
using BackendApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<SimuladorService>();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=backendapi.db"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/", () => "Hello world");

app.MapControllers();

app.Run();
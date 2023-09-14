using AutoMapper;
using EntityFramework.Exceptions.SqlServer;
using Microsoft.EntityFrameworkCore;
using PUSGS_PR_162_2020.Infrastructure;
using PUSGS_PR_162_2020.Interfaces;
using PUSGS_PR_162_2020.Interfaces.RepoInterfaces;
using PUSGS_PR_162_2020.Mapper;
using PUSGS_PR_162_2020.Repository;
using PUSGS_PR_162_2020.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#region Database Context
//Dependancy injection for APIDBContext
builder.Services.AddDbContext<APIDBContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectString")).UseExceptionProcessor());

#endregion

#region Creating a Mapper Profile
MapperConfiguration config = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MapperProfile());
});
IMapper mapper = config.CreateMapper();
builder.Services.AddSingleton(mapper);
#endregion

#region Adding all the Services
builder.Services.AddScoped<IUserService, UserService>();
//FALI REPOSITORY ZA USER SERVICE!!!!
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

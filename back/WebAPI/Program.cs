using Microsoft.EntityFrameworkCore;
using WebAPI.Core;
using WebAPI.Core.Models;
using WebAPI.Core.Services;
using WebAPI.Services;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<ProjectDbContext>
            (options => options.UseSqlServer
                (builder.Configuration.GetConnectionString("web-api-connection"), 
                b => b.MigrationsAssembly("WebAPI.Data")));
            builder.Services.AddTransient<IDbService, DbService>();
            builder.Services.AddTransient
                <IEntityService<Device>, EntityService<Device>>();


            var provider = builder.Services.BuildServiceProvider();
            var configuration = provider.GetRequiredService<IConfiguration>();
            builder.Services.AddCors(options =>
            {
                var frontendURL = configuration.GetValue<string>("frontend_url");
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader();
                });
            });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
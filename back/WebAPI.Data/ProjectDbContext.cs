using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Models;

namespace WebAPI.Services
    {
        public class ProjectDbContext : DbContext
        {
        public ProjectDbContext(DbContextOptions<ProjectDbContext> options) : base(options)
        {

        }

        DbSet<Device> devices { get; set; }
        }
    }


using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Models;
using WebAPI.Core.Services;

namespace WebAPI.Controllers
{
    [Route("dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IEntityService<Device> _entityService;

        public DashboardController(IEntityService<Device> entityService)
        {
            _entityService = entityService;
        }
    }
}

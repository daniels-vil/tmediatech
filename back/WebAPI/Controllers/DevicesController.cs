using Microsoft.AspNetCore.Mvc;
using WebAPI.Core.Models;
using WebAPI.Core.Services;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("devices")]
    [ApiController]
    public class DevicesController : ControllerBase
    {
        private readonly IEntityService<Device> _entityService;

        public DevicesController(IEntityService<Device> entityService)
        {
          _entityService = entityService;
        }


        [HttpGet]
        [Route("{id}")]
        public IActionResult GetDevice(int id)
        {
            var device = _entityService.GetById(id);

            if(device == null)
            {
                return NotFound($"Device with ID {id} not found!");
            }

            var deviceModel = new DeviceModel
            {
                Id = device.Id,
                Name = device.Name,
                DaysActive = device.DaysActive,
                MaxMessages = device.MaxMessages,
                Messages = device.Messages,
                Model = device.Model,
                Online = device.Online,
            };

            return Ok(deviceModel);
        }

        [HttpGet]
        [Route("list")]
        public IActionResult DevicesList()
        {
            var devices = _entityService.Query().ToList();
            if (devices == null)
            {

                return NotFound("No devices found");
            }
            var deviceModelList = new DeviceListModel();

            deviceModelList.DeviceItems = devices.Select(d => new DeviceModel
            {
                Id = d.Id,
                Name = d.Name,
                DaysActive = d.DaysActive,
                MaxMessages = d.MaxMessages,
                Messages = d.Messages,
                Model = d.Model,
                Online = d.Online,
            }).ToList();

            return Ok(deviceModelList);
        }


        [HttpGet]
        public IActionResult Create()
        {
            return Ok(0);
        }

        [HttpPost]
        public IActionResult Create([FromBody] DeviceModel deviceModel)
        {
            Device device = new Device
            {
                Name = deviceModel.Name,
                Model = deviceModel.Model,
                DaysActive = DateTime.Now,
                Messages = deviceModel.Messages,
                MaxMessages = deviceModel.MaxMessages,
                Online = false
            };
            if (ModelState.IsValid)
            {
                _entityService.Create(device);

                return Ok("Device created");
            }

            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] DeviceModel deviceModel)
        {
            var existingDevice = _entityService.GetById(id);

            if (existingDevice == null)
            {
                return NotFound($"Device with ID {id} not found!");
            }

            existingDevice.Name = deviceModel.Name;
            existingDevice.Model = deviceModel.Model;
            existingDevice.MaxMessages = deviceModel.MaxMessages;
            existingDevice.Online = deviceModel.Online;


            _entityService.Update(existingDevice);

            return Ok($"Device with ID {id} updated successfully!");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingDevice = _entityService.GetById(id);

            if (existingDevice == null)
            {
                return NotFound($"Device with ID {id} not found!");
            }

            _entityService.Delete(existingDevice);

            return Ok($"Device with ID {id} deleted successfully!");
        }

    }
    
}
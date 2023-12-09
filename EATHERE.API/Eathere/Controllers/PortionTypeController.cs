using Eathere.Models;
using Eathere.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Eathere.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortionTypeController : ControllerBase
    {
        private readonly IPortionTypeService _portionTypeService;
        public PortionTypeController(IPortionTypeService portionTypeService)
        {
            _portionTypeService = portionTypeService;
        }

        [HttpPost("AddPortionType")]
        public async Task<ActionResult> AddPortionType(PortionType portionType)
        {
            await _portionTypeService.AddPortionType(portionType);
            return Ok(new { message = "Added new portion Type!" });
        }

        [HttpGet("GetPortionById/{id}")]
        public async Task<ActionResult<PortionType>> GetPortionTypeById(Guid id)
        {
            var portionType = await _portionTypeService.GetPortionTypeById(id);
            if (portionType == null)
            {
                return NotFound();
            }
            return portionType;
        }

        [HttpDelete("DeletePortionType/{id}")]
        public async Task<ActionResult> DeletePortionType(Guid id)
        {
            await _portionTypeService.DeletePortionType(id);
            return Ok();
        }

        [HttpGet("GetAllPortionTypesFromRestaurant/{restaurantId}")]
        public async Task<IEnumerable<PortionType>> GetAllPortionFromSingleRestaurant(Guid restaurantId)
        {
            var portionTypes = await _portionTypeService.GetAllPortionTypesFromRestaurant(restaurantId);
            return portionTypes;
        }
    }
}

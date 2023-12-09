using Eathere.Models;
using Eathere.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Eathere.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishTypeController : ControllerBase
    {
        private readonly IDishTypeService _dishTypeService;
        public DishTypeController(IDishTypeService dishTypeService)
        {
            _dishTypeService = dishTypeService;
        }

        [HttpPost("AddDishType")]
        public async Task<ActionResult> AddDishType(DishType dishType)
        {
            await _dishTypeService.AddDishType(dishType);
            return Ok(new { message = "Added new dish Type!" });
        }

        [HttpGet("GetDishById/{id}")]
        public async Task<ActionResult<DishType>> GetDishTypeById(Guid id)
        {
            var dishType = await _dishTypeService.GetDishTypeById(id);
            if (dishType == null)
            {
                return NotFound();
            }
            return dishType;
        }

        [HttpDelete("DeleteDishType/{id}")]
        public async Task<ActionResult> DeleteDishType(Guid id)
        {
            await _dishTypeService.DeleteDishType(id);
            return Ok();
        }

        [HttpGet("GetAllDishTypesFromRestaurant/{restaurantId}")]
        public async Task<IEnumerable<DishType>> GetAllDishTypesFromRestaurant(Guid restaurantId)
        {
            var dishTypes = await _dishTypeService.GetAllDishTypesFromRestaurant(restaurantId);
            return dishTypes;
        }
    }
}

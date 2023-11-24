using Eathere.Models;
using Eathere.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Eathere.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishController:ControllerBase
    {
        private readonly IDishService _dishService;
        
        public DishController(IDishService dishService)
        {
            _dishService = dishService;
        }

        [HttpPost("AddDish")]
        public async Task<ActionResult> AddDish(Dish dish)
        {   
            await _dishService.AddDish(dish);
            return Ok(new { message = "Added new dish!" });
        }

        [HttpPut("UpdateDish")]
        public async Task<ActionResult> UpdateDish(Dish dish)
        {
            await _dishService.UpdateDish(dish);
            return Ok(new { message = "Updated dish!" });
        }

        [HttpGet("GetDishById/{id}")]
        public async Task<ActionResult<Dish>> GetDishById(Guid id)
        {
            var dish = await _dishService.GetDishById(id);
            if(dish == null)
            {
                return NotFound();
            }
            return dish;
        }

        [HttpDelete("DeleteDish/{id}")]
        public async Task<ActionResult>DeleteDish(Guid id)
        {
            await _dishService.DeleteDish(id);
            return Ok();
        }

        [HttpGet("GetAllDishesFromSingleRestaurant/{restaurantId}")]
        public async Task<IEnumerable<Dish>> GetAllDishesFromSingleRestaurant(Guid restaurantId)
        {
            var dishes = await _dishService.GetAllDishesFromSingleRestaurant(restaurantId);
            return dishes;
        }

    }
}

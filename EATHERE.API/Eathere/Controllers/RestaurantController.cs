using Eathere.Models;
using Eathere.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Eathere.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;
        public RestaurantController(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService;
        }

        [HttpPost("AddRestaurant")]
        public async Task<ActionResult> AddRestaurant(Restaurant restaurant)
        {
            await _restaurantService.AddRestaurant(restaurant);
            return Ok(new { message = "Added new restaurant!" });
        }

        [HttpPut("UpdateRestaurant")]
        public async Task <IActionResult> UpdateRestaurant(Restaurant restaurant)
        {
            await _restaurantService.UpdateRestaurant(restaurant);
            return Ok(new { message = "Restaurant updated!" });
        }

        [HttpGet("CreateRestaurantCode")]
        public async Task<IActionResult> CreateRestaurantCode()
        {
            return Ok(_restaurantService.CreateRestaurantCode());
        }

        [HttpGet("GetRestaurantByOwnerId/{id}")]
        public async Task<ActionResult<Restaurant>> GetRestaurantByOwnerId(Guid id)
        {
            var restaurant = await _restaurantService.GetRestaurantByOwnerId(id);
            if (restaurant == null)
            {
                return NotFound();
            }
            return restaurant;
        }

        [HttpGet("GetRestaurantOfCurrentlyLoggedUser")]
        public async Task<ActionResult<Restaurant>> GetRestaurantOfCurrentlyLoggedUser()
        {
            var restaurant = await _restaurantService.GetRestaurantOfCurrentlyLoggedUser();
            if (restaurant == null)
            {
                return NotFound();
            }
            return restaurant;
        }
    }
}

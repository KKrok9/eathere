using Eathere.Models;
using Eathere.Services;
using Eathere.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Eathere.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService) {
            _orderService = orderService;
        }
        [HttpPost("AddOrder")]
        public async Task<ActionResult> AddOrder(Order order)
        {
            await _orderService.AddOrder(order);
            return Ok(new { message = "added new order" });
        }

        [HttpPut("UpdateOrder")]
        public async Task<ActionResult> UpdateOrder(Order order)
        {
            await _orderService.UpdateOrder(order);
            return Ok(new { message = "upteded order" });
        }

        [HttpDelete("DeleteOrder/{id}")]
        public async Task<ActionResult> DeleteOrder(Guid id)
        {
            await _orderService.DeleteOrder(id);
            return Ok();
        }
        [HttpGet("GetOrderById/{id}")]
        public async Task<ActionResult<Order>> GetOrderById(Guid id)
        {
            var order = await _orderService.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }
            return order;
        }

        [HttpGet("GetAllOrdersFromRestaurant/{restaurantId}")]
        public async Task<IEnumerable<Order>> GetAllOrdersFromSingleRestaurant(Guid restaurantId)
        {
            var orders = await _orderService.GetAllOrdersFromRestaurant(restaurantId);
            return orders;
        }
    }
}

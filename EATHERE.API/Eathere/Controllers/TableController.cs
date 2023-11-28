using Eathere.Models;
using Eathere.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Eathere.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        private readonly ITableService _tableService;
        
        public TableController(ITableService tableService)
        {
            this._tableService = tableService;
        }

        [HttpPost("AddTable")]
        public async Task<ActionResult> AddTable(Table table)
        {
            await _tableService.AddTable(table);
            return Ok(new { message = "ok" });
        }

        [HttpPut("UpdateTable")]
        public async Task<ActionResult> UpdateTable(Table table)
        {
            await _tableService.UpdateTable(table);
            return Ok(new { message = "table updated" });
        }

        [HttpGet("GetTableById/{id}")]
        public async Task<ActionResult<Table>>GetTableById(Guid id)
        {
            var dish = await _tableService.GetTableById(id);
            if(dish == null)
            {
                return NotFound();
            }
            return dish;
        }

        [HttpGet("GetAllTablesFromRestaurant/{restaurantId}")]
        public async Task<IEnumerable<Table>> GetAllTablesFromRestaurant(Guid restaurantId)
        {
            var tables = await _tableService.GetAllTablesFromRestaurant(restaurantId);
            return tables;
        }

        [HttpDelete("DeleteTable/{id}")]
        public async Task<ActionResult>DeleteTable(Guid id)
        {
            await _tableService.DeleteTable(id);
            return Ok();
        }

 

    }
}

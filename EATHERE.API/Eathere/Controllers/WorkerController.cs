using Eathere.Models;
using Eathere.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Eathere.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        private readonly IWorkerService _workerService;
        public WorkerController(IWorkerService workerService)
        {
            _workerService = workerService;
        }

        [HttpGet("GetAllWorkersFromRestaurant")]
        public async Task<IEnumerable<User>> GetAllWorkersFromRestaurant()
        {
            var workers = await _workerService.GetAllWorkersFromRestaurant();
            return workers;
        }

        [HttpGet("GetWorkerById/{id}")]
        public async Task<ActionResult<User>> GetWorkerById(Guid id)
        {
            var worker = await _workerService.GetWorkerById(id);
            return worker;
        }

        [HttpPost("RemoveUserFromRestaurant/{id}")]
        public async Task<IActionResult> RemoveUserFromRestaurant(Guid id)
        {
            await _workerService.RemoveUserFromRestaurant(id);
            return Ok();
        }
    }
}

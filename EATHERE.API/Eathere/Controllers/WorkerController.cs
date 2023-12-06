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

        [HttpPut("RemoveUserFromRestaurant")]
        public async Task<IActionResult> RemoveUserFromRestaurant(User worker)
        {
            await _workerService.RemoveUserFromRestaurant(worker);
            return Ok();
        }

        [HttpPut("UpdateWorker")]
        public async Task<IActionResult> UpdateWorker(User worker)
        {
            await _workerService.UpdateWorker(worker);
            return Ok();
        }
    }
}

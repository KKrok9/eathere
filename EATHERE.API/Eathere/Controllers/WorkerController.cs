using AutoMapper;
using Eathere.DTOs;
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
        private readonly IMapper _mapper;
        public WorkerController(IWorkerService workerService, IMapper mapper)
        {
            _workerService = workerService;
            _mapper = mapper;
        }

        [HttpGet("GetAllWorkersFromRestaurant")]
        public async Task<List<WorkerDto>> GetAllWorkersFromRestaurant()
        {
            var workers = await _workerService.GetAllWorkersFromRestaurant();
            var mappedWorkers = _mapper.Map<List<WorkerDto>>(workers);
            return mappedWorkers;
        }

        [HttpGet("GetWorkerById/{id}")]
        public async Task<ActionResult<WorkerDto>> GetWorkerById(Guid id)
        {
            var worker = await _workerService.GetWorkerById(id);
            var workerToReturn = _mapper.Map<WorkerDto>(worker);
            return workerToReturn;
        }

        [HttpPut("RemoveUserFromRestaurant")]
        public async Task<IActionResult> RemoveUserFromRestaurant(WorkerDto worker)
        {
            await _workerService.RemoveUserFromRestaurant(worker);
            return Ok();
        }

        [HttpPut("UpdateWorker")]
        public async Task<IActionResult> UpdateWorker(WorkerDto worker)
        {
            await _workerService.UpdateWorker(worker);
            return Ok();
        }
    }
}

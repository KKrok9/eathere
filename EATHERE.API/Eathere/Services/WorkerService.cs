using AutoMapper;
using Eathere.DTOs;
using Eathere.Models;
using Eathere.Services.Interfaces;
using Eathere.SqlRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Eathere.Services
{
    public class WorkerService : IWorkerService
    {
        private readonly ISqlRepository<User> _repository;
        private readonly IUserService _userService;
        private readonly IRestaurantService _restaurantService;
        private readonly IMapper _mapper;
        public WorkerService(ISqlRepository<User> repository, IUserService userService, IRestaurantService restaurantService, IMapper mapper)
        {
            _repository = repository;
            _userService = userService;
            _restaurantService = restaurantService;
            _mapper = mapper;
        }

        public async Task RemoveUserFromRestaurant(WorkerDto worker)
        {
            var trackedWorker = await _repository.GetByIdAsync(worker.Id);

            if (trackedWorker != null)
            {
                trackedWorker.RestaurantId = null;
                trackedWorker.Restaurant = null;
                trackedWorker.Salary = null;
                await _repository.UpdateAsync(trackedWorker);
            }
        }


        public async Task<IEnumerable<User>> GetAllWorkersFromRestaurant()
        {
            var restaurant = await _restaurantService.GetRestaurantOfCurrentlyLoggedUser();
            var workers = await _userService.GetAllUsersAsync();
            var workersToReturn = workers.Where(x => x.RestaurantId == restaurant.Id);
            return workersToReturn;
        }

        public async Task<User> GetWorkerById(Guid id)
        {
            var workers = await _userService.GetAllUsersAsync();
            var userToReturn = workers.FirstOrDefault(x=> x.Id == id);
            return userToReturn;
        }

        public async Task UpdateWorker(WorkerDto worker)
        {
            var workers = await _userService.GetAllUsersAsync();
            var workerToUpdate = workers.FirstOrDefault(x => x.Id == worker.Id);
            if (workerToUpdate != null)
            {
                _mapper.Map(worker, workerToUpdate);
                await _repository.UpdateAsync(workerToUpdate);
            }
        }
    }
}

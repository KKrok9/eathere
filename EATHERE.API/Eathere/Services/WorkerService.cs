using Eathere.Models;
using Eathere.Services.Interfaces;
using Eathere.SqlRepository;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Eathere.Services
{
    public class WorkerService : IWorkerService
    {
        private readonly ISqlRepository<User> _repository;
        private readonly IUserService _userService;
        private readonly IRestaurantService _restaurantService;

        public WorkerService(ISqlRepository<User> repository, IUserService userService, IRestaurantService restaurantService)
        {
            _repository = repository;
            _userService = userService;
            _restaurantService = restaurantService;
        }

        public async Task RemoveUserFromRestaurant(Guid id)
        {
            var workers = await _userService.GetAllUsersAsync();
            var worker = workers.FirstOrDefault(x=> x.Id==id);
            worker.RestaurantId = null;
            await _repository.UpdateAsync(worker);
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
    }
}

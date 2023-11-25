using Eathere.Models;
using Eathere.Services.Interfaces;
using Eathere.SqlRepository;

namespace Eathere.Services
{
    public class DishService : IDishService
    {

        private readonly ISqlRepository<Dish> _repository;
        private readonly IRestaurantService _restaurantService;
        public DishService(ISqlRepository<Dish> repository, IRestaurantService restaurantService ) {
            _repository = repository;
            _restaurantService = restaurantService;
        }
        public async Task AddDish(Dish dish)
        {
            //FIRSTLY, HAVE TO FIND CURRENTLY LOGGED RESTAURANT
            var thisRestaurant = await _restaurantService.GetRestaurantOfCurrentlyLoggedUser();
            if(thisRestaurant == null )
            {
                return;
            }

            dish.RestaurantId = thisRestaurant.Id;
            await _repository.AddAsync(dish);
            
        }

        public async Task UpdateDish(Dish dish)
        {
            await _repository.UpdateAsync(dish);
        }

        public async Task DeleteDish(Guid id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Dish>> GetAllDishesFromSingleRestaurant(Guid restaurantId)
        {
            var dishes = await _repository.GetAllAsync();
            var dishesToReturn = dishes.Where(x=> x.RestaurantId == restaurantId).ToList();
            return dishesToReturn;
        }

        public async Task<Dish> GetDishById(Guid id)
        {
            var dishToReturn = await _repository.GetByIdAsync(id);
            return dishToReturn;
        }
    }
}

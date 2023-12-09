using Eathere.Models;
using Eathere.Services.Interfaces;
using Eathere.SqlRepository;

namespace Eathere.Services
{
    public class DishTypeService : IDishTypeService
    {
        private readonly ISqlRepository<DishType> _repository;

        public DishTypeService(ISqlRepository<DishType> repository)
        {
            _repository = repository;
        }
        public async Task AddDishType(DishType dishType)
        {
            await _repository.AddAsync(dishType);
        }

        public async Task DeleteDishType(Guid id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<DishType>> GetAllDishTypesFromRestaurant(Guid restaurantId)
        {
            var dishTypes = await _repository.GetAllAsync();
            var dishTypesToReturn = dishTypes.Where(x => x.RestaurantId == restaurantId);
            return dishTypesToReturn;
        }

        public async Task<DishType> GetDishTypeById(Guid id)
        {
            var dishType = await _repository.GetByIdAsync(id);
            return dishType;
        }
    }
}

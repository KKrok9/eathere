using Eathere.Models;
using Eathere.Services.Interfaces;
using Eathere.SqlRepository;

namespace Eathere.Services
{
    public class PortionTypeService : IPortionTypeService
    {
        private readonly ISqlRepository<PortionType> _repository;
        public PortionTypeService(ISqlRepository<PortionType> repository)
        {
            _repository = repository;
        }
        public async Task AddPortionType(PortionType portionType)
        {
            await _repository.AddAsync(portionType);
        }

        public async Task DeletePortionType(Guid id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<PortionType>> GetAllPortionTypesFromRestaurant(Guid restaurantId)
        {
            var portionTypes = await _repository.GetAllAsync();
            var portionTypesToReturn = portionTypes.Where(x => x.RestaurantId == restaurantId);
            return portionTypesToReturn;
        }

        public async Task<PortionType> GetPortionTypeById(Guid id)
        {
            var portionType = await _repository.GetByIdAsync(id);
            return portionType;
        }
    }
}

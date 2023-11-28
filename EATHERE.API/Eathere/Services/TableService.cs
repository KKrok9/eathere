using Eathere.Models;
using Eathere.Services.Interfaces;
using Eathere.SqlRepository;

namespace Eathere.Services
{
    public class TableService : ITableService
    {

        private readonly ISqlRepository<Table> _repository;
        private readonly IRestaurantService _restaurantService;
        public TableService(ISqlRepository<Table> repository, IRestaurantService restaurantService) {
            _repository = repository;
            _restaurantService = restaurantService;
        }
        public async Task AddTable(Table table)
        {
            var thisRestaurant = await _restaurantService.GetRestaurantOfCurrentlyLoggedUser();
            if (thisRestaurant == null)
            {
                return;
            }
            table.RestaurantId = thisRestaurant.Id;
            await _repository.AddAsync(table);
        }

        public async Task DeleteTable(Guid id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Table>> GetAllTablesFromRestaurant(Guid restaurantId)
        {
            var tables = await _repository.GetAllAsync();
            var tablesToReturn = tables.Where(x=>x.RestaurantId == restaurantId);
            return tablesToReturn;
        }

        public async Task<Table> GetTableById(Guid id)
        {
            var table = await _repository.GetByIdAsync(id);
            return table;
        }

        public async Task UpdateTable(Table table)
        {
            await _repository.UpdateAsync(table);
        }
    }
}

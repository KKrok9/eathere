using Eathere.Models;

namespace Eathere.Services.Interfaces
{
    public interface ITableService
    {
        Task AddTable(Table table);
        Task UpdateTable(Table table);
        Task DeleteTable(Guid id);
        Task <Table> GetTableById(Guid id);
        Task<IEnumerable<Table>> GetAllTablesFromRestaurant(Guid restaurantId);
    }
}

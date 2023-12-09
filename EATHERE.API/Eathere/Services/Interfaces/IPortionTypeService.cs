using Eathere.Models;

namespace Eathere.Services.Interfaces
{
    public interface IPortionTypeService
    {
        Task AddPortionType(PortionType portionType);
        //UPDATE IS WASTE OF TIME I THINK AND DELETE WILL BE ADDED LATER
        Task DeletePortionType(Guid id);
        Task<PortionType> GetPortionTypeById(Guid id);
        Task<IEnumerable<PortionType>> GetAllPortionTypesFromRestaurant(Guid restaurantId);
    }
}

using Eathere.Models;

namespace Eathere.Services.Interfaces
{
    public interface IDishTypeService
    {
        Task AddDishType(DishType dishType);
        //UPDATE IS WASTE OF TIME I THINK AND DELETE WILL BE ADDED LATER
        Task DeleteDishType(Guid id);
        Task<DishType> GetDishTypeById(Guid id);
        Task<IEnumerable<DishType>> GetAllDishTypesFromRestaurant(Guid restaurantId);
    }
}

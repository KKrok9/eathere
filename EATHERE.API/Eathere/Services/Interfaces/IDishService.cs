using Eathere.Models;
namespace Eathere.Services.Interfaces
{
    public interface IDishService
    {
        //TO ADD DISH
        Task AddDish(Dish dish);

        //TO UPDATE DISH
        Task UpdateDish(Dish dish);

        //TO GET DISH BY ID
        Task <Dish> GetDishById(Guid id);

        //TO DELETE DISH
        Task DeleteDish(Guid id);

        //TO GET ALL DISHES FROM SINGLE RESTAURANT
        Task <IEnumerable<Dish>> GetAllDishesFromSingleRestaurant(Guid restaurantId);

        //HAVE TO ADD SOME ENPOINTS FOR GETTING DISHES BY DISHTYPE OR SOMETHING
    }
}

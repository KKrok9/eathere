using Eathere.Models;

namespace Eathere.Services.Interfaces
{
    public interface IRestaurantService
    {
        //ADD RESTAURANT 
        Task<Restaurant?> AddRestaurant(Restaurant restaurant);
        //UPDATE RESTAURANT
        Task UpdateRestaurant(Restaurant restaurant);
        //CREATE RESTAURANT CODE
        Task<string> CreateRestaurantCode();
        //GET RESTAURANT BY ID
        Task<Restaurant> GetRestaurantByOwnerId(Guid id); // IF NULL, USER HASNT REGISTERED ANY RESTAURANT SO SHOW JUST INPUTS
        //GET ALL RESTAURANTS
        Task<IEnumerable<Restaurant>> GetAllRestaurants();
    }
}

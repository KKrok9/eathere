using Eathere.Models;

namespace Eathere.Services.Interfaces
{
    public interface IOrderService
    {
        Task AddOrder(Order order);
        Task UpdateOrder(Order order);
        Task DeleteOrder (Guid id); // IF MISSCLICK OR SOMETHING LIKE THAT?
        Task<Order> GetOrderById(Guid id);
        Task <IEnumerable<Order>> GetAllOrdersFromRestaurant(Guid restaurantId);

    }
}

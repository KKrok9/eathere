using Eathere.Models;
using Eathere.Services.Interfaces;
using Eathere.SqlRepository;

namespace Eathere.Services
{
    public class OrderService : IOrderService
    {

        private readonly ISqlRepository<Order> _repository;
        public OrderService(ISqlRepository<Order>repository) { 
            _repository = repository;
        }
        public async Task AddOrder(Order order)
        {
           await _repository.AddAsync(order);
        }

        public async Task DeleteOrder(Guid id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Order>> GetAllOrdersFromRestaurant(Guid restaurantId)
        {
            var orders = await _repository.GetAllAsync();
            var ordersToReturn = orders.Where(x => x.RestaurantId == restaurantId);
            return ordersToReturn;
        }

        public async Task<Order> GetOrderById(Guid id)
        {
            var order = await _repository.GetByIdAsync(id);
            return order;
        }

        public async Task UpdateOrder(Order order)
        {
            await _repository.UpdateAsync(order);
        }
    }
}

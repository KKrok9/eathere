using Eathere.Models;

namespace Eathere.Services.Interfaces
{
    public interface IWorkerService
    {
        Task<IEnumerable<User>> GetAllWorkersFromRestaurant(); //NEED TO CHANGE USER INTO SOME DTO and MAP IT 
        Task<User> GetWorkerById(Guid id);
        Task RemoveUserFromRestaurant(User worker);
        Task UpdateWorker(User worker);
    }
}

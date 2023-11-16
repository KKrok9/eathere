using Eathere.Models;

namespace Eathere.Services.Interfaces
{
    public interface IUserService
    {
        //ADDING USER ALREADY EXISTS (IN IAuthService)
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task <User> GetUserById(Guid id);
        Task UpdateUserAsync(User user);

        // DELETE USER IS NOT NECCESSARY I THINK

        Task<User> GetCurrentlyLoggedUser(); // EASY WAY TO GET LOGGED USER WITHOUT SENDING 2 REQUESTS

    }
}

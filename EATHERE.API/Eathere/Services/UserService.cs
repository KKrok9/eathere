using Eathere.Models;
using Eathere.Services.Interfaces;
using Eathere.SqlRepository;

namespace Eathere.Services
{
    public class UserService : IUserService
    {
        private readonly ISqlRepository<User> _userRepository;
        private readonly IAuthService _authService;
        public UserService(ISqlRepository<User> userRepository, IAuthService authService ) {
            _userRepository= userRepository;
            _authService = authService;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _userRepository.GetAllAsync();
        }

        public async Task<User> GetCurrentlyLoggedUser()
        {
            var currentlyLoggedUserId = _authService.GetCurrentUserId();

            if (currentlyLoggedUserId.HasValue)
            {
                return await _userRepository.GetByIdAsync(currentlyLoggedUserId.Value);
            }
            else
            {
                return null;
            }
        }

        public async Task<User> GetUserById(Guid id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task UpdateUserAsync(User user)
        {
            await _userRepository.UpdateAsync(user);
        }
    }
}

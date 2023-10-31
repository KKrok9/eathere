using Eathere.Models;

namespace Eathere.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User?> Register(User user);
        Task<User?> AuthenticateUser(User user);
        string CreateToken(User user);
        Guid? GetCurrentUserId();
    }
}

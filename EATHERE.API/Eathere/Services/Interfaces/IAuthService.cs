using Eathere.DTOs;
using Eathere.Models;

namespace Eathere.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User?> Register(User user);
        Task<User?> AuthenticateUser(LoginDto user);
        string CreateToken(User user);
        Guid? GetCurrentUserId();
    }
}

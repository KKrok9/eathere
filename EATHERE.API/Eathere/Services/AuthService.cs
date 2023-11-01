using Eathere.Models;
using Eathere.Services.Interfaces;
using Eathere.SqlRepository;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Eathere.Services
{
    public class AuthService : IAuthService
    {
        private readonly ISqlRepository<User> _repository;
        private readonly IConfiguration _configuration;

        public AuthService(ISqlRepository<User> repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        public async Task<User?> AuthenticateUser(User user)
        {
            var users = await _repository.GetAllAsync();
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);
            var authenticatedUser = users.FirstOrDefault(x=> x.Email == user.Email && x.Password == hashedPassword);
            return authenticatedUser;
        }

        public string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email)
            };
            var tokenValue = _configuration.GetSection("AppSettings:Token").Value;
            if (tokenValue == null)
            {
                throw new InvalidOperationException("Token value is missing in configuration.");
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenValue));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                 claims: claims,
                 expires: DateTime.Now.AddMinutes(120),
                 signingCredentials: creds
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        public Guid? GetCurrentUserId()
        {
            throw new NotImplementedException();
        }

        public async Task<User> Register(User user)
        {
            var users = await _repository.GetAllAsync();
            var userExists = users.FirstOrDefault(x=>x.Email == user.Email);
            if (userExists!=null)
            {
                throw new Exception("Użytkownik o podanym emailu już istnieje.");
            }
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
            _repository.AddAsync(user);
            return user; ;
        }

    }
}

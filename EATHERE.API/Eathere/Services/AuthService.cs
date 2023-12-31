using Eathere.Models;
using Eathere.Services.Interfaces;
using Eathere.SqlRepository;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Eathere.DTOs;

namespace Eathere.Services
{
    public class AuthService : IAuthService
    {
        private readonly ISqlRepository<User> _repository;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AuthService(ISqlRepository<User> repository, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<User?> AuthenticateUser(LoginDto user)
        {
            var users = await _repository.GetAllAsync();
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);
            var authenticatedUser = users.FirstOrDefault(x=> x.Email == user.Email);
            if(authenticatedUser == null) {
                throw new Exception("Użytkownik o podanym emailu nie istnieje.");
            }
            
            if(!BCrypt.Net.BCrypt.Verify(user.Password, authenticatedUser.Password))
            {
                throw new Exception("Podane hasło jest niepoprawne!");
            }
            return authenticatedUser;
        }

        public string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim("userId", user.Id.ToString())
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
            var authHeader = _httpContextAccessor.HttpContext.Request.Headers["Authorization"];
            var tester = _httpContextAccessor.HttpContext;
            var tokenString = authHeader.FirstOrDefault()?.Split(' ').Last();

            if (tokenString == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.ReadJwtToken(tokenString);

            var userIdClaim = token.Claims.FirstOrDefault(c => c.Type == "userId");

            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out Guid userId))
            {
                return null;
            }

            return userId;
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
            user.Password = passwordHash;
            await _repository.AddAsync(user);
            return user; ;
        }

    }
}

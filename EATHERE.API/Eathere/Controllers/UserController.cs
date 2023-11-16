using Eathere.Models;
using Eathere.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Eathere.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        public UserController(IUserService userService, IAuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        /*
        [HttpGet("GetAllUsers")]
        public async Task<IEnumerable<User>> GetAllUsers()
        {
          HERE I HAVE TO ADD BOSS ID OR RESTAURANT ID, NOW I NEED TO FOCUS ON UPDATING AND 
            COMPLETING WHOLE DATA 
        }
        */

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(User user)
        {
            //NEED TO CHECK IF CURRENTLY LOGGED USER IS UPDATING USER
            var userId = _authService.GetCurrentUserId();
            user.Id = userId ?? Guid.Empty;
            await _userService.UpdateUserAsync(user);
            return Ok();

        }

        [HttpGet("GetCurrentlyLoggedUser")]
        public async Task<ActionResult<User>> GetCurrentlyLoggedUser()
        {
            var user = await _userService.GetCurrentlyLoggedUser();
            if(user == null)
            {
                return NotFound();
            }
            return user;
        }
    }
}

using Eathere.DTOs;
using Eathere.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Eathere.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous] // possible to use even if you are not logged in
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        [HttpPost]
        public async Task<ActionResult> Register(User request)
        {
            return Ok(new { message = "Registered succesfully!" });
        }

    }
}

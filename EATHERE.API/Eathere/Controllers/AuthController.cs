﻿using Eathere.DTOs;
using Eathere.Models;
using Eathere.Services.Interfaces;
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
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register(User user)
        {
            await _authService.Register(user);
            return Ok(new { message = "Registered succesfully!" });
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(LoginDto user)
        {
            var autenticatedUser = await _authService.AuthenticateUser(user);
            if (autenticatedUser == null)
            {
                return Unauthorized("Wrong login or password!");
            }
            var token = _authService.CreateToken(autenticatedUser);
            return Ok(new { jwt = token });
        }

        [Authorize]//need to be authorized to use it
        [HttpGet("GetMyId")]
        public IActionResult GetMyId()
        {
            return Ok(_authService.GetCurrentUserId());
        }


    }
}

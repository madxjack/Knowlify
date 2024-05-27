﻿using Microsoft.AspNetCore.Mvc;
using Knowlify.Domain;
using Microsoft.Identity.Client;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.MicrosoftAccount;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Logging;
using Knowlify.Domain.DTOs.User;

namespace Knowlify.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserDomain _userDomain;

        public AuthController(UserDomain userDomain )
        {
            _userDomain = userDomain;
        }
        //[HttpGet("login")]
        //public IActionResult Login()
        //{
        //    var authenticationProperties = new AuthenticationProperties
        //    {
        //        RedirectUri = Url.Action("Callback")
        //    };

        //    return Challenge(authenticationProperties, GoogleDefaults.AuthenticationScheme);
        //}

        //[HttpGet("callback")]
        //public async Task<IActionResult> Callback()
        //{
        //    var authenticateResult = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);

        //    if (!authenticateResult.Succeeded)
        //        return BadRequest(); // o manejar según sea necesario

        //    var accessToken = authenticateResult.Properties.GetTokenValue("access_token");
        //    var idToken = authenticateResult.Properties.GetTokenValue("id_token");

        //    Console.WriteLine($"Access Token: {accessToken}");
        //    Console.WriteLine($"Id Token: {idToken}");

        //    var emailClaim = authenticateResult.Principal.FindFirst(ClaimTypes.Email).Value;

        //    var token = _jwtTokenService.GenerateToken(emailClaim, _configuration);

        //    return Ok(new { Token = token, Email = emailClaim, AccessToken = accessToken, IdToken = idToken });
        //}

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto user)
        {
            try
            {
                var newUser = await _userDomain.Register(user);
                return Ok(newUser);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto user)
        {
            try
            {
                var response = await _userDomain.Login(user);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }
    }
}

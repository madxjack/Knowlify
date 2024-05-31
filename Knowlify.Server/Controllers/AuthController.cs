using Microsoft.AspNetCore.Mvc;
using Knowlify.Domain;
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

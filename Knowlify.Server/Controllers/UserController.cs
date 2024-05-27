using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Knowlify.Domain;
using Microsoft.Identity.Web.Resource;

namespace Knowlify.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class UserController : Controller
    {
        private readonly UserDomain _userDomain;

        public UserController(UserDomain userDomain)
        {
            _userDomain = userDomain;
        }

        [HttpGet("all")]
        //[RequiredScope("User.Read")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var users = await _userDomain.GetAll();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var user = await _userDomain.Get(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }
    }
}

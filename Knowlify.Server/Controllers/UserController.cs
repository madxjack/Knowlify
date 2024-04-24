using Knowlify.Data.Models;
using Knowlify.Infraestructure.Abstract;
using Microsoft.AspNetCore.Mvc;

namespace Knowlify.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: /User
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await _userRepository.GetAll();
        }
    }
}

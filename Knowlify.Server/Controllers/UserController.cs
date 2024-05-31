using Microsoft.AspNetCore.Mvc;
using Knowlify.Domain;
using Knowlify.Services.Helpers;
using Knowlify.Domain.DTOs.User;
using Microsoft.AspNetCore.Authorization;

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

        [Authorize]
        [HttpPut("updateBasicProfileInfo")]
        public async Task<IActionResult> UpdateBasicProfileInfo([FromBody] UserProfileUpdateDto user)
        {
            try
            {
                var updatedUser = await _userDomain.UpdateBasicProfileInfo(user);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [Authorize]
        [HttpPost("image")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            try
            {
                var url = await _userDomain.UploadImage(file);
                return Ok(new { url });
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [Authorize]
        [HttpGet("image/{fileName}")]
        public async Task<IActionResult> GetImage(string fileName)
        {
            try
            {
                var stream = await _userDomain.GetImage(fileName);
                var fileExtension = Path.GetExtension(fileName);
                var contentType = MimeMappingHelper.GetMimeType(fileExtension);
                return File(stream, contentType);
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }

        [Authorize]
        [HttpGet("sas/{fileName}")]
        public async Task<IActionResult> GetSas(string fileName)
        {
            try
            {
                var sasUri = _userDomain.GetImageSasUrl(fileName);
                return Ok(new { sasUri = sasUri });
            }
            catch (Exception ex)
            {
                return new ObjectResult(ex.Message) { StatusCode = 500 };
            }
        }
    }
}

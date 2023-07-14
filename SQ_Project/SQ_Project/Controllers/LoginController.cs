using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SQ_Project.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SQ_Project.Controllers
{
    [Route(("[controller]"))]
    [ApiController]
    public class LoginController : Controller
    {
        private IConfiguration _configuration;
        
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private User AuthenticatateUser(User user)
        {
            User _user = null;
            if(user.userName == "admin" && user.password == "12345") {
                _user = new User { userName = "Manoj Deshwal" };
            }
            return _user;
        }

        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.userName),
                new Claim(ClaimTypes.Role,user.role)
            };
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User Authenticate(Login userLogin)
        {
            var currentUser = UserConstants.user.FirstOrDefault(x => x.userName.ToLower() ==
                userLogin.userName.ToLower() && x.password == userLogin.password);
            if (currentUser != null)
            {
                return currentUser;
            }
            return null;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login([FromBody] Login userLogin)
        {
            var user = Authenticate(userLogin);
            if (user != null)
            {
                var token = GenerateToken(user);
                return Ok(token);
            }

            return NotFound("user not found");
        }
    }
}

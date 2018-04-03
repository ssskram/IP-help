using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using IP_Help.Models;

namespace IP_Help.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class userdata : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public userdata(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("[action]")]
        public IActionResult getuser() 
        {
            var user = _userManager.GetUserName(HttpContext.User);
            List<Account> Users = new List<Account>();
            Account wf = new Account()
            {
                user = user
            };
            Users.Add(wf);
            return Ok(Users);
        }

        public class Account
        {
            public string user { get; set; }
        }
    }
}

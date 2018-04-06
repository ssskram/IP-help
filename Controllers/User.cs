using System;
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

        [HttpGet("[action]")]
        public IActionResult equipment_check() 
        {
            var user = _userManager.GetUserName(HttpContext.User);
            string[] approvers = { 
                "paul.marks@pittsburghpa.gov", 
                "sheri.rolewski@pittsburghpa.gov"
            };
            int check = Array.IndexOf(approvers, user);
            if ( (check > -1) )
            {
                return Ok("1");
            }
            else
            {
                return Ok("0");
            }
        }

        [HttpGet("[action]")]
        public IActionResult network_check() 
        {
            var user = _userManager.GetUserName(HttpContext.User);
            string[] approvers = { 
                "paul.marks@pittsburghpa.gov", 
                "sheri.rolewski@pittsburghpa.gov"
            };
            int check = Array.IndexOf(approvers, user);
            if ( (check > -1) )
            {
                return Ok("1");
            }
            else
            {
                return Ok("0");
            }
        }

        public class Account
        {
            public string user { get; set; }
        }
    }
}

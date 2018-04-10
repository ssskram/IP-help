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
                "srinidhi.jagannath@pittsburghpa.gov",
                "paul.marks@pittsburghpa.gov", 
                "heidi.norman@pittsburghpa.gov",
                "sheri.rolewski@pittsburghpa.gov",
                "laurie.dierker@pittsburghpa.gov",
                "anthony.landolina@pittsburghpa.gov",
                "daniel.shak@pittsburghpa.gov",
                "ross.chapman@pittsburghpa.gov",
                "susan.lucas@pittsburghpa.gov",
                "kate.weiland@pittsburghpa.gov",
                "brenda.pree@pittsburghpa.gov",
                "john.weiland@pittsburghpa.gov",
                "ray.gastil@pittsburghpa.gov",
                "janice.abate@pittsburghpa.gov",
                "carlos.torres@pittsburghpa.gov",
                "beth.pittinger@pittsburghpa.gov",
                "ronald.romano@pittsburghpa.gov",
                "edward.barca@pittsburghpa.gov",
                "jennifer.gula@pittsburghpa.gov",
                "maxine.anthony@pittsburghpa.gov",
                "stacy.hill@pittsburghpa.gov",
                "natalie.mays@pittsburghpa.gov",
                "jeff.skalican@pittsburghpa.gov",
                "evan.gross@pittsburghpa.gov",
                "erin.bruni@pittsburghpa.gov",
                "valerie.sullivan@pittsburghpa.gov",
                "janet.manuel@pittsburghpa.gov",
                "paula.kellerman@pittsburghpa.gov",
                "pamela.mehrmann@pittsburghpa.gov",
                "deidra.cochran@pittsburghpa.gov",
                "todd.graf@pittsburghpa.gov",
                "lee.schmidt@pittsburghpa.gov",
                "marcelle.newman@pittsburghpa.gov",
                "megan.yarish@pittsburghpa.gov",
                "christopher.reveille@pittsburghpa.gov",
                "smyth.welton@pittsburghpa.gov"
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
                // "gloria.forouzan@pittsburghpa.gov",
                // "anthony.landolina@pittsburghpa.gov",
                // "daniel.shak@pittsburghpa.gov",
                // "ross.chapman@pittsburghpa.gov",
                // "susan.lucas@pittsburghpa.gov",
                // "kate.weiland@pittsburghpa.gov",
                // "brenda.pree@pittsburghpa.gov",
                // "john.weiland@pittsburghpa.gov",
                // "janice.abate@pittsburghpa.gov",
                // "richard.meritzer@pittsburghpa.gov",
                // "carlos.torres@pittsburghpa.gov",
                // "beth.pittinger@pittsburghpa.gov",
                // "carolyn.gaskin@pittsburghpa.gov",
                // "jonathan.henry@pittsburghpa.gov",
                // "ronald.romano@pittsburghpa.gov",
                // "linda.king@pittsburghpa.gov",
                // "frances.pischke@pittsburghpa.gov",
                // "maxine.anthony@pittsburghpa.gov",
                // "stacy.hill@pittsburghpa.gov",
                // "natalie.mays@pittsburghpa.gov",
                // "jeff.skalican@pittsburghpa.gov",
                // "evan.gross@pittsburghpa.gov",
                // "sheri.rolewski@pittsburghpa.gov",
                // "erin.bruni@pittsburghpa.gov",
                // "valerie.sullivan@pittsburghpa.gov",
                // "pamela.mehrmann@pittsburghpa.gov",
                // "todd.graf@pittsburghpa.gov",
                // "dawn.bowen@pittsburghpa.gov",
                // "marcelle.newman@pittsburghpa.gov",
                // "christopher.reveille@pittsburghpa.gov"
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

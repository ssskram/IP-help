using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Net;
using System.Net.Http;

namespace IP_Help.Controllers
{
    [Route("api/[controller]")]
    public class ping : Controller
    {

        [HttpGet("[action]")]
        public IActionResult pong() 
        {
            bool isAuthenticated = User.Identity.IsAuthenticated;
            return Ok(isAuthenticated);
        }
    }
}

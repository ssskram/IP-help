using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Web;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using IPHelp.Models;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace IPHelp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class userdata : Controller
    {

        HttpClient client = new HttpClient();

        private readonly UserManager<ApplicationUser> _userManager;
        public userdata(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("[action]")]
        public IActionResult getuser()
        {
            var user = _userManager.GetUserName(HttpContext.User);
            return Json(user);
        }

        [HttpGet("[action]")]
        public async Task<string> equipment_check()
        {
            await GetEquipmentLiaisons();
            var usergroup = GetEquipmentLiaisons().Result;
            var user = _userManager.GetUserName(HttpContext.User).ToLower();

            if (usergroup.Contains(user))
            {
                return ("1");
            }
            else
            {
                return ("0");
            }
        }

        [HttpGet("[action]")]
        public async Task<string> network_check()
        {
            await GetNetworkLiaisons();
            var usergroup = GetNetworkLiaisons().Result;
            var user = _userManager.GetUserName(HttpContext.User).ToLower();

            if (usergroup.Contains(user))
            {
                return ("1");
            }
            else
            {
                return ("0");
            }
        }

        public async Task<string> GetEquipmentLiaisons()
        {
            await refreshtoken();
            var token = refreshtoken().Result;
            var sharepointUrl = "https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/InPHelp/_api/web/lists/GetByTitle('Equipment')/items?$select=Title";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);
            string listitems = await client.GetStringAsync(sharepointUrl);
            return listitems;
        }

        public async Task<string> GetNetworkLiaisons()
        {
            await refreshtoken();
            var token = refreshtoken().Result;
            var sharepointUrl = "https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/InPHelp/_api/web/lists/GetByTitle('Network')/items?$select=Title";
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);
            string listitems = await client.GetStringAsync(sharepointUrl);
            return listitems;
        }

        private async Task<string> refreshtoken()
        {
            var MSurl = "https://accounts.accesscontrol.windows.net/f5f47917-c904-4368-9120-d327cf175591/tokens/OAuth/2";
            var clientid = Environment.GetEnvironmentVariable("SPClientID");
            var clientsecret = Environment.GetEnvironmentVariable("SPClientSecret");
            var refreshtoken = Environment.GetEnvironmentVariable("refreshtoken");
            var redirecturi = Environment.GetEnvironmentVariable("redirecturi");
            var SPresource = Environment.GetEnvironmentVariable("spresourceid");
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("Accept", "application/x-www-form-urlencoded");
            client.DefaultRequestHeaders.Add("X-HTTP-Method", "POST");

            var json =
                String.Format
            ("grant_type=refresh_token&client_id={0}&client_secret={1}&refresh_token={2}&redirect_uri={3}&resource={4}",
                clientid, // 0
                clientsecret, // 1
                refreshtoken, // 2
                redirecturi, // 3
                SPresource); // 4

            client.DefaultRequestHeaders.Add("ContentLength", json.Length.ToString());
            StringContent strContent = new StringContent(json);
            strContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/x-www-form-urlencoded");
            HttpResponseMessage response = client.PostAsync(MSurl, strContent).Result;
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            dynamic results = JsonConvert.DeserializeObject<dynamic>(content);
            string token = results.access_token.ToString();
            return token;
        }
    }
}

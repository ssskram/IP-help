using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IPHelp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace IPHelp.Controllers {
    [Authorize]
    [Route ("api/[controller]")]
    public class equipmentReservation : Controller {

        HttpClient client = new HttpClient ();

        private readonly UserManager<ApplicationUser> _userManager;
        public equipmentReservation (UserManager<ApplicationUser> userManager) {
            _userManager = userManager;
        }

        [HttpGet ("[action]")]
        public object getEquipment () {
            string items = GetEquipment ().Result;
            List<Equipment> AllEquipment = new List<Equipment> ();
            dynamic equipment = JObject.Parse (items) ["value"];
            foreach (var item in equipment) {
                Equipment eqp = new Equipment () {
                    item = item.Item,
                    itemID = item.Id,
                    itemType = item.ItemType,
                    assetNumber = item.AssetNumber
                };
                AllEquipment.Add (eqp);
            }
            return AllEquipment;
        }

        [HttpGet ("[action]")]
        public object getReservations () {
            string items = GetResos ().Result;
            List<Reservation> AllResos = new List<Reservation> ();
            dynamic resos = JObject.Parse (items) ["value"];
            foreach (var item in resos) {
                Reservation res = new Reservation () {
                    itemID = item.ItemID,
                    from = item.From,
                    to = item.To,
                    pickedUp = item.PickedUp,
                    returned = item.Returned
                };
                AllResos.Add (res);
            }
            return AllResos;
        }

        [HttpPost ("[action]")]
        public async Task postReservation ([FromBody] NewReservation model) {
            await refreshtoken ();
            var token = refreshtoken ().Result;
            var user = _userManager.GetUserName (HttpContext.User);
            var pickedUp = "False";
            var returned = "False";
            var sharepointUrl = "https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/EquipmentLoan/_api/web/lists/GetByTitle('Reservations')/items";
            client.DefaultRequestHeaders.Clear ();
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue ("Bearer", token);
            client.DefaultRequestHeaders.Add ("Accept", "application/json;odata=verbose");
            client.DefaultRequestHeaders.Add ("X-RequestDigest", "form digest value");
            client.DefaultRequestHeaders.Add ("X-HTTP-Method", "POST");
            foreach (var item in model.items) {
                var json =
                    String.Format ("{{'__metadata': {{ 'type': 'SP.Data.ReservationsListItem' }}, 'ReservationID' : '{0}' , 'User' : '{1}', 'NetworkID' : '{2}', 'Department' : '{3}', 'Phone' : '{4}', 'Item' : '{5}', 'ItemID' : '{6}', 'AssetNumber' : '{7}', 'PickedUp' : '{8}', 'Returned' : '{9}', 'From' : '{10}', 'To' : '{11}' }}",
                        model.reservationID, // 0
                        user, // 1
                        model.networkID, // 2
                        model.department, // 3 
                        model.phone, // 4
                        item.item, // 5
                        item.itemID, // 6
                        item.assetNumber, // 7
                        pickedUp, // 8
                        returned, // 9
                        model.from, // 10
                        model.to); // 11
                client.DefaultRequestHeaders.Add ("ContentLength", json.Length.ToString ());
                try {
                    StringContent strContent = new StringContent (json);
                    strContent.Headers.ContentType = MediaTypeHeaderValue.Parse ("application/json;odata=verbose");
                    HttpResponseMessage response = client.PostAsync (sharepointUrl, strContent).Result;
                    response.EnsureSuccessStatusCode ();
                    var content = await response.Content.ReadAsStringAsync ();
                } catch (Exception ex) {
                    Console.WriteLine (ex);
                }
            }
        }

        public async Task<string> GetEquipment () {
            await refreshtoken ();
            var token = refreshtoken ().Result;
            var sharepointUrl = "https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/EquipmentLoan/_api/web/lists/GetByTitle('Equipment')/items";
            client.DefaultRequestHeaders.Clear ();
            client.DefaultRequestHeaders.Add ("Accept", "application/json");
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue ("Bearer", token);
            string listitems = await client.GetStringAsync (sharepointUrl);
            return listitems;
        }

        public async Task<string> GetResos () {
            await refreshtoken ();
            var token = refreshtoken ().Result;
            var sharepointUrl = "https://cityofpittsburgh.sharepoint.com/sites/InnovationandPerformance/EquipmentLoan/_api/web/lists/GetByTitle('Reservations')/items";
            client.DefaultRequestHeaders.Clear ();
            client.DefaultRequestHeaders.Add ("Accept", "application/json");
            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue ("Bearer", token);
            string listitems = await client.GetStringAsync (sharepointUrl);
            return listitems;
        }

        private async Task<string> refreshtoken () {
            var MSurl = "https://accounts.accesscontrol.windows.net/f5f47917-c904-4368-9120-d327cf175591/tokens/OAuth/2";
            var clientid = Environment.GetEnvironmentVariable ("SPClientID");
            var clientsecret = Environment.GetEnvironmentVariable ("SPClientSecret");
            var refreshtoken = Environment.GetEnvironmentVariable ("refreshtoken");
            var redirecturi = Environment.GetEnvironmentVariable ("redirecturi");
            var SPresource = Environment.GetEnvironmentVariable ("spresourceid");
            client.DefaultRequestHeaders.Clear ();
            client.DefaultRequestHeaders.Add ("Accept", "application/x-www-form-urlencoded");
            client.DefaultRequestHeaders.Add ("X-HTTP-Method", "POST");

            var json =
                String.Format ("grant_type=refresh_token&client_id={0}&client_secret={1}&refresh_token={2}&redirect_uri={3}&resource={4}",
                    clientid, // 0
                    clientsecret, // 1
                    refreshtoken, // 2
                    redirecturi, // 3
                    SPresource); // 4

            client.DefaultRequestHeaders.Add ("ContentLength", json.Length.ToString ());
            StringContent strContent = new StringContent (json);
            strContent.Headers.ContentType = MediaTypeHeaderValue.Parse ("application/x-www-form-urlencoded");
            HttpResponseMessage response = client.PostAsync (MSurl, strContent).Result;
            response.EnsureSuccessStatusCode ();
            var content = await response.Content.ReadAsStringAsync ();
            dynamic results = JsonConvert.DeserializeObject<dynamic> (content);
            string token = results.access_token.ToString ();
            return token;
        }
    }
}
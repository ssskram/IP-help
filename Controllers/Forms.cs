using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.IO;
using System.Threading.Tasks;
using IPHelp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace IPHelp.Controllers {
    [Authorize]
    [Route ("api/[controller]")]
    public class Forms : Controller {
        private readonly UserManager<ApplicationUser> _userManager;
        public Forms (UserManager<ApplicationUser> userManager) {
            _userManager = userManager;
        }

        [HttpPost ("[action]")]
        public async Task PCOrder ([FromBody] PCOrder model) {
            var submittedby = _userManager.GetUserName (HttpContext.User);
            var apiKey = Environment.GetEnvironmentVariable ("sendgrid");
            var client = new SendGridClient (apiKey);
            var headers = "{'X-OTRS-DynamicField-BulkOrderCount': '1', 'X-OTRS-Type': 'Order Single'}";
            var headersSerial = JsonConvert.DeserializeObject<Dictionary<string, string>> (headers);
            string html = System.IO.File.ReadAllText ("wwwroot/emailTemplates/PcOrder.html");
            var msg = new SendGridMessage () {
                From = new EmailAddress (submittedby, "I&P Help"),
                Subject = "Request for new PC",
                Headers = headersSerial,
                PlainTextContent =
                String.Format (html,
                submittedby, // 0
                model.CustomerPhone, // 1
                model.Department, // 2
                model.MachineType, // 3 
                model.UserName, // 4
                model.UserNetworkID, // 5
                model.Building, // 6
                model.EmploymentStatus, // 7
                model.EmploymentType, // 8
                model.PreviouslyFunctioning, // 9
                model.ComputerNumber, // 10
                model.ComputerFunctioning, // 11
                model.OTRSTicket, // 12
                model.Accessories, // 13
                model.SoftwareApplications, // 14
                model.Floor, // 15
                model.CellularData, // 16
                model.CellularDataJustification), // 17
                HtmlContent =
                String.Format (html,
                submittedby, // 0
                model.CustomerPhone, // 1
                model.Department, // 2
                model.MachineType, // 3 
                model.UserName, // 4
                model.UserNetworkID, // 5
                model.Building, // 6
                model.EmploymentStatus, // 7
                model.EmploymentType, // 8
                model.PreviouslyFunctioning, // 9
                model.ComputerNumber, // 10
                model.ComputerFunctioning, // 11
                model.OTRSTicket, // 12
                model.Accessories, // 13
                model.SoftwareApplications, // 14
                model.Floor, // 15
                model.CellularData, // 16
                model.CellularDataJustification), // 17
            };
            msg.AddTo (new EmailAddress ("cis.sys.net.notifier@pittsburghpa.gov", "Help Desk"));
            if (model.CC != "") {
                await PCOrderCC (model);
            }
            try {
                var response = await client.SendEmailAsync (msg);
            } catch (Exception e) {
                Console.WriteLine (e);
            }
        }

        public async Task PCOrderCC (PCOrder model) {
            var submittedby = _userManager.GetUserName (HttpContext.User);
            var apiKey = Environment.GetEnvironmentVariable ("sendgrid");
            var client = new SendGridClient (apiKey);
            var msg = new SendGridMessage () {
                From = new EmailAddress (submittedby, "I&P Help"),
                Subject = "New PC Order",
                PlainTextContent =
                String.Format ("<strong> A new PC order has been submitted, and you have been copied on the order</strong><br><br><strong> Ordered by: </strong><br> {0} <br><br><strong> Phone number: </strong><br> {1} <br><br><strong> Department: </strong><br> {2} <br><br><strong> Machine type: </strong><br> {3} <br><br><strong> Recipient's name: </strong><br> {4} <br><br><strong> Recipient's network ID: </strong><br> {5} <br><br><strong> Recipients building: </strong><br> {6} <br><br><strong> Recipients floor: </strong><br> {15} <br><br><strong> Accessories </strong><br> {13} <br><br><strong> Non-standard software applications </strong><br> {14} <br><br><strong> New employee, or existing staff member: </strong><br> {7} <br><br><i> If new employee </i> <br><br><strong> Permanent employee, or intern: </strong><br> {8} <br><br><strong> Was a functioning computer plugged into the network port in the last month?: </strong><br> {9} <br><br><i> If existing employee </i> <br><br><strong> Recipients current computer number: </strong><br> {10} <br><br><strong> Is the recipients current computer functioning?: </strong><br> {11} <br><br><strong> OTRS ticket number associated with replacement: </strong><br> {12} <br><br><br><strong> This message was automatically generated by the system.  Do not reply.</strong>",
                submittedby, // 0
                model.CustomerPhone, // 1
                model.Department, // 2
                model.MachineType, // 3 
                model.UserName, // 4
                model.UserNetworkID, // 5
                model.Building, // 6
                model.EmploymentStatus, // 7
                model.EmploymentType, // 8
                model.PreviouslyFunctioning, // 9
                model.ComputerNumber, // 10
                model.ComputerFunctioning, // 11
                model.OTRSTicket, // 12
                model.Accessories, // 13
                model.SoftwareApplications, // 14
                model.Floor), // 15
                HtmlContent =
                String.Format ("<strong> A new PC order has been submitted, and you have been copied on the order</strong><br><br><strong> Ordered by: </strong><br> {0} <br><br><strong> Phone number: </strong><br> {1} <br><br><strong> Department: </strong><br> {2} <br><br><strong> Machine type: </strong><br> {3} <br><br><strong> Recipient's name: </strong><br> {4} <br><br><strong> Recipient's network ID: </strong><br> {5} <br><br><strong> Recipients building: </strong><br> {6} <br><br><strong> Recipients floor: </strong><br> {15} <br><br><strong> Accessories </strong><br> {13} <br><br><strong> Non-standard software applications </strong><br> {14} <br><br><strong> New employee, or existing staff member: </strong><br> {7} <br><br><i> If new employee </i> <br><br><strong> Permanent employee, or intern: </strong><br> {8} <br><br><strong> Was a functioning computer plugged into the network port in the last month?: </strong><br> {9} <br><br><i> If existing employee </i> <br><br><strong> Recipients current computer number: </strong><br> {10} <br><br><strong> Is the recipients current computer functioning?: </strong><br> {11} <br><br><strong> OTRS ticket number associated with replacement: </strong><br> {12} <br><br><br><strong> This message was automatically generated by the system.  Do not reply.</strong>",
                submittedby, // 0
                model.CustomerPhone, // 1
                model.Department, // 2
                model.MachineType, // 3 
                model.UserName, // 4
                model.UserNetworkID, // 5
                model.Building, // 6
                model.EmploymentStatus, // 7
                model.EmploymentType, // 8
                model.PreviouslyFunctioning, // 9
                model.ComputerNumber, // 10
                model.ComputerFunctioning, // 11
                model.OTRSTicket, // 12
                model.Accessories, // 13
                model.SoftwareApplications, // 14
                model.Floor) // 15
            };
            msg.AddTo (new EmailAddress (model.CC));
            var response = await client.SendEmailAsync (msg);
        }

        [HttpPost ("[action]")]
        public async Task MobileDevice ([FromBody] MobileDevice model) {
            var submittedby = _userManager.GetUserName (HttpContext.User);
            var apiKey = Environment.GetEnvironmentVariable ("sendgrid");
            var client = new SendGridClient (apiKey);
            var from = new EmailAddress (submittedby, "I&P Help");
            var subject = String.Format ("New mobile device ordered for {0}", model.JobTitle);
            var to = new EmailAddress ("cis.sys.net.notifier@pittsburghpa.gov", "Help Desk");
            var plainTextContent =
                String.Format ("<strong> A new mobile device request has been submitted.</strong><br><br><strong> Customer: </strong><br> {0} <br><br><strong> Device type: </strong><br> {1} <br><br><strong> New, or replacement: </strong><br> {2} <br><br><strong> Employee's name & title: </strong><br> {3} <br><br><strong> If new device, employee's job duties: </strong><br> {4} <br><br><strong> If replacement, reason for replacement: </strong><br> {5} <br><br><br><strong> This message was automatically generated by the system.  Do not reply.</strong>",
                    submittedby, // 0
                    model.DeviceType, // 1
                    model.NewReplacement, // 2
                    model.JobTitle, // 3
                    model.JobDuties, // 4
                    model.ReplacementExplanation); // 5
            var htmlContent =
                String.Format ("<strong> A new mobile device request has been submitted.</strong><br><br><strong> Customer: </strong><br> {0} <br><br><strong> Device type: </strong><br> {1} <br><br><strong> New, or replacement: </strong><br> {2} <br><br><strong> Employee's name & title: </strong><br> {3} <br><br><strong> If new device, employee's job duties: </strong><br> {4} <br><br><strong> If replacement, reason for replacement: </strong><br> {5} <br><br><br><strong> This message was automatically generated by the system.  Do not reply.</strong>",
                    submittedby, // 0
                    model.DeviceType, // 1
                    model.NewReplacement, // 2
                    model.JobTitle, // 3
                    model.JobDuties, // 4
                    model.ReplacementExplanation); // 5
            var msg = MailHelper.CreateSingleEmail (from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync (msg);
        }

        [HttpPost ("[action]")]
        public async Task Other ([FromBody] Other model) {
            var submittedby = _userManager.GetUserName (HttpContext.User);
            var apiKey = Environment.GetEnvironmentVariable ("sendgrid");
            var client = new SendGridClient (apiKey);
            var from = new EmailAddress (submittedby, "I&P Help");
            var subject = String.Format ("New ticket submitted by {0}", submittedby);
            var to = new EmailAddress ("cis.sys.net.notifier@pittsburghpa.gov", "Help Desk");
            var plainTextContent =
                String.Format ("<strong> A new request has been submitted through the portal.</strong><br><br> {0} <br><br><br><strong> This message was automatically generated by the system.  Do not reply.</strong>",
                    model.Body); // 0
            var htmlContent =
                String.Format ("<strong> A new request has been submitted through the portal.</strong><br><br><strong> Body: </strong><br> {0} <br><br><br><strong> This message was automatically generated by the system.  Do not reply.</strong>",
                    model.Body); // 0
            var msg = MailHelper.CreateSingleEmail (from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync (msg);
        }
    }
}
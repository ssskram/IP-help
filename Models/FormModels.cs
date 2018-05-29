using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IP_Help.Models
{
    public class PCOrder
    {
        public string CustomerPhone { get; set; }
        public string MachineType { get; set; }
        public string Department { get; set; }
        public string UserName { get; set; }
        public string UserNetworkID { get; set; }
        public string Building { get; set; }
        public string Floor { get; set; }
        public string EmploymentStatus { get; set; }
        public string EmploymentType { get; set; }
        public string PreviouslyFunctioning { get; set; }
        public string ComputerNumber { get; set; }
        public string ComputerFunctioning { get; set; }
        public string OTRSTicket { get; set; }
        public string AccessoriesRelay { get; set; }
        [DataType(DataType.MultilineText)]
        public string SoftwareApplications { get; set; }
    }
    public class NetworkReg 
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmploymentType { get; set; }
        public string StartDate { get; set; }
        public string EmployeeID { get; set; }
        public string Department { get; set; }
        public string Division { get; set; }
        public string JobTitle { get; set; }
        public string EmailDistribution { get; set; }
        public string EndDate { get; set; }
        public string Address { get; set; }
        public string Room { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Telephone { get; set; }
        public string Fax { get; set; }
        [DataType(DataType.MultilineText)]
        public string Comments { get; set; }
    }
    public class MobileDevice
    {
        public string DeviceType { get; set; }
        public string NewReplacement { get; set; }
        [DataType(DataType.MultilineText)]
        public string JobTitle { get; set; }
    }

    public class Other
    {
        public string Subject { get; set; }
        [DataType(DataType.MultilineText)]
        public string Body { get; set; }
    }
}
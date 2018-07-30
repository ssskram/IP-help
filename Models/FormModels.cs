using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IPHelp.Models {
    public class PCOrder {
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
        public string Accessories { get; set; }

        [DataType (DataType.MultilineText)]
        public string SoftwareApplications { get; set; }
        public string CC { get; set; }
        public string CellularData { get; set; }
        public string CellularDataJustification { get; set; }
    }

    public class MobileDevice {
        public string DeviceType { get; set; }
        public string NewReplacement { get; set; }
        public string JobTitle { get; set; }

        [DataType (DataType.MultilineText)]
        public string JobDuties { get; set; }

        [DataType (DataType.MultilineText)]
        public string ReplacementExplanation { get; set; }
    }

    public class Other {
        [DataType (DataType.MultilineText)]
        public string Body { get; set; }
    }
}
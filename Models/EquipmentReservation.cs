using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IPHelp.Models {
    public class Reservation {
        public string reservationID { get; set; }
        public string user { get; set; }
        public string department { get; set; }
        public string item { get; set; }
        public string itemID { get; set; }
        public string assetNumber { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public string pickedUp { get; set; }
        public string returned { get; set; }

    }

    public class Equipment {
        public string item { get; set; }
        public string itemID { get; set; }
        public string itemType { get; set; }
        public string location { get; set; }
        public string pcNumber { get; set; }
        public string assetNumber { get; set; }
    }
    
}
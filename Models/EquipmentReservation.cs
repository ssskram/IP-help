using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IPHelp.Models {
    public class Reservation {
        public string itemID { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public string pickedUp { get; set; }
        public string returned { get; set; }

    }

    public class Equipment {
        public string item { get; set; }
        public string itemID { get; set; }
        public string itemType { get; set; }
        public string assetNumber { get; set; }
    }

    public class NewReservation {
        public string reservationID { get; set; }
        public string networkID { get; set; }
        public string department { get; set; }
        public string phone { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public List<Equipment> items { get; set; }
        public string[] types { get; set; }
    }
}
import * as moment from "moment";

// takes the timepsan provided, all equipment, and all existing reservations
export function getAvailableEquipment(state, equipment, reservations) {
  // finds existing reservations that overlap with timespan
  const format = "MM-DD-YYYY, hh:mm A";
  const from = moment(state.fromDate + ", " + state.fromTime).format(format);
  const to = moment(state.toDate + ", " + state.toTime).format(format);
  const overlappingResos = reservations.filter(reso => {
    return (
      moment(reso.from).isBetween(from, to) ||
      moment(reso.to).isBetween(from, to) ||
      moment(from).isBetween(reso.from, reso.to) ||
      moment(to).isBetween(reso.from, reso.to) ||
      (reso.from == from && reso.to == to)
    );
  });
  if (overlappingResos.length == 0) {
    return equipment;
  } else {
    // if reservations overlap with timepsan, then return all equipment sub equipment for overlapping reservations
    let availableEquipment = equipment.filter(item => {
      return (
        overlappingResos.filter(reso => {
          return reso.itemID == item.itemID;
        }).length == 0
      );
    });
    return availableEquipment;
  }
}

// takes an item type, array of available equipment from getAvailableEquipment(), and  flavor (accessory vs. nonaccessory)
export function checkAvailability(itemType, availableEquipment, flavor) {
  // filters available equipment by item type
  if (flavor == "Accessory") {
    const available = availableEquipment.filter(item => item.item == itemType);
    if (available.length > 0) {
      // got anything? return true
      return true;
    } else return false;
  } else {
    const available = availableEquipment.filter(
      item => item.itemType == itemType
    );
    if (available.length > 0) {
      return true;
    } else return false;
  }
}

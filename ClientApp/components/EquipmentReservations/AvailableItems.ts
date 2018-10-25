import * as moment from 'moment'

export function checkAvailability(itemType, availableEquipment, flavor) {
    if (flavor == 'Accessory') {
        const available = availableEquipment.filter(item => {
            return item.item == itemType
        })
        if (available.length > 0) {
            return true
        } else return false
    } else {
        const available = availableEquipment.filter(item => {
            return item.itemType == itemType
        })
        if (available.length > 0) {
            return true
        } else return false
    }
}

export function getAvailableEquipment(from, to, equipment, reservations) {
    const fromDate = moment(from)
    const toDate = moment(to)
    const overlappingResos = reservations.filter(reso => {
        return moment(reso.from).isBetween(fromDate, toDate) || moment(reso.to).isBetween(fromDate, toDate)
    })
    if (overlappingResos.length == 0) {
        return equipment
    } else {
        let availableEquipment = equipment.filter(item => {
            return overlappingResos.filter(reso => {
                return reso.itemID == item.itemID
            }).length == 0
        })
        return availableEquipment
    }
}
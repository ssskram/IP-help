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
    const format = 'MM-DD-YYYY, hh:mm A'
    const fromDate = moment(from).format(format)
    const toDate = moment(to).format(format)
    const overlappingResos = reservations.filter(reso => {
        const fromMoment = moment(reso.from)
        const toMoment = moment(reso.to)
        return (fromMoment.isBetween(fromDate, toDate)) || (toMoment.isBetween(fromDate, toDate))
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
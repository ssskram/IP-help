
// user
export interface user {
    user: string
}

// message
export interface messsage { 
    message: string
}

// liaisons
export interface liaisons {
    liaisons: user[]
}

// equipment loans
export interface equipmentLoans {
    loans: equipmentLoan []
}
export interface equipmentLoan {
    reservationID: string
    department: string
    networkID: string
    phone: string
    item: string
    itemID: string
    assetNumber: string
    from: string
    to: string
    pickedUp: string
    returned: string
}

// equipment
export interface equipment {
    equipment: equipmentItem[]
}

export interface equipmentItem {
    item: string
    itemType: string
    location: string
    pcNumber: string
    assetNumber: string
    itemID: string
}

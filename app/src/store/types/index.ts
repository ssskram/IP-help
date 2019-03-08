
// user
export interface user {
    email: string
    organization: string
    name: string
}

// message
export interface messsage {
    message: string
}

// liaisons
export interface liaisons {
    liaisons: liaison[]
}
export interface liaison {
    user: string
    department: string
}

// equipment loans
export interface equipmentLoans {
    loans: equipmentLoan[]
}
export interface equipmentLoan {
    reservationID: string
    department: string
    phone: string
    item: string
    itemID: string
    assetNumber: string
    from: string
    to: string
    pickedUp: string
    returned: string
}
// new reservation
export interface newReservation {
    reservationID: string
    department: string
    phone: string
    items: string[]
    from: string
    to: string
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

// course registrations
export interface courses {
    courses: course[]
}
export interface course {
    courseId: number
    courseCode: string
    courseName: string
    courseDescription: string
    courseLocation: string
    startDate: string
    endDate: string
    maximumCapacity: number
}
export interface courseRegistrations {
    courseRegistrations: courseRegistration[]
}
export interface courseRegistration {
    registrationId: number
    user: string
    courseCode: string
    registrationStatus: string
    registrationDate: string
}
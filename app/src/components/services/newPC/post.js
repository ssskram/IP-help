import sendgridPost from '../../../functions/sendgridEndpoint'

export default async function postOTRS(request, user) {

    let postSuccess = true

    // prepare email
    let emailBody
    await fetch('emailTemplates/pcOrder.html')
        .then(response => response.text())
        .then(text => emailBody = String.format(text,
            user, // 0
            request.customerPhone, // 1
            request.department, // 2
            request.machineType, // 3
            request.cellularData, // 4
            request.cellularDataJustification, // 5
            request.userName, // 6
            request.userNetworkID, // 7
            request.building, // 8
            request.floor, // 9
            request.accessories, // 10
            request.softwareApplications, // 11
            request.employmentStatus, // 12
            request.employmentType, // 13
            request.previouslyFunctioning, // 14
            request.computerNumber, // 15
            request.computerFunctioning, // 16
            request.OTRSticket)) // 17

    const success = await sendgridPost(user, 'test', emailBody, undefined)
    return success
}
import sendgridPost from '../../../functions/sendgridEndpoint'

export default async function postOTRS(request, user) {

    // error handling
    let success = true

    // arguments for sendgrid
    const args = {
        to: undefined,
        user: user,
        subject: 'Equipment Loan #' + request.reservationID,
        email: undefined,
        attachment: undefined
    }
    const setBody = async (b) => args.email = b

    // prepare emails
    //.. first otrs
    let otrsBody
    await fetch('emailTemplates/equipmentLoanOTRS.html')
        .then(response => response.text())
        .then(text => otrsBody = String.format(text,
            request.reservationID, // 0
            user.email, // 1
            request.items.map(u => u.item).join(', '), // 2
            request.from, // 3
            request.to)) // 4
    await setBody(otrsBody)
    success = await sendgridPost(args)

    // ... then confirmation to user
    let confirmationBody
    await fetch('emailTemplates/equipmentLoanConfirmation.html')
        .then(response => response.text())
        .then(text => confirmationBody = String.format(text,
            request.reservationID, // 0
            request.types, // 1
            request.from, // 2
            request.to)) // 3
    await setBody(confirmationBody)
    success = await sendgridPost(args)

    return success
}

import sendgridPost from '../../../functions/sendgridEndpoint'

export default async function postOTRS(request, user) {

    // prepare email
    let emailBody
    await fetch('emailTemplates/internationalTravel.html')
        .then(response => response.text())
        .then(text => emailBody = String.format(text,
            request.userName, // 0
            request.destinations, // 1
            request.dateLeave, // 2
            request.dateReturn)) // 3


    const args = {
        to: user,
        user: user,
        subject: request.userName + " out of the country, " + request.dateLeave + " - " + request.dateReturn,
        email: emailBody,
        attachment: undefined
    }

    const success = await sendgridPost(args)
    return success
}
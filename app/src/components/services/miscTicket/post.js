import sendgridPost from '../../../functions/sendgridEndpoint'

export default async function postOTRS(request, user) {

    let emailBody
    // prepare email
    await fetch('emailTemplates/miscTicket.html')
        .then(response => response.text())
        .then(text => emailBody = String.format(text,
            request.body)) // 4
        .catch(err => postSuccess = false)


    const args = {
        user: user,
        subject: request.subject,
        email: emailBody,
        attachment: request.attachment[0]
    }

    const success = await sendgridPost(args)
    return success
}



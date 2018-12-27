import sendgridPost from '../../../functions/sendgridEndpoint'

export default async function postOTRS(request, user) {

    let emailBody
    // prepare email
    await fetch('emailTemplates/miscTicket.html')
        .then(response => response.text())
        .then(text => emailBody = String.format(text,
            request.body)) // 4

    const args = {
        to: undefined,
        user: user,
        subject: request.subject,
        email: emailBody,
        attachment: undefined
    }

    if (request.attachments.length > 0) {
        const setAttachment = async (a) => args.attachment = a
        await setAttachment(request.attachments[0])
    }

    const success = await sendgridPost(args)
    return success
}
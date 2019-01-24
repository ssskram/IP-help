import sendgridPost from '../../../functions/sendgridEndpoint'

export default async function postOTRS(request, user) {

    // prepare email
    let emailBody
    await fetch('emailTemplates/desktopPhone.html')
        .then(response => response.text())
        .then(text => emailBody = String.format(text,
            request.userName, // 0
            request.existingNumber, // 1
            request.intercomNumber, // 2
            request.voicemail.value, // 3
            request.phoneTrees.value, // 4
            request.department.value)) // 5


    const args = {
        to: user.email, // switch to undefined
        user: user,
        subject: "New desk phone ordered for " + request.userName,
        email: emailBody,
        attachment: undefined
    }

    const success = await sendgridPost(args)
    return success
}
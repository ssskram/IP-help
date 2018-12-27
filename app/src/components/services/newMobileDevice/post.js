import sendgridPost from '../../../functions/sendgridEndpoint'

export default async function postOTRS(request, user) {

    // prepare email
    let emailBody
    await fetch('emailTemplates/mobileDevice.html')
        .then(response => response.text())
        .then(text => emailBody = String.format(text,
            user, // 0
            request.deviceType.value, // 1
            request.newReplacement.value, // 2
            request.jobTitle, // 3
            request.jobDuties, // 4
            request.replacementExplanation)) // 5


    const args = {
        user: user,
        subject: "New mobile device ordered for " + request.jobTitle,
        email: emailBody,
        attachment: undefined
    }

    const success = await sendgridPost(args)
    return success
}
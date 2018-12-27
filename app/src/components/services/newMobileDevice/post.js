import sendgridPost from '../../../functions/sendgridEndpoint'

export default async function postOTRS(request, user) {

    // prepare email
    let emailBody
    await fetch('emailTemplates/mobileDevice.html')
        .then(response => response.text())
        .then(text => emailBody = String.format(text,
            user.email, // 0
            request.deviceType.value, // 1
            request.newReplacement.value, // 2
            request.jobTitle, // 3
            request.jobDuties, // 4
            request.replacementExplanation)) // 5


    const args = {
        to: undefined,
        user: user,
        subject: "New mobile device ordered for " + request.jobTitle,
        email: emailBody,
        attachment: undefined
    }

    const success = await sendgridPost(args)
    return success
}

String.format = function () {
    var s = arguments[0]
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm")
        s = s.replace(reg, arguments[i + 1])
    }
    return s
}
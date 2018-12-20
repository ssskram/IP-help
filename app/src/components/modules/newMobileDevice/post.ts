
export default async function postOTRS(request, user) {

    let postSuccess = true

    // prepare email
    let otrs
    await fetch('emailTemplates/mobileDevice.html')
        .then(response => response.text())
        .then(text => otrs = String.format(text,
            user, // 0
            request.deviceType.value, // 1
            request.newReplacement.value, // 2
            request.jobTitle, // 3
            request.jobDuties, // 4
            request.replacementExplanation)) // 5
        .catch(err => postSuccess = false)
    try {
        // build sendgrid load
        const otrsLoad = JSON.stringify({
            to: "cis.sys.net.notifier@pittsburghpa.gov",
            from: {
                email: user,
                name: 'I&P Help'
            },
            subject: "New mobile device ordered for " + request.jobTitle,
            html: otrs
        })
        // and post
        await fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
            method: 'POST',
            body: otrsLoad,
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_SENDGRID_API,
                'Content-type': 'application/json'
            })
        })
            .catch(err => postSuccess = false)
    } catch (err) {
        postSuccess = false
    }
    return postSuccess
}

declare module String {
    export var format: any;
}
String.format = function () {
    var s = arguments[0]
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm")
        s = s.replace(reg, arguments[i + 1])
    }
    return s
}


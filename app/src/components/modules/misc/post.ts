
export default async function postOTRS(request, user) {

    let postSuccess = true

    // prepare email
    let otrs
    await fetch('emailTemplates/miscTicket.html')
        .then(response => response.text())
        .then(text => otrs = String.format(text,
            request.body)) // 4
        .catch(err => postSuccess = false)
    try {
        // build sendgrid load
        const otrsLoad = JSON.stringify({
            to: "paul.marks@pittsburghpa.gov",
            from: {
                email: user,
                name: 'I&P Help'
            },
            subject: request.subject,
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

// string formatting 
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

export default async function postOTRS(request, user) {

    let postSuccess = true
    let otrsEmail

    // prepare email
    await fetch('emailTemplates/miscTicket.html')
        .then(response => response.text())
        .then(text => otrsEmail = String.format(text,
            request.body)) // 4
        .catch(err => postSuccess = false)

    // define call
    const call = async body => await fetch('http://localhost:3000/sendMail/single', {
        method: 'POST',
        body: body,
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_SENDGRID_API,
            'Content-type': 'application/json'
        })
    })
        .catch(err => postSuccess = false)

    if (request.attachments.length > 0) {
        // build sendgrid load with attachment
        let reader = await new FileReader()
        await reader.readAsDataURL(request.attachments[0])
        reader.onload = async () => {
            const fullString = reader.result as string
            const otrsLoad = await JSON.stringify({
                to: "cis.sys.net.notifier@pittsburghpa.gov",
                from: {
                    email: user,
                    name: 'I&P Help'
                },
                subject: request.subject,
                html: otrsEmail,
                attachments: [
                    {
                        content: fullString.split(',')[1],
                        filename: request.attachments[0].name,
                        disposition: 'attachment'
                    }
                ]
            })
            try { call(otrsLoad) } catch (error) { postSuccess = false }
        }
    } else {
        // build sendgrid load w/o attachment
        const otrsLoad = await JSON.stringify({
            to: "cis.sys.net.notifier@pittsburghpa.gov",
            from: {
                email: user,
                name: 'I&P Help'
            },
            subject: request.subject,
            html: otrsEmail
        })
        try { call(otrsLoad) } catch (error) { postSuccess = false }
    }
    return postSuccess
}

declare module String {
    export var format: any
}

String.format = function () {
    var s = arguments[0]
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm")
        s = s.replace(reg, arguments[i + 1])
    }
    return s
}



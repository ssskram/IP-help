
export default async function postOTRS(request, user) {

    let postSuccess = true

    // prepare confirmation email
    let emailBody
    await fetch('emailTemplates/equipmentLoanOTRS.html')
        .then(response => response.text())
        .then(text => emailBody = String.format(text,
            request.reservationID, // 0
            user, // 1
            request.items.map(u => u.item).join(', '), // 2
            request.from, // 3
            request.to)) // 4

    try {
        // build sendgrid load, no attachment
        const sendgridLoad = JSON.stringify({
            to: "cis.sys.net.notifier@pittsburghpa.gov",
            from: {
                email: user,
                name: 'I&P Help'
            },
            subject: 'Equipment Loan #' + request.reservationID,
            html: emailBody
        })

        // and post
        fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
            method: 'POST',
            body: sendgridLoad,
            headers: new Headers({
                'Authorization': 'Bearer 6df4c73d-71f1-478d-ba2d-63f62e4de251',
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
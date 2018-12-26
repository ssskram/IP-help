
export default async function postOTRS(request, user) {

    let postSuccess = true

    // prepare emails
    let otrs
    await fetch('emailTemplates/equipmentLoanOTRS.html')
        .then(response => response.text())
        .then(text => otrs = String.format(text,
            request.reservationID, // 0
            user, // 1
            request.items.map(u => u.item).join(', '), // 2
            request.from, // 3
            request.to)) // 4
        .catch(err => postSuccess = false)
    let confirmation
    await fetch('emailTemplates/equipmentLoanConfirmation.html')
        .then(response => response.text())
        .then(text => confirmation = String.format(text,
            request.reservationID, // 0
            request.types, // 1
            request.from, // 2
            request.to)) // 3
        .catch(err => postSuccess = false)
    try {
        // build sendgrid loads
        const otrsLoad = JSON.stringify({
            to: "cis.sys.net.notifier@pittsburghpa.gov",
            from: {
                email: user,
                name: 'I&P Help'
            },
            subject: 'Equipment Loan #' + request.reservationID,
            html: otrs
        })
        const confirmationLoad = JSON.stringify({
            to: user,
            from: {
                email: user,
                name: 'I&P Help'
            },
            subject: 'Equipment Loan #' + request.reservationID,
            html: confirmation
        })
        // and post
        fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
            method: 'POST',
            body: otrsLoad,
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_SENDGRID_API,
                'Content-type': 'application/json'
            })
        })
            .catch(err => postSuccess = false)
        fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
            method: 'POST',
            body: confirmationLoad,
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
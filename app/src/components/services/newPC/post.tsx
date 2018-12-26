
export default async function postOTRS(request, user) {

    let postSuccess = true

    // prepare email
    let otrs
    await fetch('emailTemplates/pcOrder.html')
        .then(response => response.text())
        .then(text => otrs = String.format(text,
            user, // 0
            request.customerPhone, // 1
            request.department, // 2
            request.machineType, // 3
            request.cellularData, // 4
            request.cellularDataJustification, // 5
            request.userName, // 6
            request.userNetworkID, // 7
            request.building, // 8
            request.floor, // 9
            request.accessories, // 10
            request.softwareApplications, // 11
            request.employmentStatus, // 12
            request.employmentType, // 13
            request.previouslyFunctioning, // 14
            request.computerNumber, // 15
            request.computerFunctioning, // 16
            request.OTRSticket)) // 17
        .catch(err => postSuccess = false)
    try {
        // build sendgrid load
        let otrsLoad = {
            to: "cis.sys.net.notifier@pittsburghpa.gov",
            from: {
                email: user,
                name: 'I&P Help'
            },
            subject: "Request for new PC",
            html: otrs
        }
        // and post
        await fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
            method: 'POST',
            body: JSON.stringify(otrsLoad),
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_SENDGRID_API,
                'Content-type': 'application/json'
            })
        })
            .catch(err => postSuccess = false)
        // if somebody is CCd
        if (request.cc) {
            otrsLoad.to = request.cc
            await fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
                method: 'POST',
                body: JSON.stringify(otrsLoad),
                headers: new Headers({
                    'Authorization': 'Bearer ' + process.env.REACT_APP_SENDGRID_API,
                    'Content-type': 'application/json'
                })
            })
                .catch(err => postSuccess = false)
        }
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




export default async function postPickup(request, user) {

    console.log(request)
    console.log(user)

    let postSuccess = true

    // prepare confirmation email
    let emailBody
    await fetch('emailTemplates/equipmentPickup.html')
        .then(response => response.text())
        .then(text => emailBody = String.format(text,
            request.equipmentType.value,
            request.quantityEquipment,
            request.modelNumber,
            request.equipmentNumber,
            request.assetTagNumber,
            request.locationEquipment,
            request.primaryContact,
            request.secondaryContact,
            request.phoneNumber,
            request.department.value,
            request.image))

    if (request.image.length > 0) {
        console.log('image')
        try {
            // for sendgrid, transform image, base64
            let reader = await new FileReader()
            await reader.readAsDataURL(request.image[0])
            reader.onload = async () => {
                // once complete, build sendgrid load with attachment
                const fullString = reader.result as string
                const sendgridLoad = JSON.stringify({
                    to: user.email,
                    from: {
                        email: user.email,
                        name: 'I&P Help'
                    },
                    subject: 'Request for Equipment Pickup',
                    html: emailBody,
                    attachments: [
                        {
                            content: fullString.split(',')[1],
                            filename: request.image[0].name,
                            type: 'image/png',
                            disposition: 'attachment'
                        }
                    ]
                })

                // and post
                await fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
                    method: 'POST',
                    body: sendgridLoad,
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
    } else {
        console.log('no image')
        try {
            // build sendgrid load, no attachment
            const sendgridLoad = JSON.stringify({
                to: user.email,
                from: {
                    email: user.email,
                    name: 'I&P Help'
                },
                subject: 'Request for Equipment Pickup',
                html: emailBody
            })

            // and post
            await fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
                method: 'POST',
                body: sendgridLoad,
                headers: new Headers({
                    'Authorization': 'Bearer ' + process.env.REACT_APP_SENDGRID_API,
                    'Content-type': 'application/json'
                })
            })
                .catch(err => postSuccess = false)
        } catch (err) {
            postSuccess = false
        }
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
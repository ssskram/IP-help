
export default async function postPickup(request, user) {

    let postSuccess = true

    // prepare confirmation email
    let emailBody
    await fetch('emailTemplates/EquipmentPickup.html')
        .then(response => response.text())
        .then(text => emailBody = String.format(text,
            request.equipmentType,
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
        try {
            // for sendgrid, transform image, base64
            let reader = await new FileReader()
            await reader.readAsDataURL(request.image[0])
            reader.onload = () => {
                // once complete, build sendgrid load with attachment
                const fullString = reader.result as string
                const sendgridLoad = JSON.stringify({
                    to: user,
                    from: {
                        email: user,
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
                fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
                    method: 'POST',
                    body: sendgridLoad,
                    headers: new Headers({
                        'Authorization': 'Bearer 6df4c73d-71f1-478d-ba2d-63f62e4de251',
                        'Content-type': 'application/json'
                    })
                })
            }
        } catch (err) {
            postSuccess = false
        }
    } else {
        try {
            // build sendgrid load, no attachment
            const sendgridLoad = JSON.stringify({
                to: user,
                from: {
                    email: user,
                    name: 'I&P Help'
                },
                subject: 'Request for Equipment Pickup',
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
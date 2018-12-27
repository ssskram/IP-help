
// handles sendgrid POSTs

export default async function sendgridEndpoint(user, subject, email, attachment) {

    let postSuccess = true

    let sendgridLoad = {
        // OTRS HERE
        to: user.email,
        from: {
            email: user.email,
            name: 'I&P Help'
        },
        subject: subject,
        html: email,
        // attachment comes later, if applicable, if applicable
    } as any

    // define endpoint
    const post = async (load) => fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
        method: 'POST',
        body: load,
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_SENDGRID_API,
            'Content-type': 'application/json'
        })
    })
        .catch(err => postSuccess = false)

    if (attachment) {
        // transform file, base64
        let reader = new FileReader()
        reader.readAsDataURL(attachment)
        reader.onload = () => {
            // once complete, build sendgrid load with attachment
            const fullString: any = reader.result
            // add attachment to load
            sendgridLoad.attachments = [{
                content: fullString.split(',')[1],
                filename: attachment.name,
                disposition: 'attachment'
            }]
            //then 
            post(JSON.stringify(sendgridLoad))
        }
    } else post(JSON.stringify(sendgridLoad))

    return postSuccess
}
import * as types from '../store/types'

// handles sendgrid POSTs

interface args {
    user: types.user
    subject: any
    email: string
    attachment: any
}

interface sgLoad {
    to: string
    from: {
        email: string
        name: string
    }
    subject: string
    html: string
    attachments?: any
}

export default async function sharepointEndpoint(args: args) {

    let postSuccess = true

    let sendgridLoad: sgLoad = {
        // OTRS HERE
        to: args.user.email,
        from: {
            email: args.user.email,
            name: 'I&P Help'
        },
        subject: args.subject,
        html: args.email,
        // attachment comes later, if applicable, if applicable
    }

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

    if (args.attachment) {
        // transform file, base64
        let reader = new FileReader()
        reader.readAsDataURL(args.attachment)
        reader.onload = () => {
            // once complete, build sendgrid load with attachment
            const fullString: any = reader.result
            // add attachment to load
            sendgridLoad.attachments = [{
                content: fullString.split(',')[1],
                filename: args.attachment.name,
                disposition: 'attachment'
            }]
            //then 
            post(JSON.stringify(sendgridLoad))
        }
    } else post(JSON.stringify(sendgridLoad))

    return postSuccess
}
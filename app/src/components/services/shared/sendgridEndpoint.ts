
// reloads window at node endpoint /logout

async function sendgridEndpoint(load) {
    let postSuccess = true
    await fetch('https://sendgridproxy.azurewebsites.us/sendMail/single', {
        method: 'POST',
        body: load,
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.REACT_APP_SENDGRID_API,
            'Content-type': 'application/json'
        })
    })
        .catch(err => postSuccess = false)
        
    return postSuccess
}

export default sendgridEndpoint
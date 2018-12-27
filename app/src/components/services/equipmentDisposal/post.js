import sendgridPost from '../../../functions/sendgridEndpoint'

export default async function postPickup(request, user) {

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

    const args = {
        to: undefined,
        user: user,
        subject: 'Request For Equipment Pickup',
        email: emailBody,
        attachment: undefined
    }

    if (request.image.length > 0) {
        const setAttachment = async (a) => args.attachment = a
        await setAttachment(request.image[0])
    }

    const success = await sendgridPost(args)
    return success
}

String.format = function () {
    var s = arguments[0]
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm")
        s = s.replace(reg, arguments[i + 1])
    }
    return s
}
import sendgridPost from '../../../functions/sendgridEndpoint'

export default async function postPickup(request, user) {

    // prepare confirmation email
    let emailBody
    await fetch('emailTemplates/equipmentPickup.html')
        .then(response => response.text())
        .then(text => emailBody = String.format(text,
            request.equipmentType.value || 'Bulk',
            request.modelNumber || 'Bulk',
            request.equipmentNumber || 'Bulk',
            request.assetTagNumber || 'Bulk',
            request.locationEquipment,
            request.primaryContact,
            request.secondaryContact,
            request.phoneNumber,
            request.department.value,
            request.attachment))

    const args = {
        to: undefined,
        user: user,
        subject: 'Request For Equipment Pickup',
        email: emailBody,
        attachment: undefined
    }

    if (request.attachment.length > 0) {
        const setAttachment = async (a) => args.attachment = a
        await setAttachment(request.attachment[0])
    }

    const success = await sendgridPost(args)
    return success
}
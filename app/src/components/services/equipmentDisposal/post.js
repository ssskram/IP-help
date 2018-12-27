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

    const success = await sendgridPost(user, 'test', emailBody, request.image[0])
    return success
}
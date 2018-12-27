import * as moment from 'moment'

export default async function postSP(request, user) {

    let postSuccess = true
    for (const item of request.items) {
        const forSP = {
            ReservationID: request.reservationID,
            User: user.email,
            Department: request.department.value,
            Phone: request.phone,
            Item: item.item,
            ItemID: item.itemID.toString(),
            AssetNumber: item.assetNumber,
            PickedUp: 'False',
            Returned: 'False',
            From: moment(request.from),
            To: moment(request.to)
        }
        console.log(forSP)
        await fetch("https://365proxy.azurewebsites.us/iphelp/newEquipmentLoan", {
            method: 'post',
            body: JSON.stringify(forSP),
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_API,
                'Content-Type': 'application/json'
            })
        })
            .catch(err => postSuccess = false)
    }
    return postSuccess
}
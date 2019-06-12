import sendgridPost from "../../../functions/sendgridEndpoint";

export default async function postOTRS(request, user) {
  // prepare email
  let emailBody;
  await fetch("emailTemplates/pcOrder.html")
    .then(response => response.text())
    .then(
      text =>
        (emailBody = String.format(
          text,
          user.email, // 0
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
          request.OTRSticket, // 17
          request.additionalInformation, // 18
          request.employeeStartDate
        ))
    ); // 19

  let args = {
    to: undefined,
    user: user,
    subject: "New PC Request for " + request.userName,
    email: emailBody,
    attachment: undefined
  };

  let success = await sendgridPost(args);

  // cc on the order
  if (request.cc != "") {
    const setCC = async cc => (args.to = cc);
    await setCC(request.cc);
    success = await sendgridPost(args);
  }

  return success;
}

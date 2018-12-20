import * as React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const buttonWidth = {
    width: '98%'
}

export default class Menu extends React.Component {

    public render() {
        return (
            <div>
                <LinkContainer style={buttonWidth} to={'/NewPC'} exact>
                    <button className='btn btn-primary nav-button'>New PC</button>
                </LinkContainer>
                <a target='_blank' title="Request a new user account" href='https://cityofpittsburgh-my.sharepoint.com/:x:/r/personal/paul_scherrer_pittsburghpa_gov2/_layouts/15/WopiFrame.aspx?guestaccesstoken=Snz9oKYl15kxoHFHQPDs7rtciwH3mrGq7ZYGkIdqAOU%3d&docid=1_1f1cdb0766967490195afb496b2218146&wdFormId=%7B7F3E2D75-4E10-4612-BCE7-CFC4DA40381D%7D&action=formsubmit'>
                    <button style={buttonWidth} className='btn btn-primary nav-button'>New user account</button>
                </a>
                <LinkContainer style={buttonWidth} to={'/MobileDevice'}>
                    <button className='btn btn-primary nav-button'>New mobile device</button>
                </LinkContainer>
                <LinkContainer style={buttonWidth} to={'/EquipmentLoan'}>
                    <button className='btn btn-primary nav-button'>Borrow Equipment</button>
                </LinkContainer>
                <LinkContainer style={buttonWidth} to={'/EquipmentDisposal'}>
                    <button className='btn btn-primary nav-button'>IT equipment disposal</button>
                </LinkContainer>
                <LinkContainer style={buttonWidth} to={'/EmployeeData'}>
                    <button className='btn btn-primary nav-button'>Request employee data</button>
                </LinkContainer>
                <LinkContainer style={buttonWidth} to={'/Other'}>
                    <button className='btn btn-primary nav-button'>New ticket</button>
                </LinkContainer>
                <a target="_blank" title="Must be connected to the City network" href='https://otrs.city.pittsburgh.pa.us/otrs/customer.pl?Action=CustomerTicketOverview;Subaction=MyTickets'>
                    <button style={buttonWidth} className='btn btn-warning nav-button'><span style={{ color: '#383838' }}>My tickets</span></button>
                </a>
            </div>
        )
    }
}

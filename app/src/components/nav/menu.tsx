import * as React from 'react'
import { Nav, button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Menu extends React.Component {

    public render() {
        return (
            <Nav>
                <LinkContainer to={'/PCOrder'} exact>
                    <button className='btn btn-primary nav-button'>New PC</button>
                </LinkContainer>
                <LinkContainer to={'/MobileDevice'}>
                    <button className='btn btn-primary nav-button'>New user account</button>
                </LinkContainer>
                <LinkContainer to={'/MobileDevice'}>
                    <button className='btn btn-primary nav-button'>New mobile device</button>
                </LinkContainer>
                <LinkContainer to={'/EquipmentLoan'}>
                    <button className='btn btn-primary nav-button'>Borrow Equipment</button>
                </LinkContainer>
                <LinkContainer to={'/EquipmentDisposal'}>
                    <button className='btn btn-primary nav-button'>IT equipment disposal</button>
                </LinkContainer>
                <LinkContainer to={'/EmployeeData'}>
                    <button className='btn btn-primary nav-button'>Request employee data</button>
                </LinkContainer>
                <LinkContainer to={'/Other'}>
                    <button className='btn btn-primary nav-button'>New ticket</button>
                </LinkContainer>
                <LinkContainer to={'/Other'}>
                    <button className='btn btn-warning nav-button'><span style={{color: '#383838'}}>My tickets</span></button>
                </LinkContainer>
            </Nav>
        )
    }
}

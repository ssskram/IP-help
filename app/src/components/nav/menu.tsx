import * as React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Menu extends React.Component {

    public render() {
        return (
            <Nav>
                <LinkContainer to={'/PCOrder'} exact>
                    <NavItem className='btn btn-primary'>New PC</NavItem>
                </LinkContainer>
                <LinkContainer to={'/MobileDevice'}>
                    <NavItem className='btn btn-primary'>New user account</NavItem>
                </LinkContainer>
                <LinkContainer to={'/MobileDevice'}>
                    <NavItem className='btn btn-primary'>New mobile device</NavItem>
                </LinkContainer>
                <LinkContainer to={'/EquipmentLoan'}>
                    <NavItem className='btn btn-primary'>Borrow Equipment</NavItem>
                </LinkContainer>
                <LinkContainer to={'/EquipmentDisposal'}>
                    <NavItem className='btn btn-primary'>IT equipment disposal</NavItem>
                </LinkContainer>
                <LinkContainer to={'/EmployeeData'}>
                    <NavItem className='btn btn-primary'>Request employee data</NavItem>
                </LinkContainer>
                <LinkContainer to={'/Other'}>
                    <NavItem className='btn btn-primary'>New ticket</NavItem>
                </LinkContainer>
                <LinkContainer to={'/Other'}>
                    <NavItem className='btn btn-warning'><span style={{color: '#383838'}}>My tickets</span></NavItem>
                </LinkContainer>
            </Nav>
        )
    }
}

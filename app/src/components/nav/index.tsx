import * as React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import AccountContainer from './accountContainer'

const btnStyle = {
  fontSize: '20px',
  padding: '3px 15px',
  margin: '7px 10px'
}

export default class NavMenu extends React.Component<any, any> {

  public render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect style={{ zIndex: 1000 as any }}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>I&P Help</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Link to={'/HelpContent'} className='btn btn-primary' style={btnStyle}>Training & FAQ</Link>
          <a className='btn btn-warning' style={btnStyle} target="_blank" title="Must be connected to the City network" href='https://otrs.city.pittsburgh.pa.us/otrs/customer.pl?Action=CustomerTicketOverview;Subaction=MyTickets'>
            My tickets
            </a>
          <AccountContainer />
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
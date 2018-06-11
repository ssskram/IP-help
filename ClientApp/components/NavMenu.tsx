import * as React from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
declare var $: any;

export class NavMenu extends React.Component<any, any>  {
    constructor() {
        super();
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        fetch('/api/userdata/getuser', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState ({
                    user: data,
                })
            });
    }

    public render() {
        const { user } = this.state
        
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' } data-toggle="collapse" data-target=".in">I&P <strong>Help</strong></Link>
                </div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li className="sidenav-header"><span className='glyphicon glyphicon-cog'></span>Services</li>
                        <li>
                            <NavLink to={ '/PCOrder' } title="Order a new PC" activeClassName='active' data-toggle="collapse" data-target=".in">
                                New PC
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/NetworkRegistration' } title="Request a new user account" activeClassName='active' data-toggle="collapse" data-target=".in">
                                 New user account
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/MobileDevice' } title="Order a new mobile device" activeClassName='active' data-toggle="collapse" data-target=".in">
                                New mobile device
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/Other' } title="Miscellaneous request" activeClassName='active' data-toggle="collapse" data-target=".in">
                                Other
                            </NavLink>
                        </li>
                        <li className="sidenav-header"><span className='glyphicon glyphicon-cog'></span>Resources</li>
                        <li>
                        <NavLink to={ '/SelfService' } activeClassName='active' data-toggle="collapse" data-target=".in">
                            Self service
                        </NavLink>
                        </li>
                        <li>
                        <a href="https://otrs.city.pittsburgh.pa.us/otrs/customer.pl?Action=CustomerTicketOverview;Subaction=MyTickets" target="_blank" data-toggle="collapse" data-target=".in" title="Must be connected to the City network">
                            My tickets
                        </a>
                        </li>
                        <li>
                        <a href="http://portal.office.com/" target="_blank" data-toggle="collapse" data-target=".in" title="Email, OneDrive, etc.">
                            Microsoft portal
                        </a>
                        </li>
                        <div className='accountcontainer'>
                            <li className="account">{user}</li>
                            <li className='logout'>
                            <NavLink to={ '/Account/Login' } activeClassName='active' id="logout" className='btn btn-link navbar-logout-btn navbar-link'>
                                <span className='glyphicon glyphicon-user'></span>Logout
                            </NavLink>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>;
    }
}

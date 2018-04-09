import * as React from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface UserState {
    username: UserData [];
}

export class NavMenu extends React.Component<UserData, UserState> {
    constructor() {
        super();
        this.state = { username: [] };

        fetch('/api/userdata/getuser', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ username: data });
        });
    }

    public render() {
        let contents = NavMenu.renderUser(this.state.username);

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
                        <li className="sidenav-header">Services</li>
                        <li>
                            <NavLink to={ '/PCOrder' } title="Order a new PC" activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-th-list'></span> Order a new PC
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/NetworkRegistration' } title="Request a new user account" activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-th-list'></span> Request a new user account
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/MobileDevice' } title="Order a new mobile device" activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-th-list'></span> Order a new mobile device
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/OfficeMoves' } title="Request support for an office move" activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-th-list'></span> Request support for an office move
                            </NavLink>
                        </li>
                        <li>
                            <a href="https://otrs.city.pittsburgh.pa.us/otrs/customer.pl?Action=CustomerTicketMessage" target="_blank" data-toggle="collapse" data-target=".in" title="Other">
                                <span className='glyphicon glyphicon-th-list'></span> Other
                            </a>
                        </li>
                        <li className="sidenav-header">Resources</li>
                        <li>
                        <NavLink to={ '/SelfService' } activeClassName='active' data-toggle="collapse" data-target=".in">
                            <span className='glyphicon glyphicon-cog'></span> Self service
                        </NavLink>
                        </li>
                        <li>
                        <a href="https://otrs.city.pittsburgh.pa.us/otrs/customer.pl?Action=CustomerTicketOverview;Subaction=MyTickets" target="_blank" data-toggle="collapse" data-target=".in">
                            <span className='glyphicon glyphicon-cog'></span> My tickets
                        </a>
                        </li>
                        <li>
                        <a href="http://portal.office.com/" target="_blank" data-toggle="collapse" data-target=".in">
                            <span className='glyphicon glyphicon-cog'></span> Microsoft portal
                        </a>
                        </li>
                        <div className='accountcontainer'>
                            <li>
                            { contents }
                            </li>
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

    private static renderUser(username: UserData[]) {
        return <div>             
            {username.map(un =>
            <div className='account'>{ un.user }</div>
        )} </div>;   
    }
}

interface UserData {
    user: string
}

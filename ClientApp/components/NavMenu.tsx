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
                    <Link className='navbar-brand' to={ '/' } data-toggle="collapse" data-target=".in">IP <strong>Help</strong></Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li className="sidenav-header">Services</li>
                        <li>
                            <NavLink to={ '/PCOrder' } activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-th-list'></span> Order a new PC
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/NetworkRegistration' } activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-th-list'></span> Request a new user account
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/MobileDevice' } activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-th-list'></span> Order a new mobile device
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/OfficeMoves' } activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-th-list'></span> Request support for an office move
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/PrintShop' } activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-th-list'></span> Place an order with the print shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/Blank' } activeClassName='active' data-toggle="collapse" data-target=".in">
                                <span className='glyphicon glyphicon-th-list'></span> Other
                            </NavLink>
                        </li>
                        <li className="sidenav-header">Training Resources</li>
                        <li>
                        <NavLink to={ '/' } activeClassName='active' data-toggle="collapse" data-target=".in">
                            <span className='glyphicon glyphicon-blackboard'></span> Hardware
                        </NavLink>
                        </li>
                        <li>
                        <NavLink to={ '/' } activeClassName='active' data-toggle="collapse" data-target=".in">
                            <span className='glyphicon glyphicon-blackboard'></span> Software
                        </NavLink>
                        </li>
                        <li>
                        <NavLink to={ '/' } activeClassName='active' data-toggle="collapse" data-target=".in">
                            <span className='glyphicon glyphicon-blackboard'></span> Workshops
                        </NavLink>
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

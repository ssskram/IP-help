import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as User from '../store/user';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

export class NavMenu extends React.Component<any, any>  {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    componentDidMount() {
        // load user
        this.props.requestUser()
    }

    componentWillReceiveProps(props) {
        let self = this;
        self.setState({ user: props.user })
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
                    <Link className='navbar-brand' to={'/'} data-toggle="collapse" data-target=".in">I&P <strong>Help</strong></Link>
                </div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li className="sidenav-header"><span className='glyphicon glyphicon-cog'></span>Services</li>
                        <li>
                            <NavLink to={'/PCOrder'} title="Order a new PC" activeClassName='active' data-toggle="collapse" data-target=".in">
                                New PC
                            </NavLink>
                        </li>
                        <li>
                            <a href="https://cityofpittsburgh-my.sharepoint.com/:x:/r/personal/paul_scherrer_pittsburghpa_gov2/_layouts/15/WopiFrame.aspx?guestaccesstoken=Snz9oKYl15kxoHFHQPDs7rtciwH3mrGq7ZYGkIdqAOU%3d&docid=1_1f1cdb0766967490195afb496b2218146&wdFormId=%7B7F3E2D75-4E10-4612-BCE7-CFC4DA40381D%7D&action=formsubmit" title="Request a new user account" target='_blank'>
                                New user account
                            </a>
                        </li>
                        <li>
                            <NavLink to={'/MobileDevice'} title="Order a new mobile device" activeClassName='active' data-toggle="collapse" data-target=".in">
                                New mobile device
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/EmployeeData'} title="Request email or wireless records" activeClassName='active' data-toggle="collapse" data-target=".in">
                                Request employee data
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/Other'} title="Miscellaneous request" activeClassName='active' data-toggle="collapse" data-target=".in">
                                Other
                            </NavLink>
                        </li>
                        <li className="sidenav-header"><span className='glyphicon glyphicon-cog'></span>Resources</li>
                        <li>
                            <NavLink to={'/SelfService'} activeClassName='active' data-toggle="collapse" data-target=".in">
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
                                <NavLink to={'/Account/Login'} activeClassName='active' id="logout" className='btn btn-link navbar-logout-btn navbar-link'>
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

export default connect(
    (state: ApplicationState) => 
    state.user,
    User.actionCreators
)(NavMenu as any) as typeof NavMenu;

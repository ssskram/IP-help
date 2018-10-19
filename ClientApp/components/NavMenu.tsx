import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as User from '../store/user';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Modal from 'react-responsive-modal'

const btnWidth = {
    width: '93%'
}

const marginTop = {
    marginTop: '18px',
}

const iconStyle = {
    height: '25px',
    marginTop: '-3px',
    marginLeft: '5px',
    marginRight: '15px'
}

const modalLogout = {
    color: '#383838',
}

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

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    navModal() {
        this.setState({
            modalIsOpen: true
        })
    }

    public render() {
        const {
            user,
            modalIsOpen
        } = this.state

        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button onClick={this.navModal.bind(this)} type='button' className='navbar-toggle'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>
                        <div style={marginTop}>I&P <strong>Help</strong></div>
                    </Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <div className='text-center'>
                            <li>
                                <NavLink to={'/PCOrder'} title="Order a new PC" style={btnWidth} className='btn btn-primary'>
                                    <b>New PC</b>
                                </NavLink>
                            </li>
                            <li>
                                <a href="https://cityofpittsburgh-my.sharepoint.com/:x:/r/personal/paul_scherrer_pittsburghpa_gov2/_layouts/15/WopiFrame.aspx?guestaccesstoken=Snz9oKYl15kxoHFHQPDs7rtciwH3mrGq7ZYGkIdqAOU%3d&docid=1_1f1cdb0766967490195afb496b2218146&wdFormId=%7B7F3E2D75-4E10-4612-BCE7-CFC4DA40381D%7D&action=formsubmit" title="Request a new user account" target='_blank' style={btnWidth} className='btn btn-primary'>
                                    <b>New user account</b>
                                </a>
                            </li>
                            <li>
                                <NavLink to={'/MobileDevice'} title="Order a new mobile device" style={btnWidth} className='btn btn-primary'>
                                    <b>New mobile device</b>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/EmployeeData'} title="Request email or wireless records" style={btnWidth} className='btn btn-primary'>
                                    <b>Request employee data</b>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/Other'} title="Miscellaneous request" style={btnWidth} className='btn btn-primary'>
                                    <b>Other</b>
                                </NavLink>
                            </li>
                        </div>
                        <div className='accountcontainer'>
                            <div className="account">{user}</div>
                            <div className='logout'>
                                <a href='/Account/Login' id="logout" className='btn btn-link navbar-logout-btn'>
                                    <span className='glyphicon glyphicon-user nav-glyphicon'></span>Logout
                                </a>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            <Modal
                open={modalIsOpen}
                onClose={this.closeModal.bind(this)}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                <div className='col-md-12'>
                    <br />
                    <br />
                    <div className='text-center'>
                        <Link onClick={this.closeModal.bind(this)} to={'/PCOrder'} style={btnWidth} className='btn btn-primary'>
                            New PC
                        </Link>
                        <a href="https://cityofpittsburgh-my.sharepoint.com/:x:/r/personal/paul_scherrer_pittsburghpa_gov2/_layouts/15/WopiFrame.aspx?guestaccesstoken=Snz9oKYl15kxoHFHQPDs7rtciwH3mrGq7ZYGkIdqAOU%3d&docid=1_1f1cdb0766967490195afb496b2218146&wdFormId=%7B7F3E2D75-4E10-4612-BCE7-CFC4DA40381D%7D&action=formsubmit" title="Request a new user account" target='_blank' style={btnWidth} className='btn btn-primary'>
                            New user account
                        </a>
                        <Link onClick={this.closeModal.bind(this)} to={'/MobileDevice'} style={btnWidth} className='btn btn-primary'>
                            New mobile device
                        </Link>
                        <Link onClick={this.closeModal.bind(this)} to={'/EmployeeData'} style={btnWidth} className='btn btn-primary'>
                            Request employee data
                        </Link>
                        <Link onClick={this.closeModal.bind(this)} to={'/Other'} style={btnWidth} className='btn btn-primary'>
                            Other
                        </Link>
                    </div>
                    <div className='accountcontainer'>
                        <div style={modalLogout} className="account">{user}</div>
                        <div style={modalLogout} className='logout'>
                            <NavLink style={modalLogout} to={'/Account/Login'} activeClassName='active' id="logout" className='btn btn-link navbar-logout-btn'>
                                <span className='glyphicon glyphicon-user nav-glyphicon'></span>Logout
                            </NavLink>
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
            </Modal>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) =>
        state.user,
    User.actionCreators
)(NavMenu as any) as typeof NavMenu;

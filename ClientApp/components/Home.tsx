import * as React from 'react';
import { Link } from 'react-router-dom';
import * as MessagesStore from '../store/messages';
import * as LiaisonsStore from '../store/equipmentLiaisons';
import * as Ping from '../store/ping';
import * as User from '../store/user';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Messages from './Messages';

const imgSize = {
    height: '75px',
    margin: '10px'
}

const btnFont = {
    color: '#fffaee'
}

const msIcon = require('./../images/microsoft.png')
const userIcon = require('./../images/otrs.png')
const faqIcon = require('./../images/faq.png')

export class Home extends React.Component<any, any> {

    componentDidMount() {
        window.scrollTo(0, 0)

        // load liaison status into store
        this.props.requestLiaisons()
    }

    componentWillUnmount() {
        this.props.clear()
    }

    public render() {
        return <div className="home-container">
            <img src='./images/ip.png' className="img-responsive center-block home-image" />
            <div className='text-center'>
                <h1>We're here to <strong>help</strong></h1>
                <div className="row text-center">
                    <Messages messages={this.props.messages} />
                </div>
                <hr />
            </div>
            <div className='row'>
                <div className='col-md-4 text-center'>
                    <a href="https://otrs.city.pittsburgh.pa.us/otrs/customer.pl?Action=CustomerTicketOverview;Subaction=MyTickets" target="_blank" type="button" title="Must be connected to the City network" className="btn btn-big btn-primary">
                        <div className='row'>
                            <div className='col-md-12'>
                                <img style={imgSize} src={userIcon as string} />
                            </div>
                            <div className='col-md-12'>
                                <div className='row'>
                                    <h3 style={btnFont}>My tickets</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div className='col-md-4 text-center'>
                    <Link to={'/SelfService'} type="button" className="btn btn-big btn-primary">
                        <div className='row'>
                            <div className='col-md-12'>
                                <img style={imgSize} src={faqIcon as string} />
                            </div>
                            <div className='col-md-12'>
                                <div className='row'>
                                    <h3 style={btnFont}>Training & FAQ</h3>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='col-md-4 text-center'>
                    <a href="http://portal.office.com/" target="_blank" type="button" title="Email, OneDrive, etc." className="btn btn-big btn-primary">
                        <div className='row'>
                            <div className='col-md-12'>
                                <img style={imgSize} src={msIcon as string} />
                            </div>
                            <div className='col-md-12'>
                                <div className='row'>
                                    <h3 style={btnFont}>Microsoft portal</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.liaison,
        ...state.ping,
        ...state.user
    }),
    ({
        ...MessagesStore.actionCreators,
        ...LiaisonsStore.actionCreators,
        ...Ping.actionCreators,
        ...User.actionCreators
    })
)(Home as any) as typeof Home;
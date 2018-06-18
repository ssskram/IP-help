import * as React from 'react';
import { Link } from 'react-router-dom';
import * as MessagesStore from '../store/messages';
import * as LiaisonsStore from '../store/equipmentLiaisons';
import * as Ping from '../store/ping';
import * as User from '../store/user';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Messages from './Messages';

export class Home extends React.Component<any, any> {

    componentDidMount() {
        // load liaison status into store
        this.props.requestLiaisons()
    }

    componentWillUnmount() {
        this.props.clear()
    }

    public render() {
        return <div className="home-container">
            <div className="row text-center">
                <Messages messages={this.props.messages} />
            </div>
            <img src='./images/ip.png' className="img-responsive center-block home-image" />
            <div className='text-center'>
                <h1>We're here to <strong>help</strong></h1>
                <hr />
            </div>
            <div className='row'>
                <div className='col-md-4 text-center'>
                    <a href="https://otrs.city.pittsburgh.pa.us/otrs/customer.pl?Action=CustomerTicketOverview;Subaction=MyTickets" target="_blank" type="button" title="Must be connected to the City network" className="btn btn-big">
                        <i className="glyphicon glyphicon-search home-icon"></i><br />
                        <div className="hidden-md">My tickets</div>
                    </a>
                </div>
                <div className='col-md-4 text-center'>
                    <Link to={'/SelfService'} type="button" className="btn btn-big">
                        <i className="glyphicon glyphicon-cog home-icon"></i><br />
                        <div className="hidden-md">Self service</div>
                    </Link>
                </div>
                <div className='col-md-4 text-center'>
                    <a href="http://portal.office.com/" target="_blank" type="button" title="Email, OneDrive, etc." className="btn btn-big">
                        <i className="glyphicon glyphicon-th-large home-icon"></i><br />
                        <div className="hidden-md">Microsoft portal</div>
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
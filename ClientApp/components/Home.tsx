import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
        <img src='./images/ip.png' className="img-responsive center-block home-image"/> 
        <div className='text-center'>
            <h1>We're here to <strong>help</strong></h1>
            <hr />
        </div>
        <div className='row'>
        <div className='col-md-4 text-center'>
            <a href="https://otrs.city.pittsburgh.pa.us/otrs/customer.pl?Action=CustomerTicketOverview;Subaction=MyTickets" target="_blank" type="button" title="Must be connected to the City network" className="btn btn-big"><i className="glyphicon glyphicon-search home-icon"></i><br/>My tickets</a>
        </div>
        <div className='col-md-4 text-center'>
            <a href="http://google.com/" type="button" title="Google it, yo" className="btn btn-big"><i className="glyphicon glyphicon-cog home-icon"></i><br/>Self service</a>
        </div>
        <div className='col-md-4 text-center'>
            <a href="http://portal.office.com/" target="_blank" type="button" title="Email, OneDrive, etc." className="btn btn-big"><i className="glyphicon glyphicon-th-large home-icon"></i><br/>Microsoft portal</a>
        </div>
    </div>
    </div>;
    }
}
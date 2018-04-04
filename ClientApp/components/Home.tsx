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
            <NavLink to={ '/' } type="button" className="btn btn-big">button</NavLink>
        </div>
        <div className='col-md-4 text-center'>
            <NavLink to={ '/' } type="button" className="btn btn-big">button</NavLink>
        </div>
        <div className='col-md-4 text-center'>
            <NavLink to={ '/' } type="button" className="btn btn-big">button</NavLink>
        </div>
        </div>
        </div>;
    }
}
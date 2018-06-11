import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

export class SelfService extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount () {
        window.scrollTo(0, 0)
    }
    public render() {
        return <div className="centered">
    </div>;
    }
}
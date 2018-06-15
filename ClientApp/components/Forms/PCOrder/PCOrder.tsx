import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';

export class PCOrder extends React.Component<RouteComponentProps<{}>, {}> {
    componentDidMount() {
        window.scrollTo(0, 0)

        // ping server
        fetch('/api/ping/pong', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data == 0) {
                    window.location.reload();
                }
            });

        // check to see if user is a dept liaison
        fetch('/api/userdata/equipment_check', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data == 0) {
                    // throw modal with 404 notice
                }
            });

    }

    public render() {
        return <div className="centered">
            <div className="row">
                <div className="col-md-10">
                    <h2>Order a new PC</h2>
                    <h4 className="form-h">complete all fields and submit</h4>
                    <hr />
                </div>
            </div>
        </div>;
    }
}
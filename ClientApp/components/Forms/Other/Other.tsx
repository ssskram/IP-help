import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import TextArea from '../FormElements/textarea'

export class Other extends React.Component<RouteComponentProps<{}>, {}> {
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
    }

    public render() {
        return <div className="centered">
            <div className="row">
                <div className="col-md-10">
                    <h2>Miscellaneous request</h2>
                    <hr />
                </div>
            </div>
            <div className="col-md-10">
                <TextArea header="Describe your request" placeholder="What can we help you with?" name="Body" />
            </div>
        </div>;
    }
}
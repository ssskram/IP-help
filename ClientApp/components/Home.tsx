import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export default class Home extends React.Component<any, any> {

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
        return <div>
        </div>;
    }
}
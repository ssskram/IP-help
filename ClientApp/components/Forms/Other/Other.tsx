import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import TextArea from '../FormElements/textarea'
import * as MessagesStore from '../../../store/messages';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';

type AllProps =
    MessagesStore.MessageState &
    typeof MessagesStore.actionCreators &
    RouteComponentProps<{}>;

export class Other extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            Body: '',
            redirect: false
        }
    }

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

    handleChildChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    post(event) {
        event.preventDefault()
        let self = this;
        let data = JSON.stringify({ Body: self.state.Body })
        this.setState({ Body: '' })
        fetch('/api/Forms/Other', {
            method: 'POST',
            body: data,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        this.props.success()
        this.setState({ redirect: true })
    }


    public render() {
        const { Body, redirect } = this.state
        const isEnabled =
            Body != '';

        if (redirect) {
            return <Redirect to='/' />;
        }

        return <div className="centered">
            <div className="row">
                <div className="col-md-10">
                    <h2>Miscellaneous request</h2>
                    <hr />
                </div>
            </div>
            <div className="col-md-10">
                <TextArea header="Describe your request" placeholder="What can we help you with?" name="Body" value={Body} callback={this.handleChildChange.bind(this)} />

                <div className="text-center">
                    <button disabled={!isEnabled} className="btn btn-success" onClick={this.post.bind(this)}>Submit</button>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.messages,
    MessagesStore.actionCreators
)(Other as any) as typeof Other;
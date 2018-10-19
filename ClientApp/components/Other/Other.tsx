import * as React from 'react';
import { Redirect } from 'react-router-dom';
import TextArea from '../FormElements/textarea'
import * as MessagesStore from '../../store/messages';
import * as Ping from '../../store/ping';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

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
        this.props.ping()
    }

    handleChildChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    post(event) {
        event.preventDefault()
        let self = this;
        let data = JSON.stringify({
            Body: self.state.Body
        })
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
            <div className="row text-center">
                <div className="col-md-12">
                    <h1>Miscellaneous request</h1>
                    <br />
                </div>
            </div>
            <div className="col-md-12">
                <div className="col-md-6 col-md-offset-3 panel panel-body">
                    <TextArea
                        header="Describe your request"
                        placeholder="What can we help you with?"
                        name="Body"
                        value={Body}
                        callback={this.handleChildChange.bind(this)}
                        required
                    />

                    <div className="text-center">
                        <button disabled={!isEnabled} className="btn btn-success" onClick={this.post.bind(this)}>Submit</button>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.ping
    }),
    ({
        ...MessagesStore.actionCreators,
        ...Ping.actionCreators
    })
)(Other as any) as typeof Other;
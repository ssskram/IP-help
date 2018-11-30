import * as React from 'react'
import { Redirect } from 'react-router-dom'
import TextArea from '../FormElements/textarea'
import Input from '../FormElements/input'
import * as MessagesStore from '../../store/messages';
import * as Ping from '../../store/ping'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'

export class Other extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            body: '',
            subject: '',
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
            body: self.state.body,
            subject: self.state.subject
        })
        this.setState({ body: '' })
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
        const { body, subject, redirect } = this.state
        const isEnabled =
            body != '' &&
            subject != ''

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
                    <Input
                        value={subject}
                        name="subject"
                        header="Subject"
                        placeholder="What's the issue?"
                        callback={this.handleChildChange.bind(this)}
                        required
                    />

                    <TextArea
                        header="Describe your request"
                        placeholder="How can we help you?"
                        name="body"
                        value={body}
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
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import * as MessagesStore from '../../../store/messages';
import * as Ping from '../../../store/ping';
import * as LiaisonsStore from '../../../store/equipmentLiaisons';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../store';

export class PCOrder extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        // check liaison status
        if (this.props.liaison == 0) {
            this.props.fourohfour()
            this.setState({ redirect: true })
        }

        // ping server
        this.props.ping()
    }

    handleChildChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChildSelect(event) {
        this.setState({ [event.name]: event.value });
    }

    post(event) {
        event.preventDefault()
        let self = this;
        let data = JSON.stringify({ Body: self.state.Body })
        this.setState({ Body: '' })
        fetch('/api/Forms/PCOrder', {
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
        // state
        const {
            redirect } = this.state
        // validate
        const isEnabled = false // sike

        if (redirect) {
            return <Redirect to='/' />;
        }

        return <div className="centered">
            <div className="row">
                <div className="col-md-10">
                    <h2>Order a new PC</h2>
                    <h4 className="form-h">complete all fields and submit</h4>
                    <hr />
                </div>
            </div>
            <div className="col-md-10">
                <div className="form-group">

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
        ...state.liaison,
        ...state.ping
    }),
    ({
        ...MessagesStore.actionCreators,
        ...LiaisonsStore.actionCreators,
        ...Ping.actionCreators
    })
)(PCOrder as any) as typeof PCOrder;
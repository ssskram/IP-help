import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Ping from '../../store/ping'
import * as User from '../../store/user'
import * as Messages from '../../store/messages'
import Fields from './fields'

export class equipmentPickup extends React.Component<any, any> {
    constructor() {
        super()
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        // ping server
        this.props.ping()
    }

    postSuccess() {
        this.props.success()
        this.redirect()
    }

    postFailure() {
        this.props.failure()
        this.redirect()
    }

    redirect() {
        this.setState({ redirect: true })
    }

    public render() {

        if (this.state.redirect) {
            return <Redirect push to={'/'} />
        }

        return <div className='centered'>
            <div className="row text-center">
                <div className="col-md-12">
                    <h1>Request equipment pickup</h1>
                    <h4 className="form-h">Dispose of unused IT equipment</h4>
                    <br />
                </div>
            </div>
            <Fields
                user={this.props.user}
                success={this.postSuccess.bind(this)}
                failure={this.postFailure.bind(this)} />
        </div>
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.ping,
        ...state.user,
        ...state.messages
    }),
    ({
        ...Ping.actionCreators,
        ...User.actionCreators,
        ...Messages.actionCreators
    })
)(equipmentPickup as any) as typeof equipmentPickup;
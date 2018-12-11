import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as User from '../../../store/user'
import * as Messages from '../../../store/messages'
import Fields from './fields'

export class equipmentPickup extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
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
        window.scrollTo(0, 0)

        if (this.state.redirect) {
            return <Redirect push to={'/'} />
        }

        return <div className='centered'>
            <div className="row text-center">
                <div className="col-md-12">
                    <h2>IT Equipment Disposal</h2>
                    <h4>We'll pick it up!</h4>
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
        ...state.user,
        ...state.messages
    }),
    ({
        ...User.actionCreators,
        ...Messages.actionCreators
    })
)(equipmentPickup)
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import Input from '../../formElements/input'
import Date from '../../formElements/cleave'
import * as MessagesStore from '../../../store/messages'
import * as User from '../../../store/user'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as types from '../../../store/types'
import Post from './post'
import SubmitButton from '../shared/submitButton'
import Header from '../shared/header'

type props = {
    user: types.user
    successMessage: () => void
    errorMessage: () => void
}

type state = {
    redirect: boolean
    userName: string
    destination: string
    dateLeave: string
    dateReturn: string
}

export class InternationalTravel extends React.Component<props, state> {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            userName: '',
            destination: '',
            dateLeave: '',
            dateReturn: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    async submit() {
        // data to post
        let load = {
            userName: this.state.userName,
            destination: this.state.destination,
            dateLeave: this.state.dateLeave,
            dateReturn: this.state.dateReturn,
        }
        // communicate success/failure
        let success = true
        success = await Post(load, this.props.user)
        if (success == true) {
            this.props.successMessage()
        } else {
            this.props.errorMessage()
        }
        // send 'em on home
        this.setState({ redirect: true })
    }


    public render() {
        const {
            redirect,
            userName,
            destination,
            dateLeave,
            dateReturn
        } = this.state

        const valid =
            userName != '' &&
            destination != '' &&
            dateLeave != '' &&
            dateReturn != ''

        if (redirect) {
            return <Redirect to='/' />
        }

        return <div className="centered">
            <Header
                mainText='Notify us of international travel'
                subText='Complete all fields and submit'
            />
            <div className="col-md-4 col-md-offset-4 panel">
                <div className='sectionHeader'>Travel information<span className='glyphicon glyphicon-globe pull-right'></span></div>
                <div className='panel-body'>
                    <Input
                        value={userName}
                        header="What is your name?"
                        placeholder="Name"
                        callback={e => this.setState({ userName: e.target.value })}
                        required
                    />
                    <Input
                        value={destination}
                        header="Where will you be traveling to?"
                        placeholder="Country, state, city"
                        callback={e => this.setState({ destination: e.target.value })}
                        required
                    />
                    <Date
                        value={dateLeave}
                        header="When will you be leaving?"
                        placeholder="Date of departure"
                        callback={date => this.setState({ dateLeave: date.target.value })}
                    />
                    <Date
                        value={dateReturn}
                        header="When will you be returning?"
                        placeholder="Date of return"
                        callback={date => this.setState({ dateReturn: date.target.value })}
                    />
                </div>
            </div>
            <SubmitButton
                isEnabled={valid}
                submit={this.submit.bind(this)}
            />
        </div>
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.user,
    }),
    ({
        ...MessagesStore.actionCreators,
        ...User.actionCreators,
    })
)(InternationalTravel as any)
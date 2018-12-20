import * as React from 'react'
import { Redirect } from 'react-router-dom'
import TextArea from '../../formElements/textarea'
import Input from '../../formElements/input'
import Select from '../../formElements/select'
import * as MessagesStore from '../../../store/messages'
import * as User from '../../../store/user'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as types from '../../../store/types'
import Post from './post'
import SubmitButton from '../shared/submitButton'
import Header from '../shared/header'
import * as Selects from './selects'

type props = {
    successMessage: () => void
    errorMessage: () => void
    user: types.user
}
type state = {
    deviceType: string
    newReplacement: any
    jobTitle: string
    jobDuties: string
    replacementExplanation: string
    redirect: boolean
}

export class MobileDevice extends React.Component<props, state> {
    constructor(props) {
        super(props);
        this.state = {
            deviceType: '',
            newReplacement: '',
            jobTitle: '',
            jobDuties: '',
            replacementExplanation: '',
            redirect: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    async submit() {
        // data to post
        let load = {
            jobTitle: this.state.jobTitle,
            deviceType: this.state.deviceType,
            newReplacement: this.state.newReplacement,
            jobDuties: this.state.jobDuties,
            replacementExplanation: this.state.replacementExplanation
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
            jobTitle,
            deviceType,
            newReplacement,
            jobDuties,
            replacementExplanation,
            redirect
        } = this.state

        const isEnabled =
            jobTitle != '' &&
            deviceType != '' &&
            newReplacement != '' &&
            (jobDuties != '' || replacementExplanation != '')

        if (redirect) {
            return <Redirect to='/' />
        }

        return <div className="centered">
            <Header
                mainText='Order a new mobile device'
                subText='Complete all fields and submit'
            />
            <div className="col-md-12">
                <div className="col-md-6 col-md-offset-3 panel panel-body">
                    <Select
                        value={deviceType}
                        header='What type of device do you need?'
                        placeholder='Select device type'
                        onChange={deviceType => this.setState({ deviceType })}
                        multi={false}
                        options={Selects.DeviceTypes}
                        required
                    />
                    <Select
                        value={newReplacement}
                        header='Is this request for a new or replacement mobile device?'
                        placeholder='New or replacement'
                        onChange={newReplacement => this.setState({ newReplacement })}
                        multi={false}
                        options={Selects.NeworReplacement}
                        required
                    />
                    <Input
                        value={jobTitle}
                        header="Please provide the employee's name & job title"
                        placeholder="Name & title"
                        callback={e => this.setState({ jobTitle: e.target.value })}
                        required
                    />
                    {newReplacement.value == 'New' &&
                        <TextArea
                            value={jobDuties}
                            header="Please explain how it will be used in relation to the employee's job duties"
                            placeholder="Explanation"
                            callback={e => this.setState({ jobDuties: e.target.value })}
                            required
                        />
                    }
                    {newReplacement.value == 'Replacement' &&
                        <TextArea
                            value={replacementExplanation}
                            header="Please explain why the old device needs to be replaced"
                            placeholder="Explanation"
                            callback={e => this.setState({ replacementExplanation: e.target.value })}
                            required
                        />
                    }
                </div>
                {isEnabled &&
                    <SubmitButton
                        submit={this.submit.bind(this)}
                    />
                }
            </div>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.user
    }),
    ({
        ...MessagesStore.actionCreators,
        ...User.actionCreators
    })
)(MobileDevice as any)
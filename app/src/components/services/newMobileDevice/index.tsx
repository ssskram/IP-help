import * as React from 'react'
import { Redirect } from 'react-router-dom'
import TextArea from '../../formElements/textarea'
import Input from '../../formElements/input'
import Select from '../../formElements/select'
import LiaisonCheck from '../shared/liaisonCheck'
import * as MessagesStore from '../../../store/messages'
import * as Liaisons from '../../../store/liaisons'
import * as User from '../../../store/user'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as types from '../../../store/types'
import Post from './post'
import SubmitButton from '../shared/submitButton'
import Header from '../shared/header'
import * as Selects from './selects'
import * as SharedSelects from '../shared/selects'

type props = {
    successMessage: () => void
    errorMessage: () => void
    liaisons: types.liaisons
    user: types.user
    accessDenied: (type: string) => void
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

        const valid =
            jobTitle != '' &&
            deviceType != '' &&
            newReplacement != '' &&
            (jobDuties != '' || replacementExplanation != '')

        if (redirect) {
            return <Redirect to='/' />
        }

        return <div className="centered">
            <LiaisonCheck
                itemType='mobile devices'
                user={this.props.user}
                liaisons={this.props.liaisons}
                accessDenied={this.props.accessDenied.bind(this)}
            />
            <Header
                mainText='Order a new mobile device'
                subText='Complete all fields and submit'
            />
            <div className="col-md-4 col-md-offset-4 panel" style={{ marginBottom: '100px' }}>
                <div className='sectionHeader'>Mobile device<span className='glyphicon glyphicon-phone pull-right'></span></div>
                <div className='panel-body'>
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
                        options={SharedSelects.NewReplacement}
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
            </div>
            {valid &&
                <SubmitButton
                    submit={this.submit.bind(this)}
                />
            }
        </div>
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.user,
        ...state.liaisons
    }),
    ({
        ...MessagesStore.actionCreators,
        ...User.actionCreators,
        ...Liaisons.actionCreators
    })
)(MobileDevice as any)
import * as React from 'react'
import { Redirect } from 'react-router-dom'
import TextArea from '../../formElements/textarea'
import Input from '../../formElements/input'
import FileUpload from '../../formElements/fileImport'
import * as MessagesStore from '../../../store/messages'
import * as User from '../../../store/user'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as types from '../../../store/types'
import Post from './post'
import SubmitButton from '../shared/submitButton'
import Header from '../shared/header'

type props = {
    successMessage: () => void
    errorMessage: () => void
    user: types.user
}
type state = {
    body: string
    subject: string
    redirect: boolean
    attachments: any[]
}

export class Other extends React.Component<props, state> {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            subject: '',
            attachments: [],
            redirect: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    async submit() {
        // data to post
        const load = {
            body: this.state.body,
            subject: this.state.subject,
            attachments: this.state.attachments
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
            body,
            subject,
            attachments,
            redirect
        } = this.state

        const valid =
            body != '' &&
            subject != ''


        if (redirect) {
            return <Redirect to='/' />
        }

        return <div className="centered">
            <Header
                mainText='Miscellaneous request'
            />
            <div className="col-md-4 col-md-offset-4 panel">
                <div className='sectionHeader'>Ticket information<span className='glyphicon glyphicon-info-sign pull-right'></span></div>
                <div className='panel-body'>
                    <Input
                        value={subject}
                        name="subject"
                        header="Subject"
                        placeholder="What's the issue?"
                        callback={e => this.setState({ subject: e.target.value })}
                        required
                    />
                    <TextArea
                        header="Describe your request"
                        placeholder="How can we help you?"
                        name="body"
                        value={body}
                        callback={e => this.setState({ body: e.target.value })}
                        required
                    />
                    <FileUpload
                        header={'Attach a file'}
                        attachments={attachments}
                        multi={false}
                        callback={this.setState.bind(this)}
                    />
                </div>
                {valid &&
                    <SubmitButton
                        submit={this.submit.bind(this)}
                    />
                }
            </div>
        </div >
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
)(Other as any)
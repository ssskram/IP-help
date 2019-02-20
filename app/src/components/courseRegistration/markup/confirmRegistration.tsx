import * as React from 'react'
import * as types from '../../../store/types'
import Modal from 'react-responsive-modal'
import Spinner from '../../utilities/spinner'

type props = {
    course: types.course
    registrationType: "Active" | "Waitlisted"
    setState: (stateObj: object) => void
    closeModal: () => void
}

type state = {
    submitting: boolean
}

export default class ConfirmRegistration extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            submitting: false
        }
    }

    submitRegistration() {
        // post here
        let self = this
        this.setState({
            submitting: true
        })
        setTimeout(
            function () {
                self.props.setState({
                    confirmRegistration: undefined,
                    registrationComplete: 'Success'
                })
            }, 3000)
    }

    public render() {
        return (
            <Modal
                open={true}
                onClose={() => this.props.closeModal()}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                <div className='text-center'>
                    <h3>Are you sure you want to<br />register for this course?</h3>
                    <div><b>Course name</b></div>
                    <div>{this.props.course.courseName}</div>
                    <div><b>Course start</b></div>
                    <div>{this.props.course.startDate}</div>
                    <div><b>Course end</b></div>
                    <div>{this.props.course.endDate}</div>
                    <br />
                    <button className={this.props.registrationType == "Active" ? 'btn btn-success' : 'btn btn-warning'} onClick={this.submitRegistration.bind(this)}>{this.props.registrationType == "Active" ? "Yes! Sign me up!" : "Yes! Add me to the waitlist!"}</button>
                    {this.state.submitting == true &&
                        <Spinner notice='...submitting your registration...' />
                    }
                </div>
            </Modal>
        )
    }
}
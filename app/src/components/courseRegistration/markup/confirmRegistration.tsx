import * as React from 'react'
import * as types from '../../../store/types'
import Modal from 'react-responsive-modal'

type props = {
    course: types.course
    setState: (stateObj: object) => void
}

export default class ConfirmRegistration extends React.Component<props, {}> {

    public render() {
        return (
            <Modal
                open={true}
                onClose={() => this.props.setState({ confirmRegistration: false, course: undefined })}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                <div className='text-center'>
                    <h3>Are you sure you want to register for this course?</h3>
                    <div><b>Course name</b></div>
                    <div>{this.props.course.courseName}</div>
                    <div><b>Course start</b></div>
                    <div>{this.props.course.startDate}</div>
                    <div><b>Course end</b></div>
                    <div>{this.props.course.endDate}</div>
                    <button className='btn btn-success'>Yes! Sign me up!</button>
                    <button className='btn btn-warning'>Yes! Add me to the waitlist!</button>
                </div>
            </Modal>
        )
    }
}
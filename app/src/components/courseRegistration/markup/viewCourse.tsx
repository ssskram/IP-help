import * as React from 'react'
import * as types from '../../../store/types'
import Modal from 'react-responsive-modal'

type props = {
    course: types.course
    courseRegistrations: types.courseRegistration[]
    setState: (stateObj: object) => void
}

export default class ViewCourse extends React.Component<props, {}> {

    componentDidMount() {
        console.log(this.props)
    }

    public render() {

        const enrollments = this.props.courseRegistrations.filter(reg => reg.courseCode == this.props.course.courseCode)
        const countActive = enrollments.filter(x => x.registrationStatus == "Active").length
        const countWaitlisted = enrollments.filter(x => x.registrationStatus == "Waitlisted").length

        return (
            <Modal
                open={true}
                onClose={() => this.props.setState({ viewCourse: false, course: undefined })}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                <div className='text-center'>
                    <h4 style={{ textTransform: 'uppercase' }}><b>{this.props.course.courseName}</b></h4>
                    <div><i>{this.props.course.courseDescription}</i></div>
                    <div><b>Course start</b></div>
                    <div>{this.props.course.startDate}</div>
                    <div><b>Course end</b></div>
                    <div>{this.props.course.endDate}</div>
                    <div><b>Maximum capacity</b></div>
                    <div>{this.props.course.maximumCapacity} eager learners</div>
                </div>
            </Modal>
        )
    }
}
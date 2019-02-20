import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as user from '../../store/user'
import * as courses from '../../store/courses'
import * as courseRegistrations from '../../store/courseRegistrations'

type props = {
    user: types.user
    courses: types.courses
    courseRegistrations: types.courseRegistrations
}

export class CourseRegistration extends React.Component<props, {}> {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    public render() {
        return (
            <div>Course Registrations</div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.courses,
        ...state.user,
        ...state.courseRegistrations
    }),
    ({
        ...courses.actionCreators,
        ...user.actionCreators,
        ...courseRegistrations.actionCreators
    })
)(CourseRegistration as any)
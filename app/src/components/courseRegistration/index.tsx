import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as user from '../../store/user'
import * as courses from '../../store/courses'
import * as courseRegistrations from '../../store/courseRegistrations'
import Spinner from '../utilities/spinner'
import Calendar from './markup/calendar'
import Header from './markup/header'

type props = {
    user: types.user
    courses: types.course[]
    courseRegistrations: types.courseRegistration[]
    loadCourses: () => void
    loadCourseRegistrations: () => void
}

export class CourseRegistration extends React.Component<props, {}> {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.loadCourses()
        this.props.loadCourseRegistrations()
    }

    public render() {
        return (
            <div className='col-md-8 col-md-offset-2'>
                <Header />
                <Calendar
                    courseRegistrations={this.props.courseRegistrations}
                    courses={this.props.courses}
                />
                {this.props.courses.length == 0 && this.props.courseRegistrations.length == 0 &&
                    <Spinner notice='...loading available courses...' />
                }
            </div>
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
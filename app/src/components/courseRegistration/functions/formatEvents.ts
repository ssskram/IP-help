import * as types from '../../../store/types'

export default function formatEvents (courses: types.course[]) {
    const events = courses.map(course => {
        return {
            start: new Date(course.startDate),
            end: new Date(course.endDate),
            title: course.courseName,
            description: course.courseDescription,
            code: course.courseCode,
        }
    })
    return events
}
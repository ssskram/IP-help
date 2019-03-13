import * as types from '../../../store/types'
const moment = require('moment')

export default function formatEvents (courses: types.course[]) {
    const events = courses.map(course => {
        return {
            start: new Date(moment(course.startDate, 'MM-DD-YYYY h:m A').format('YYYY-MM-DD HH:mm:ss')),
            end: new Date(moment(course.endDate, 'MM-DD-YYYY h:m A').format('YYYY-MM-DD HH:mm:ss')),
            title: course.courseName,
            id: course.courseId
        }
    })
    return events
}
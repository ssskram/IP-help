import * as React from 'react'
import * as types from '../../../store/types'
import ReactTable from "react-table"
import "react-table/react-table.css"
import * as moment from 'moment'

type props = {
    courses: types.course[]
    courseRegistrations: types.courseRegistration[]
    setState: (stateObj: object) => void
}

export default class Table extends React.Component<props, {}> {

    viewEvent(event) {
        this.props.setState ({
            viewCourse: true,
            course: this.props.courses.find(course => course.courseId == event.courseId)
        })
    }

    public render() {

        const columns = [{
            Header: '',
            accessor: 'startDate'
        }, {
            Header: 'Course',
            accessor: 'courseName'
        }, {
            Header: 'Capacity',
            accessor: 'maximumCapacity'
        },{
            Header: 'Enrolled',
            accessor: 'maximumCapacity'
        },{
            Header: 'Waitlisted',
            accessor: 'maximumCapacity'
        }, {
            Header: '',
            accessor: 'courseId',
            Cell: props => <button onClick={() => this.viewEvent(props.original)} className='btn btn-secondary' title='View course'><span className='glyphicon glyphicon-eye-open'></span></button>,
            maxWidth: 65
        }]

        return (
            <div className='text-center'>
                <br />
                <ReactTable
                    data={this.props.courses}
                    columns={columns}
                    loading={false}
                    minRows={0}
                    pageSize={20}
                    showPageSizeOptions={false}
                    noDataText=''
                    defaultSorted={[
                        {
                            id: moment('startDate'),
                            asc: true
                        }
                    ]}
                />
                <br />
                <br />
                <br />
            </div>
        )
    }
}
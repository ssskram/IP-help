import * as React from 'react'
import * as types from '../../../store/types'
import ReactTable from "react-table"
import "react-table/react-table.css"

type props = {
    waitlist: types.courseRegistration[]
}

const columns = [{
    Header: 'Waitlisted',
    accessor: 'user'
}]

export default class Waitlist extends React.Component<props, any> {

    public render() {
        return (
            <div className='text-center'>
                <br />
                <ReactTable
                    data={this.props.waitlist}
                    columns={columns}
                    loading={false}
                    minRows={0}
                    pageSize={20}
                    showPageSizeOptions={false}
                    showPagination={false}
                    noDataText=''
                />
            </div>
        )
    }
}
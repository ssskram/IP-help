import * as React from 'react'
import Select from '../../../formElements/select'
import Input from '../../../formElements/input'
import DatePicker from '../../../formElements/datepicker'
import * as Selects from './../selects'
import * as SharedSelects from '../../shared/selects'

export default class EmployeeInfo extends React.Component<any, any> {

    public render() {
        const {
            userName,
            department,
            userNetworkID,
            building,
            floor,
            employmentStatus,
            employmentType,
            employeeStartDate,
            computerNumber
        } = this.props.parentState

        const {
            setState
        } = this.props

        return <div className='col-md-4 col-md-offset-4 panel'>
            <div className='sectionHeader'>Employee's information<span className='glyphicon glyphicon-user pull-right'></span></div>
            <div className='panel-body'>
                <Input
                    value={userName}
                    header="Which employee will be receiving this machine?"
                    placeholder="If a shared device, just type 'Shared'"
                    callback={e => setState({ userName: e.target.value })}
                    required
                />
                <Select
                    value={department}
                    header="What is the employee's department?"
                    placeholder='Select department'
                    onChange={department => setState({ department })}
                    multi={false}
                    options={SharedSelects.Departments}
                    required
                />
                <Input
                    value={userNetworkID}
                    header="What is the employee's network ID?"
                    placeholder="Network ID"
                    callback={e => setState({ userNetworkID: e.target.value })}
                />
                <Input
                    value={building}
                    header="What is the employee's building?"
                    placeholder="Building name"
                    callback={e => setState({ building: e.target.value })}
                    required
                />
                <Input
                    value={floor}
                    header="Floor number?"
                    placeholder="Floor number"
                    callback={e => setState({ floor: e.target.value })}
                    required
                />
                <Select
                    value={employmentStatus}
                    header='Is this for a new employee, or an existing staff member?'
                    placeholder='New or existing employee'
                    onChange={employmentStatus => setState({ employmentStatus })}
                    multi={false}
                    options={Selects.EmploymentStatuses}
                    required
                />

                {employmentStatus.value == 'New' &&
                    <div>
                        <Select
                            value={employmentType}
                            header='Is this for a permanent employee, or intern?'
                            placeholder='Permanent employee or intern'
                            onChange={employmentType => setState({ employmentType })}
                            multi={false}
                            options={Selects.EmploymentTypes}
                            required
                        />
                        <DatePicker
                            value={employeeStartDate}
                            header='When is the start of their employement?'
                            name="employeeStartDate"
                            placeholder="Select a date"
                            callback={(date) => setState({ employeeStartDate: date })}
                            required
                        />
                    </div>
                }
                {employmentStatus.value == 'Existing' &&
                    <Input
                        value={computerNumber}
                        header="Enter the employee's current computer number"
                        placeholder="Computer number"
                        callback={e => setState({ computerNumber: e.target.value })}
                        required
                    />
                }
            </div>
        </div>
    }
}
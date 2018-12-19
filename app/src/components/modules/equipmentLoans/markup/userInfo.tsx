import * as React from 'react'
import Phone from '../../../formElements/phone'
import Select from '../../../formElements/select'
import Departments from '../../../utilities/departments'

export default class UserInfo extends React.Component<any, any> {

    public render() {
        const {
            phone,
            department
        } = this.props.parentState
        
        const {
            updateState
        } = this.props

        return <div className='col-md-6 col-md-offset-3 panel'>
            <div className='sectionHeader'>Your information</div>
            <div className='panel-body'>
                <Phone
                    value={phone}
                    header="Enter your phone number"
                    placeholder="Phone number"
                    callback={(phone) => updateState({ phone })}
                    required
                />

                <Select
                    value={department}
                    header="Select your department"
                    placeholder='Department'
                    onChange={department => updateState({ department })}
                    multi={false}
                    options={Departments.Departments}
                    required
                />
            </div>
        </div>
    }
}
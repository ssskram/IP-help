import * as React from 'react'
import Input from '../../../formElements/input'
import TextArea from '../../../formElements/textarea'
import Select from '../../../formElements/select'
import Phone from '../../../formElements/phone'
import * as SharedSelects from '../../shared/selects'

export default class pickupInformation extends React.Component<any, any> {

    public render() {
        const {
            department,
            primaryContact,
            secondaryContact,
            phoneNumber,
            locationEquipment
        } = this.props.parentState

        const {
            setState
        } = this.props

        return <div className='col-md-4 col-md-offset-4 panel'>
            <div className='sectionHeader'>Pickup information<span className='glyphicon glyphicon-map-marker pull-right'></span></div>
            <div className='panel-body'>
                <Select
                    value={department ? { value: department, label: department } : ''}
                    header='Department'
                    placeholder='Select department'
                    onChange={d => setState({ department: d.value })}
                    multi={false}
                    options={SharedSelects.Departments}
                    required
                />

                <Input
                    value={primaryContact}
                    header="Primary contact"
                    placeholder="First and last name"
                    callback={(e) => setState({ primaryContact: e.target.value })}
                    required
                />

                <Input
                    value={secondaryContact}
                    header="Secondary contact"
                    placeholder="First and last name"
                    callback={(e) => setState({ secondaryContact: e.target.value })}
                    required
                />

                <Phone
                    value={phoneNumber}
                    header="Enter your phone number"
                    placeholder="Phone number"
                    callback={e => setState({ phoneNumber: e })}
                    required
                />

                <TextArea
                    value={locationEquipment}
                    header="Location of equipment"
                    placeholder="Floor, room number, etc."
                    callback={(e) => setState({ locationEquipment: e.target.value })}
                    required
                />
            </div>
        </div>
    }
}

import * as React from 'react'
import Input from '../FormElements/input'
import TextArea from '../FormElements/textarea'
import Select from '../FormElements/select'
import Types from './equipmentTypes'

export default class equipmentPickup extends React.Component<any, any> {
    constructor() {
        super()
        this.state = {
            primaryContact: '',
            secondaryContact: '',
            phoneNumber: '',
            department: '',
            locationEquipment: '',
            quantityEquipment: 0,
            equipmentType: '',
            modelNumber: '',
            equipmentNumber: '',
            assetTagNumber: '',
            attachment: ''
        }
    }

    public render() {
        const {
            primaryContact,
            secondaryContact,
            phoneNumber,
            department,
            locationEquipment,
            quantityEquipment,
            equipmentType,
            modelNumber,
            equipmentNumber,
            assetTagNumber,
            attachment
        } = this.state

        return <div className='row'>
            <div className='col-md-6 col-md-offset-3 panel'>
                <div className='sectionHeader'>Equipment information</div>
                <div className='panel-body'>
                    <Select
                        value={equipmentType}
                        header='Equipment type'
                        placeholder='Select a type'
                        onChange={equipmentType => this.setState({ equipmentType })}
                        multi={true}
                        options={Types.equipmentTypes}
                        required
                    />
                </div>
            </div>
            <div className='col-md-6 col-md-offset-3 panel'>
                <div className='sectionHeader'>Pickup information</div>
                <div className='panel-body'>
                    <Select
                        value={equipmentType}
                        header='Equipment type'
                        placeholder='Select a type'
                        onChange={equipmentType => this.setState({ equipmentType })}
                        multi={true}
                        options={Types.equipmentTypes}
                        required
                    />
                </div>
            </div>
        </div>
    }
}

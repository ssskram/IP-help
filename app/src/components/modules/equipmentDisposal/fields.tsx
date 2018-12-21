import * as React from 'react'
import Input from '../../formElements/input'
import TextArea from '../../formElements/textarea'
import Select from '../../formElements/select'
import Number from '../../formElements/numbers'
import Phone from '../../formElements/phone'
import Types from './equipmentTypes'
import * as SharedSelects from '../shared/selects'
import postPickup from './post'
import Spinner from '../../utilities/spinner'
import UnsupportedItems from './unsupportedItems'
import ImageUploader from 'react-images-upload'

export default class equipmentPickup extends React.Component<any, any> {
    constructor(props) {
        super(props)
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
            image: [],
            spinner: false
        }
    }

    async post() {
        this.setState({ spinner: true })
        const success = await postPickup(this.state, this.props.user)
        if (success == true) this.props.success()
        else this.props.failure()
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
            image,
            spinner
        } = this.state

        let imgButton
        if (image.length == 0) {
            imgButton = { display: 'block' }
        } else {
            imgButton = { display: 'none' }
        }

        const isEnabled =
            primaryContact != '' &&
            secondaryContact != '' &&
            phoneNumber != '' &&
            department != '' &&
            locationEquipment != '' &&
            quantityEquipment != '' &&
            equipmentType != ''

        return <div className='col-md-12'>
            <div className='col-md-8 col-md-offset-2 panel'>
                <div className='sectionHeader'>Equipment information</div>
                <div className='panel-body'>
                    <Select
                        value={equipmentType}
                        header='Equipment type'
                        placeholder='You can select more than one'
                        onChange={equipmentType => this.setState({ equipmentType })}
                        multi={true}
                        options={Types.equipmentTypes}
                        required
                    />
                    <UnsupportedItems/>
                    
                    <Number
                        value={quantityEquipment}
                        header="Quantity of equipment"
                        prefix=""
                        callback={(e, m, f) => this.setState({ quantityEquipment: f })}
                        required
                    />

                    <TextArea
                        value={modelNumber}
                        header="Model numbers"
                        placeholder="Enter model numbers"
                        callback={(e) => this.setState({ modelNumber: e.target.value })}
                    />

                    <TextArea
                        value={equipmentNumber}
                        header="Equipment numbers"
                        placeholder="Enter equipment numbers"
                        callback={(e) => this.setState({ equipmentNumber: e.target.value })}
                    />

                    <TextArea
                        value={assetTagNumber}
                        header="Asset tags"
                        placeholder="Enter numbers on asset tags"
                        callback={(e) => this.setState({ assetTagNumber: e.target.value })}
                    />

                    <div className='col-md-12'>
                        <ImageUploader
                            buttonStyles={imgButton}
                            withIcon={true}
                            buttonText='Attach an image'
                            onChange={image => this.setState({ image })}
                            imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                            withLabel={false}
                            maxFileSize={5242880}
                            withPreview={true}
                            singleImage={true}
                        />
                    </div>
                </div>
            </div>
            <div className='col-md-8 col-md-offset-2 panel'>
                <div className='sectionHeader'>Pickup information</div>
                <div className='panel-body'>
                    <Select
                        value={department}
                        header='Department'
                        placeholder='Select department'
                        onChange={department => this.setState({ department })}
                        multi={false}
                        options={SharedSelects.Departments}
                        required
                    />

                    <Input
                        value={primaryContact}
                        header="Primary contact"
                        placeholder="First and last name"
                        callback={(e) => this.setState({ primaryContact: e.target.value })}
                        required
                    />

                    <Input
                        value={secondaryContact}
                        header="Secondary contact"
                        placeholder="First and last name"
                        callback={(e) => this.setState({ secondaryContact: e.target.value })}
                        required
                    />

                    <Phone
                        value={phoneNumber}
                        header="Enter your phone number"
                        placeholder="Phone number"
                        callback={e => this.setState({ phoneNumber: e })}
                        required
                    />

                    <TextArea
                        value={locationEquipment}
                        header="Location of equipment"
                        placeholder="Floor, room number, etc."
                        callback={(e) => this.setState({ locationEquipment: e.target.value })}
                        required
                    />

                    <div className='col-md-12 text-center'>
                        <button disabled={!isEnabled} onClick={this.post.bind(this)} className='btn btn-success'>Submit</button>
                    </div>
                    {spinner == true &&
                        <Spinner notice='...submitting your request...' />
                    }
                </div>
            </div>
        </div>
    }
}

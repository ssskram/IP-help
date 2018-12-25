import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as types from '../../../store/types'
import { ApplicationState } from '../../../store'
import * as User from '../../../store/user'
import Header from '../shared/header'
import * as Messages from '../../../store/messages'
import EquipmentInformation from './markup/equipmentInformation'
import PickupInformation from './markup/pickupInformation'
import postPickup from './post'
import SubmitButton from '../shared/submitButton'

type props = {
    successMessage: () => void
    errorMessage: () => void
    user: types.user
}

type state = {
    primaryContact: string
    secondaryContact: string
    phoneNumber: string,
    department: string,
    locationEquipment: string,
    quantityEquipment: number,
    equipmentType: string
    modelNumber: string,
    equipmentNumber: string
    assetTagNumber: string,
    image: Array<any>,
    redirect: boolean


}

export class equipmentPickup extends React.Component<props, state> {
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
            redirect: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    async submit() {
        // data to post
        const load = {
            equipmentType: this.state.equipmentType,
            quantityEquipment: this.state.quantityEquipment,
            modelNumber: this.state.modelNumber,
            equipmentNumber: this.state.equipmentNumber,
            assetTagNumber: this.state.assetTagNumber,
            locationEquipment: this.state.locationEquipment,
            primaryContact: this.state.primaryContact,
            secondaryContact: this.state.secondaryContact,
            phoneNumber: this.state.phoneNumber,
            department: this.state.department,
            image: this.state.image
        }
        // communicate success/failure
        let success = true
        success = await postPickup(load, this.props.user)
        if (success == true) {
            this.props.successMessage()
        } else {
            this.props.errorMessage()
        }
        // send 'em on home
        this.setState({ redirect: true })
    }

    public render() {
        const valid =
            this.state.primaryContact != '' &&
            this.state.secondaryContact != '' &&
            this.state.phoneNumber != '' &&
            this.state.department != '' &&
            this.state.locationEquipment != '' &&
            this.state.quantityEquipment != 0 &&
            this.state.equipmentType != ''

        if (this.state.redirect) {
            return <Redirect push to={'/'} />
        }

        return <div className='centered'>
            <Header
                mainText='IT Equipment Disposal'
                subText="We'll pick it up!"
            />
            <EquipmentInformation
                setState={this.setState.bind(this)}
                parentState={this.state}
            />
            <PickupInformation
                setState={this.setState.bind(this)}
                parentState={this.state}
            />
            {valid == true &&
                <SubmitButton
                    submit={this.submit.bind(this)}
                />
            }
        </div>
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user,
        ...state.messages
    }),
    ({
        ...User.actionCreators,
        ...Messages.actionCreators
    })
)(equipmentPickup as any)
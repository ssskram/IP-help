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
import postPickup from './post.js'
import SubmitButton from '../shared/submitButton'
import BulkOrSingle from './markup/bulkOrSingle'
import BulkOrder from './markup/bulkOrder'
import BackButton from './markup/backButton'

type props = {
    successMessage: () => void
    errorMessage: () => void
    user: types.user
}

type state = {
    bulk: boolean
    primaryContact: string
    secondaryContact: string
    phoneNumber: string,
    department: string,
    locationEquipment: string,
    equipmentType: string
    modelNumber: string,
    equipmentNumber: string
    assetTagNumber: string,
    attachment: Array<any>,
    redirect: boolean
}

export class equipmentPickup extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            bulk: false,
            primaryContact: '',
            secondaryContact: '',
            phoneNumber: '',
            department: '',
            locationEquipment: '',
            equipmentType: '',
            modelNumber: '',
            equipmentNumber: '',
            assetTagNumber: '',
            attachment: [],
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
            modelNumber: this.state.modelNumber,
            equipmentNumber: this.state.equipmentNumber,
            assetTagNumber: this.state.assetTagNumber,
            locationEquipment: this.state.locationEquipment,
            primaryContact: this.state.primaryContact,
            secondaryContact: this.state.secondaryContact,
            phoneNumber: this.state.phoneNumber,
            department: this.state.department,
            attachment: this.state.attachment
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
            this.state.equipmentType != ''

        if (this.state.redirect) {
            return <Redirect push to={'/'} />
        }

        return <div className='col-md-12' style={{ marginBottom: '100px' }}>
            <Header
                mainText='IT Equipment Disposal'
                subText="We'll pick it up!"
            />
            {this.state.bulk == undefined &&
                <BulkOrSingle setState={this.setState.bind(this)} />
            }
            {this.state.bulk == false &&
                <EquipmentInformation
                    setState={this.setState.bind(this)}
                    parentState={this.state}
                />
            }
            {this.state.bulk == true &&
                <BulkOrder
                    setState={this.setState.bind(this)}
                    attachment={this.state.attachment}
                />
            }
            {this.state.bulk != undefined &&
                <PickupInformation
                    setState={this.setState.bind(this)}
                    parentState={this.state}
                />
            }
            {/* {valid == false && this.state.bulk != undefined &&
                <BackButton setState={this.setState.bind(this)} />
            } */}
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
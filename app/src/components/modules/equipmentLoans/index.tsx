import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import * as types from '../../../store/types'
import * as Loans from '../../../store/equipmentLoan'
import * as Equipment from '../../../store/equipment'
import * as Messages from '../../../store/messages'
import * as User from '../../../store/user'
import * as moment from 'moment'
import * as shortID from 'shortid'
import { getAvailableEquipment } from './availableItems'
import postOTRS from './postOTRS'
import postSP from './postSP'
import SelectTimeSpan from './markup/selectTimeSpan'
import UserInfo from './markup/userInfo'
import SelectEquipment from './markup/selectEquipment'
import SelectAccessories from './markup/selectAccessories'
import SubmitButton from './markup/submitButton'
import Header from './markup/header'

type props = {
    loans: types.equipmentLoans
    equipment: types.equipment
    messages: types.messsage
    user: types.user
    loadEquipment: () => void
    loadEquipmentLoans: () => void
    reservationConfirmation: (message: string) => void
}

type state = {
    reservationID: string
    department: string
    phone: string
    items: types.equipmentItem[]
    fromDate: string
    fromTime: string
    toDate: string
    toTime: string
    throwTimeError: boolean
    selectedTypes: string[]
    availableItems: types.equipmentItem[]
    redirect: boolean
}

export class EquipmentReservations extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            reservationID: shortID.generate(),
            department: '',
            phone: '',
            items: [],
            fromDate: '',
            fromTime: '',
            toDate: '',
            toTime: '',
            throwTimeError: false,
            selectedTypes: [],
            availableItems: [],
            redirect: false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.loadEquipment()
        this.props.loadEquipmentLoans()
    }

    checkTimeFrame() {
        // calculate span in hours
        const hours = moment.duration(moment(this.state.toDate + ' ' + this.state.toTime).diff(moment(this.state.fromDate + ' ' + this.state.fromTime))).asHours()
        // if desired time frame is greater than 72 hours
        if (hours > 72) {
            // clear fields, throw error
            this.setState({ toTime: '', throwTimeError: true })
        } else {
            // calculate available items
            this.setState({ throwTimeError: false, availableItems: getAvailableEquipment(this.state, this.props.equipment, this.props.loans) })
        }
    }

    addRemoveItem(type, flavor) {
        // manages state arrays of selectedTypes and items
        const {
            selectedTypes,
            availableItems,
            items
        } = this.state

        if (!selectedTypes.includes(type)) { // add item
            // get an item of corresponding item type
            const item: any = availableItems.find(item => item.itemType == type || item.item == type)
            // add item to state, and add type to selectedTypes for reference
            this.setState({
                selectedTypes: [...this.state.selectedTypes, type],
                items: [...this.state.items, item]
            })
        } else { // remove item
            // filter out item & item type from existing state arrays
            const filteredTypes = selectedTypes.filter(item => item != type)
            let filteredItems = [] as any
            if (flavor == 'Accessory') {
                filteredItems = items.filter(item => item.item != type)
            } else {
                filteredItems = items.filter(item => item.itemType != type)
            }
            // set filtered arrays to state
            this.setState({ selectedTypes: filteredTypes, items: filteredItems })
        }
    }

    submit(event) {
        event.preventDefault()
        const load = {
            reservationID: this.state.reservationID,
            department: this.state.department,
            phone: this.state.phone,
            from: this.state.fromDate + ' ' + this.state.fromTime,
            to: this.state.toDate + ' ' + this.state.toTime,
            items: this.state.items,
            types: this.state.selectedTypes
        }
        postSP(load, this.props.user)
        postOTRS(load, this.props.user)
        this.props.reservationConfirmation('Success!<br/>Your reservation ID is ' + this.state.reservationID + '<br/>Please bring your reservation ID when picking up your equipment')
        this.setState({ redirect: true })
    }

    public render() {
        const showTimespan =
            this.state.phone != '' &&
            this.state.department != ''

        const showEquipment =
            this.state.fromDate != '' &&
            this.state.fromTime != '' &&
            this.state.toDate != '' &&
            this.state.toTime != '' &&
            this.state.toTime != null &&
            this.state.throwTimeError != true

        const showAccessories =
            this.state.items.length > 0

        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        return (
            <div style={{ marginBottom: '100px' }} className='centered'>
                <Header />
                <div className='col-md-12'>
                    <UserInfo
                        parentState={this.state}
                        setState={this.setState.bind(this)}
                    />
                    {showTimespan == true &&
                        <SelectTimeSpan
                            fromDate={this.state.fromDate}
                            fromTime={this.state.fromTime}
                            toDate={this.state.toDate}
                            toTime={this.state.toTime}
                            throwTimeError={this.state.throwTimeError}
                            setState={this.setState.bind(this)}
                            checkTimeFrame={this.checkTimeFrame.bind(this)}
                        />
                    }
                    {showEquipment == true &&
                        <SelectEquipment
                            parentState={this.state}
                            addRemoveItem={this.addRemoveItem.bind(this)}
                        />
                    }
                    {showAccessories == true &&
                        <div>
                            <SelectAccessories
                                parentState={this.state}
                                addRemoveItem={this.addRemoveItem.bind(this)}
                            />
                            <SubmitButton
                                submit={this.submit.bind(this)}
                            />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.loans,
        ...state.messages,
        ...state.equipment,
        ...state.user
    }),
    ({
        ...Loans.actionCreators,
        ...Messages.actionCreators,
        ...Equipment.actionCreators,
        ...User.actionCreators
    })
)(EquipmentReservations as any)
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
import { getAvailableEquipment } from './functions/availableItems'
import postOTRS from './functions/postOTRS'
import postSP from './functions/postSP'
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

export class EquipmentReservations extends React.Component<props, any> {
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
        this.checkTimeFrame = this.checkTimeFrame.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.loadEquipment()
        this.props.loadEquipmentLoans()
    }

    updateState(stateChange, callBack) {
        this.setState(stateChange), function (this) {
            if (callBack) callBack
            this.checkTimeFrame()
        }
    }

    addRemoveItem(type, flavor) {
        const {
            selectedTypes,
            availableItems,
            items
        } = this.state

        if (!selectedTypes.includes(type)) {
            const item = availableItems.find(item => item.itemType == type || item.item == type)
            this.updateState({ selectedTypes: [...this.state.selectedTypes, type], items: [...this.state.items, item] }, null)
        } else {
            const filteredTypes = selectedTypes.filter(item => item != type)
            let filteredItems = [] as any
            if (flavor == 'Accessory') {
                filteredItems = items.filter(item => item.item != type)
            } else {
                filteredItems = items.filter(item => item.itemType != type)
            }
            this.updateState({ selectedTypes: filteredTypes, items: filteredItems }, null)
        }
    }

    checkTimeFrame() {
        console.log('here yo')
        if (this.state.fromDate != '' && this.state.fromTime != '' && this.state.toDate != '' && this.state.toTime != '') {
            const hours = moment.duration(moment(this.state.to).diff(moment(this.state.from))).asHours()
            // if desired time frame is greater than 72 hours
            if (hours > 72) { 
                // clear fields, throw error
                this.updateState({ toTime: null, toDate: null, throwTimeError: true }, null)
            } else {
                // calculate available items
                this.updateState({ throwTimeError: false, availableItems: getAvailableEquipment(this.state, this.props.equipment, this.props.loans) }, null)
            }
        }
    }

    submit(event) {
        event.preventDefault()
        const load = {
            reservationID: this.state.reservationID,
            department: this.state.Department,
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
                        updateState={this.updateState.bind(this)}
                    />
                    {showTimespan == true &&
                        <SelectTimeSpan
                            parentState={this.state}
                            updateState={this.updateState.bind(this)}
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
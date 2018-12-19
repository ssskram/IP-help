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
            from: '',
            toDate: '',
            toTime: '',
            to: '',
            throwTimeError: false,
            selectedTypes: [],
            availableItems: [],
            redirect: false
        }
        this.setDateTime = this.setDateTime.bind(this)
        this.checkTimeFrame = this.checkTimeFrame.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.loadEquipment()
        this.props.loadEquipmentLoans()
    }

    updateState(stateObject, callBack) {
        this.setState(stateObject), function (this) {
            if (callBack) callBack
        }
    }

    addRemoveItem(type, flavor) {
        const {
            selectedTypes,
            availableItems,
            items
        } = this.state

        if (!selectedTypes.includes(type)) {
            const item = availableItems.find(item => {
                return item.itemType == type || item.item == type
            })
            this.updateState({ selectedTypes: [...this.state.selectedTypes, type], items: [...this.state.items, item] }, null)
        } else {
            const filteredTypes = selectedTypes.filter(item => {
                return item != type
            })
            let filteredItems = [] as any
            if (flavor == 'Accessory') {
                filteredItems = items.filter(item => {
                    return item.item != type
                })
            } else {
                filteredItems = items.filter(item => {
                    return item.itemType != type
                })
            }
            this.updateState({ selectedTypes: filteredTypes, items: filteredItems }, null)
        }
    }

    setDateTime(name) {
        if (name.includes('from')) {
            this.updateState({ from: this.state.fromDate + ' ' + this.state.fromTime, }, this.checkTimeFrame())
        } else {
            this.updateState({ to: this.state.toDate + ' ' + this.state.toTime }, this.checkTimeFrame())
        }
    }

    checkTimeFrame() {
        if (this.state.fromDate != '' && this.state.fromTime != '' && this.state.toDate != '' && this.state.toTime != '') {
            const from = moment(this.state.from)
            const to = moment(this.state.to)
            var duration = moment.duration(to.diff(from));
            var hours = duration.asHours();
            if (hours > 72) {
                this.updateState({ toTime: null, to: '', throwTimeError: true }, null)
            } else {
                this.updateState({ throwTimeError: false, availableItems: getAvailableEquipment(this.state.from, this.state.to, this.props.equipment, this.props.loans) }, null)
            }
        }
    }

    submit(event) {
        event.preventDefault()
        const load = {
            reservationID: this.state.reservationID,
            department: this.state.Department,
            phone: this.state.phone,
            from: this.state.from,
            to: this.state.to,
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
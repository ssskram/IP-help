import * as React from 'react'
import { Redirect } from 'react-router-dom'
import * as Reservations from '../../store/reservations'
import * as Equipment from '../../store/equipment'
import * as MessagesStore from '../../store/messages'
import * as User from '../../store/user'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import Input from '../FormElements/input'
import Phone from './../FormElements/phone'
import DatePicker from './../FormElements/datepicker'
import * as moment from 'moment'
import Select from '../FormElements/select'
import Departments from '../Departments'
import TimePicker from './../FormElements/timepicker'
import * as shortID from 'shortid'
import { checkAvailability, getAvailableEquipment } from './AvailableItems'
import postOTRS from './postOTRS'

const laptop = require('./../../images/laptop.png')
const tablet = require('./../../images/tablet.png')
const speakers = require('./../../images/speakers.png')
const projector = require('./../../images/projector.png')

const imgSize = {
    height: '50px',
    margin: '10px'
}

const clicked = {
    backgroundColor: '#5cb85c',
    borderColor: '#5cb85c'
}

const unclicked = {
    backgroundColor: '#337ab7',
    borderColor: '#2e6da4'
}

export class EquipmentReservations extends React.Component<any, any> {
    constructor() {
        super()
        this.state = {
            reservationID: shortID.generate(),
            networkID: '',
            Department: '',
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
        this.props.loadReservations()
    }

    handlePhone(number) {
        this.setState({
            phone: number
        })
    }

    handleChildChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChildSelect(event) {
        this.setState({ [event.name]: event.value });
    }

    handleDate(date, name) {
        if (date) {
            this.setState({
                [name]: moment(date).format('MM/DD/YYYY')
            }, function (this) {
                this.setDateTime(name)
            })
        } else {
            this.setState({
                [name]: null
            });
        }

    }

    handleTime(time, name) {
        if (time) {
            this.setState({
                [name]: moment(time).format('h:mm A')
            }, function (this) {
                this.setDateTime(name)
            })
        } else {
            this.setState({
                [name]: null
            })
        }
    }

    setDateTime(name) {
        if (name.includes('from')) {
            this.setState({
                from: this.state.fromDate + ' ' + this.state.fromTime,
            }, function (this) {
                this.checkTimeFrame()
            })
        } else { //
            this.setState({
                to: this.state.toDate + ' ' + this.state.toTime
            }, function (this) {
                this.checkTimeFrame()
            })
        }
    }

    checkTimeFrame() {
        if (this.state.fromDate != '' && this.state.fromTime != '' && this.state.toDate != '' && this.state.toTime != '') {
            const from = moment(this.state.from)
            const to = moment(this.state.to)
            var duration = moment.duration(to.diff(from));
            var hours = duration.asHours();
            if (hours > 72) {
                this.setState({
                    toDate: '',
                    toTime: '',
                    to: '',
                    throwTimeError: true
                })
            } else {
                this.setState({
                    throwTimeError: false,
                    availableItems: getAvailableEquipment(this.state.from, this.state.to, this.props.equipment, this.props.reservations)
                })
            }
        }
    }

    addRemoveItem(type, flavor) {
        if (!this.state.selectedTypes.includes(type)) {
            const item = this.state.availableItems.find(item => {
                return item.itemType == type || item.item == type
            })
            this.setState({
                selectedTypes: [...this.state.selectedTypes, type],
                items: [...this.state.items, item]
            })
        } else {
            const filteredTypes = this.state.selectedTypes.filter(item => {
                return item != type
            })
            let filteredItems = [] as any
            if (flavor == 'Accessory') {
                filteredItems = this.state.items.filter(item => {
                    return item.item != type
                })
            } else {
                filteredItems = this.state.items.filter(item => {
                    return item.itemType != type
                })
            }
            this.setState({
                selectedTypes: filteredTypes,
                items: filteredItems
            })
        }
    }

    submit(event) {
        event.preventDefault()
        const load = {
            reservationID: this.state.reservationID,
            networkID: this.state.networkID,
            department: this.state.Department,
            phone: this.state.phone,
            from: this.state.from,
            to: this.state.to,
            items: this.state.items,
            types: this.state.selectedTypes
        }
        fetch('/api/equipmentReservation/postReservation', {
            method: 'POST',
            body: JSON.stringify(load),
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        postOTRS(load, this.props.user)
        this.props.reservation('Success!<br/>Your reservation ID is ' + this.state.reservationID + '<br/>Please bring your reservation ID when picking up your equipment')
        this.setState({ redirect: true })
    }

    public render() {
        const {
            networkID,
            Department,
            phone,
            fromDate,
            items,
            fromTime,
            from,
            toDate,
            toTime,
            to,
            throwTimeError,
            selectedTypes,
            redirect,
            availableItems
        } = this.state

        const showTimespan =
            networkID != '' &&
            phone != '' &&
            Department != ''

        const showEquipment =
            fromDate != '' &&
            fromTime != '' &&
            toDate != '' &&
            toTime != '' &&
            toTime != null &&
            throwTimeError != true

        const showAccessories =
            items.length > 0

        if (redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div className='centered'>
                <div className="row text-center">
                    <div className="col-md-12">
                        <h1>Borrow equipment</h1>
                        <h4>complete all fields and submit</h4>
                        <br />
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='col-md-6 col-md-offset-3 panel'>
                        <div className='sectionHeader'>Your information</div>
                        <div className='panel-body'>

                            <Input
                                value={networkID}
                                name="networkID"
                                header="Enter your network ID"
                                placeholder="Network ID"
                                callback={this.handleChildChange.bind(this)}
                                required
                            />

                            <Phone
                                value={phone}
                                name="phone"
                                header="Enter your phone number"
                                placeholder="Phone number"
                                callback={this.handlePhone.bind(this)}
                                required
                            />

                            <Select
                                value={Department}
                                name="Department"
                                header="Select your department"
                                placeholder='Department'
                                onChange={this.handleChildSelect.bind(this)}
                                multi={false}
                                options={Departments.Departments}
                                required
                            />
                        </div>
                    </div>
                    {showTimespan == true &&
                        <div className='col-md-6 col-md-offset-3 panel'>
                            <div className='sectionHeader'>Timeframe</div>
                            <div className='panel-body'>
                                {throwTimeError == true &&
                                    <div role="alert" className="alert alert-danger text-center">
                                        For loans longer than 72 hours, please call the Help Desk at 255-2900
                                    </div>
                                }
                                <h4 style={{ paddingLeft: '35px' }}>Picking up <b>{from}</b></h4>
                                <div className='col-md-6'>
                                    <DatePicker
                                        value={fromDate}
                                        name="fromDate"
                                        placeholder="Select a date"
                                        callback={(value) => this.handleDate(value, 'fromDate')}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <TimePicker
                                        value={fromTime}
                                        name="fromTime"
                                        placeholder="Select a time"
                                        callback={(value) => this.handleTime(value, 'fromTime')}
                                    />
                                </div>
                                <h4 style={{ paddingLeft: '35px' }}>Returning <b>{to}</b></h4>
                                <div className='col-md-6'>
                                    <DatePicker
                                        value={toDate}
                                        name="toDate"
                                        placeholder="Select a date"
                                        callback={(value) => this.handleDate(value, 'toDate')}
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <TimePicker
                                        value={toTime}
                                        name="toTime"
                                        placeholder="Select a time"
                                        callback={(value) => this.handleTime(value, 'toTime')}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    {showEquipment == true &&
                        <div className='col-md-6 col-md-offset-3 panel'>
                            <div className='sectionHeader'>Select equipment</div>
                            <div className='panel-body'>
                                <div role="alert" className="alert alert-info text-center">
                                    If you don't see what you're looking for, it may be out of stock during this timeframe.  Please contact the Help Desk at 255-2900 for further assistance.
                                </div>
                                <div className='row text-center'>
                                    {checkAvailability('Laptop', availableItems, 'Equipment') &&
                                        <button onClick={() => this.addRemoveItem('Laptop', 'Equipment')} style={(selectedTypes.includes('Laptop')) ? clicked : unclicked} className='btn btn-big btn-primary'>
                                            <div className='col-md-12'>
                                                <img style={imgSize} src={laptop as string} />
                                            </div>
                                            Laptop
                                        </button>
                                    }
                                    {checkAvailability('Surface', availableItems, 'Equipment') &&
                                        <button onClick={() => this.addRemoveItem('Surface', 'Equipment')} style={(selectedTypes.includes('Surface')) ? clicked : unclicked} className='btn btn-big btn-primary'>
                                            <div className='col-md-12'>
                                                <img style={imgSize} src={tablet as string} />
                                            </div>
                                            Surface Tablet
                                        </button>
                                    }
                                    {checkAvailability('Portable Projector', availableItems, 'Equipment') &&
                                        <button onClick={() => this.addRemoveItem('Portable Projector', 'Equipment')} style={(selectedTypes.includes('Portable Projector')) ? clicked : unclicked} className='btn btn-big btn-primary'>
                                            <div className='col-md-12'>
                                                <img style={imgSize} src={projector as string} />
                                            </div>
                                            Projector
                                        </button>
                                    }
                                    {checkAvailability('Desktop Speakers', availableItems, 'Equipment') &&
                                        <button onClick={() => this.addRemoveItem('Desktop Speakers', 'Equipment')} style={(selectedTypes.includes('Desktop Speakers')) ? clicked : unclicked} className='btn btn-big btn-primary'>
                                            <div className='col-md-12'>
                                                <img style={imgSize} src={speakers as string} />
                                            </div>
                                            Desktop Speakers
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    {showAccessories == true &&
                        <div>
                            <div className='col-md-6 col-md-offset-3 panel'>
                                <div className='sectionHeader'>Select accessories</div>
                                <div className='panel-body text-center'>
                                    {checkAvailability('Portable Projector Screen', availableItems, 'Accessory') &&
                                        <button className='btn btn-big btn-primary' onClick={() => this.addRemoveItem('Portable Projector Screen', 'Accessory')} style={(selectedTypes.includes('Portable Projector Screen')) ? clicked : unclicked}>
                                            Portable Projector Screen
                                        </button>
                                    }
                                    {checkAvailability('VGA Cable', availableItems, 'Accessory') &&
                                        <button className='btn btn-big btn-primary' onClick={() => this.addRemoveItem('VGA Cable', 'Accessory')} style={(selectedTypes.includes('VGA Cable')) ? clicked : unclicked}>
                                            VGA Cable
                                        </button>
                                    }
                                    {checkAvailability('HDMI Cable', availableItems, 'Accessory') &&
                                        <button className='btn btn-big btn-primary' onClick={() => this.addRemoveItem('HDMI Cable', 'Accessory')} style={(selectedTypes.includes('HDMI Cable')) ? clicked : unclicked}>
                                            HDMI Cable
                                        </button>
                                    }
                                    {checkAvailability('Clicker', availableItems, 'Accessory') &&
                                        <button className='btn btn-big btn-primary' onClick={() => this.addRemoveItem('Clicker', 'Accessory')} style={(selectedTypes.includes('Clicker')) ? clicked : unclicked}>
                                            Clicker
                                        </button>
                                    }
                                    {checkAvailability('Long Extension Cord', availableItems, 'Accessory') &&
                                        <button className='btn btn-big btn-primary' onClick={() => this.addRemoveItem('Long Extension Cord', 'Accessory')} style={(selectedTypes.includes('Long Extension Cord')) ? clicked : unclicked}>
                                            Long Extension Cord
                                        </button>
                                    }
                                    {checkAvailability('VDI to USB Adapter', availableItems, 'Accessory') &&
                                        <button className='btn btn-big btn-primary' onClick={() => this.addRemoveItem('VDI to USB Adapter', 'Accessory')} style={(selectedTypes.includes('VDI to USB Adapter')) ? clicked : unclicked}>
                                            VDI to USB Adapter
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className='col-md-6 col-md-offset-3 panel'>
                                <div className='panel-body text-center'>
                                    <h3>Please review all information before submitting.</h3>
                                    <button onClick={this.submit.bind(this)} className='btn btn-success'>Submit</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className='col-md-12'>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.reservations,
        ...state.messages,
        ...state.equipment,
        ...state.user
    }),
    ({
        ...Reservations.actionCreators,
        ...MessagesStore.actionCreators,
        ...Equipment.actionCreators,
        ...User.actionCreators
    })
)(EquipmentReservations as any) as typeof EquipmentReservations;
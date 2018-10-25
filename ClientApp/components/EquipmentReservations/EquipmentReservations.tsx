import * as React from 'react'
import * as Reservations from '../../store/reservations'
import * as Equipment from '../../store/equipment'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import Input from '../FormElements/input'
import Phone from './../FormElements/phone'
import DatePicker from './../FormElements/datepicker'
import * as moment from 'moment'
import Select from '../FormElements/select'
import Departments from '../Departments'
import TimePicker from './../FormElements/timepicker'

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
            availableItems: []
        }
        this.setDateTime = this.setDateTime.bind(this)
        this.checkTimeFrame = this.checkTimeFrame.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0,0)
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
                from: this.state.fromDate + ' ' + this.state.fromTime
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
            if (hours > 36) {
                this.setState({
                    toDate: '',
                    toTime: '',
                    to: '',
                    throwTimeError: true
                })
            } else {
                this.setState({
                    throwTimeError: false
                })
            }
        }
    }

    addRemoveItem(type) {
        if (!this.state.selectedTypes.includes(type)) {
            // select item from equipment here, and add to state[] items
            const item = this.props.equipment.find(item => {
                return item.itemType == type || item.item == type
            })
            this.setState({
                selectedTypes: [...this.state.selectedTypes, type],
                items: [...this.state.items, item]
            })
        } else {
            let filteredArray = this.state.selectedTypes.filter(item => {
                return item != type
            })
            this.setState({
                selectedTypes: filteredArray
            })
        }
    }

    submit () {
        const load = {
            networkID: this.state.networkID,
            department: this.state.Department,
            phone: this.state.phone,
            from: this.state.from,
            to: this.state.to,
            items: this.state.items,
            types: this.state.selectedTypes
        }
        console.log(load)
    }

    public render() {
        const {
            networkID,
            Department,
            phone,
            fromDate,
            fromTime,
            from,
            toDate,
            toTime,
            to,
            throwTimeError,
            selectedTypes
        } = this.state

        const showTimespan = true
        // networkID != '' &&
        // phone != '' &&
        // Department != ''

        const showEquipment = true
        // fromDate != '' &&
        // fromTime != '' &&
        // toDate != '' &&
        // toTime != '' &&
        // toTime != null &&
        // throwTimeError != true

        const showAccessories = true
        // items.length > 0

        return (
            <div className='centered'>
                <div className="row text-center">
                    <div className="col-md-12">
                        <h1>Rent equipment</h1>
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
                                        For rentals longer than 36 hours, please call the Help Desk at 255-2900
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
                                    If you don't see what you're looking for, it may already be reserved for this timeframe.  Please contact the Help Desk at 255-2900 for further assistance.
                                </div>
                                <div className='row text-center'>
                                    <button onClick={() => this.addRemoveItem('Laptop')} style={(selectedTypes.includes('Laptop')) ? clicked : unclicked} className='btn btn-big btn-primary'>
                                        <div className='col-md-12'>
                                            <img style={imgSize} src={laptop as string} />
                                        </div>
                                        Laptop
                                    </button>
                                    <button onClick={() => this.addRemoveItem('Surface')} style={(selectedTypes.includes('Surface')) ? clicked : unclicked} className='btn btn-big btn-primary'>
                                        <div className='col-md-12'>
                                            <img style={imgSize} src={tablet as string} />
                                        </div>
                                        Surface Tablet
                                    </button>
                                    <button onClick={() => this.addRemoveItem('Portable Projector')} style={(selectedTypes.includes('Portable Projector')) ? clicked : unclicked} className='btn btn-big btn-primary'>
                                        <div className='col-md-12'>
                                            <img style={imgSize} src={projector as string} />
                                        </div>
                                        Projector
                                    </button>
                                    <button onClick={() => this.addRemoveItem('Desktop Speakers')} style={(selectedTypes.includes('Desktop Speakers')) ? clicked : unclicked} className='btn btn-big btn-primary'>
                                        <div className='col-md-12'>
                                            <img style={imgSize} src={speakers as string} />
                                        </div>
                                        Desktop Speakers
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    {showAccessories == true &&
                        <div>
                            <div className='col-md-6 col-md-offset-3 panel'>
                                <div className='sectionHeader'>Select accessories</div>
                                <div className='panel-body text-center'>
                                    <button className='btn btn-big btn-primary' onClick={() => this.addRemoveItem('Portable Projector Screen')} style={(selectedTypes.includes('Portable Projector Screen')) ? clicked : unclicked}>
                                        Portable Projector Screen
                                    </button>
                                    <button className='btn btn-big btn-primary' onClick={() => this.addRemoveItem('VGA Cable')} style={(selectedTypes.includes('VGA Cable')) ? clicked : unclicked}>
                                        VGA Cable
                                    </button>
                                    <button className='btn btn-big btn-primary' onClick={() => this.addRemoveItem('HDMI Cable')} style={(selectedTypes.includes('HDMI Cable')) ? clicked : unclicked}>
                                        HDMI Cable
                                    </button>
                                    <button className='btn btn-big btn-primary' onClick={() => this.addRemoveItem('Clicker')} style={(selectedTypes.includes('Clicker')) ? clicked : unclicked}>
                                        Clicker
                                    </button>
                                    <button className='btn btn-big btn-primary' onClick={() => this.addRemoveItem('Long Extension Cord')} style={(selectedTypes.includes('Long Extension Cord')) ? clicked : unclicked}>
                                        Long Extension Cord
                                    </button>
                                    <button className='btn btn-big btn-primary' onClick={() => this.addRemoveItem('VDI to USB Adapter')} style={(selectedTypes.includes('VDI to USB Adapter')) ? clicked : unclicked}>
                                        VDI to USB Adapter
                                    </button>
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
        ...state.equipment
    }),
    ({
        ...Reservations.actionCreators,
        ...Equipment.actionCreators
    })
)(EquipmentReservations as any) as typeof EquipmentReservations;
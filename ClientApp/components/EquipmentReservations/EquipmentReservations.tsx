import * as React from 'react'
import * as Reservations from '../../store/reservations'
import * as Equipment from '../../store/equipment'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import Input from '../FormElements/input'
import TextArea from '../FormElements/textarea'
import Phone from './../FormElements/phone'
import DatePicker from './../FormElements/datepicker'
import * as moment from 'moment'
import Select from '../FormElements/select'
import Departments from '../Departments'
import TimePicker from './../FormElements/timepicker'

export class EquipmentReservations extends React.Component<any, any> {
    constructor() {
        super()
        this.state = {
            reservationID: '',
            networkID: '',
            Department: '',
            phone: '',
            item: '',
            itemID: '',
            assetNumber: '',
            fromDate: '',
            fromTime: '',
            from: '',
            toDate: '',
            toTime: '',
            to: '',
        }
    }

    componentDidMount() {
        this.props.loadEquipment()
        this.props.loadReservations()
    }

    handlePhone(number) {
        this.setState({
            phone: number
        })
    }

    handleChildSelect(event) {
        this.setState({ [event.name]: event.value });
    }

    handleChangeStart(date) {
        console.log(date)
    }

    handleChangeEnd(date) {
        console.log(date)
    }

    handleDate(date, name) {
        console.log(date)
        if (date) {
            this.setState({
                [name]: moment(date).format('MM/DD/YYYY')
            });
        } else {
            this.setState({
                [name]: null
            });
        }
    }

    handleTime(time, name) {
        console.log(time)
        if (time) {
            this.setState({
                [name]: moment(time).format('h:mm A')
            });
        } else {
            this.setState({
                [name]: null
            });
        }
    }
    public render() {
        const {
            reservationID,
            Department,
            phone,
            item,
            itemID,
            assetNumber,
            fromDate,
            fromTime,
            from,
            toDate,
            toTime,
            to
        } = this.state

        return (
            <div className='centered'>
                <div className="row text-center">
                    <div className="col-md-12">
                        <h1>Equipment rental</h1>
                        <h4>complete all fields and submit</h4>
                        <br />
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='col-md-6 col-md-offset-3 panel'>
                        <div className='sectionHeader'>Your information</div>
                        <div className='panel-body'>

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
                    <div className='col-md-6 col-md-offset-3 panel'>
                        <div className='sectionHeader'>Timespan</div>
                        <div className='panel-body'>
                            <h4 className="form-h4">Picking up</h4>
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
                            <h4 className="form-h4">Returning</h4>
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
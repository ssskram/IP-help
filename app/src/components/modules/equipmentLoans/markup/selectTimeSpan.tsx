import * as React from 'react'
import DatePicker from '../../../formElements/datepicker'
import TimePicker from '../../../formElements/timepicker'
import * as moment from 'moment'

export default class NewTicket extends React.Component<any, any> {

    public render() {
        const {
            fromDate,
            fromTime,
            from,
            toDate,
            toTime,
            to,
            throwTimeError,
        } = this.props.parentState

        return <div className='col-md-6 col-md-offset-3 panel'>
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
                        callback={(date) => this.setState({ fromDate: moment(date).format('MM/DD/YYYY') }, function (this) { this.setDateTime('fromDate') })}
                    />
                </div>
                <div className='col-md-6'>
                    <TimePicker
                        value={fromTime}
                        name="fromTime"
                        placeholder="Select a time"
                        callback={(time) => this.setState({ fromTime: moment(time).format('h:mm A') }, function (this) { this.setDateTime('fromTime') })}
                    />
                </div>
                <h4 style={{ paddingLeft: '35px' }}>Returning <b>{to}</b></h4>
                <div className='col-md-6'>
                    <DatePicker
                        value={toDate}
                        name="toDate"
                        placeholder="Select a date"
                        callback={(date) => this.setState({ toDate: moment(date).format('MM/DD/YYYY') }, function (this) { this.setDateTime('toDate') })}
                    />
                </div>
                <div className='col-md-6'>
                    <TimePicker
                        value={toTime}
                        name="toTime"
                        placeholder="Select a time"
                        callback={(time) => this.setState({ toTime: moment(time).format('h:mm A') }, function (this) { this.setDateTime('toTime') })}
                    />
                </div>
            </div>
        </div>
    }
}
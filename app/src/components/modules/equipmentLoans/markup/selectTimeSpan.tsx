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

        const {
            updateState
        } = this.props

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
                        callback={(date) => updateState({ fromDate: moment(date).format('MM/DD/YYYY') }, null)}
                    />
                </div>
                <div className='col-md-6'>
                    <TimePicker
                        value={fromTime}
                        name="fromTime"
                        placeholder="Select a time"
                        callback={(time) => updateState({ fromTime: moment(time).format('h:mm A') }, null)}
                    />
                </div>
                <h4 style={{ paddingLeft: '35px' }}>Returning <b>{to}</b></h4>
                <div className='col-md-6'>
                    <DatePicker
                        value={toDate}
                        name="toDate"
                        placeholder="Select a date"
                        callback={(date) => updateState({ toDate: moment(date).format('MM/DD/YYYY') }, null)}
                    />
                </div>
                <div className='col-md-6'>
                    <TimePicker
                        value={toTime}
                        name="toTime"
                        placeholder="Select a time"
                        callback={(time) => updateState({ toTime: moment(time).format('h:mm A') }, null)}
                    />
                </div>
            </div>
        </div>
    }
}
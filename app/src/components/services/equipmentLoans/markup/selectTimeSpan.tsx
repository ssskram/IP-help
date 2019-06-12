import * as React from "react";
import DatePicker from "../../../formElements/datepicker";
import TimePicker from "../../../formElements/timepicker";
import * as moment from "moment";

export default class NewTicket extends React.Component<any, any> {
  handleChange(field, value) {
    const self = this;
    this.props.setState({ [field]: value }, () => {
      self.props.checkTimeFrame();
    });
  }

  public render() {
    const { fromDate, fromTime, toDate, toTime, throwTimeError } = this.props;

    return (
      <div className="col-md-4 col-md-offset-4 panel">
        <div className="sectionHeader">
          Timeframe<span className="glyphicon glyphicon-time pull-right" />
        </div>
        <div className="panel-body">
          {throwTimeError == true && (
            <div role="alert" className="alert alert-danger text-center">
              For loans longer than 72 hours, please call the Help Desk at
              255-2900
            </div>
          )}
          <h5 style={{ paddingLeft: "35px", marginBottom: "0px" }}>
            Picking up
          </h5>
          <div className="col-md-6">
            <DatePicker
              value={fromDate}
              name="fromDate"
              placeholder="Select a date"
              callback={date =>
                this.handleChange("fromDate", moment(date).format("MM/DD/YYYY"))
              }
              minDate
            />
          </div>
          <div className="col-md-6">
            <TimePicker
              value={fromTime}
              name="fromTime"
              placeholder="Select a time"
              callback={time =>
                this.handleChange("fromTime", moment(time).format("h:mm A"))
              }
            />
          </div>
          <h5 style={{ paddingLeft: "35px", marginBottom: "0px" }}>
            Returning
          </h5>
          <div className="col-md-6">
            <DatePicker
              value={toDate}
              name="toDate"
              placeholder="Select a date"
              callback={date =>
                this.handleChange("toDate", moment(date).format("MM/DD/YYYY"))
              }
              minDate
            />
          </div>
          <div className="col-md-6">
            <TimePicker
              value={toTime}
              name="toTime"
              placeholder="Select a time"
              callback={time =>
                this.handleChange("toTime", moment(time).format("h:mm A"))
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

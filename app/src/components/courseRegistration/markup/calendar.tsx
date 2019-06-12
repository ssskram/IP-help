import * as React from "react";
import BigCalendar from "react-big-calendar";
import * as moment from "moment";
import * as types from "../../../store/types";
import "react-big-calendar/lib/css/react-big-calendar.css";
import formatEvents from "../functions/formatCalendarEvents";

type props = {
  courses: types.course[];
  courseRegistrations: types.courseRegistration[];
  setState: (stateObj: object) => void;
};

export default class Calendar extends React.Component<props, {}> {
  viewEvent(event) {
    this.props.setState({
      viewCourse: true,
      course: this.props.courses.find(course => course.courseId == event.id)
    });
  }

  public render() {
    const localizer = BigCalendar.momentLocalizer(moment);
    return (
      <div className="text-center">
        <BigCalendar
          localizer={localizer}
          events={formatEvents(this.props.courses)}
          defaultDate={new Date()}
          defaultView="month"
          style={{ height: "60vh" }}
          toolbar={true}
          views={["month"]}
          onSelectEvent={event => this.viewEvent(event)}
        />
      </div>
    );
  }
}

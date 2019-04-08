import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as types from "../../store/types";
import * as user from "../../store/user";
import * as courses from "../../store/courses";
import * as courseRegistrations from "../../store/courseRegistrations";
import Spinner from "../utilities/spinner";
import Calendar from "./markup/calendar";
import Table from "./markup/table";
import Header from "./markup/header";
import ViewCourse from "./markup/viewCourse";
import ConfirmRegistration from "./markup/confirmRegistration";
import RegistrationComplete from "./markup/registrationComplete";

type props = {
  user: types.user;
  courses: types.course[];
  courseRegistrations: types.courseRegistration[];
  loadCourses: () => void;
  loadCourseRegistrations: () => void;
  newCourseRegistration: (registration: object) => boolean;
  cancelRegistration: (registration: types.courseRegistration) => void;
};

type state = {
  viewCourse: boolean;
  confirmRegistration: boolean;
  registrationType: "Active" | "Waitlisted";
  registrationComplete: "Success" | "Error";
  course: types.course;
};

export class CourseRegistration extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      viewCourse: false,
      confirmRegistration: false,
      registrationType: undefined,
      registrationComplete: undefined,
      course: undefined
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.loadCourses();
    this.props.loadCourseRegistrations();
  }

  closeModal() {
    this.setState({
      viewCourse: false,
      confirmRegistration: false,
      registrationType: undefined,
      registrationComplete: undefined,
      course: undefined
    });
  }

  public render() {
    return (
      <div className="col-md-8 col-md-offset-2">
        <Header />
        <Calendar
          courseRegistrations={this.props.courseRegistrations}
          courses={this.props.courses}
          setState={this.setState.bind(this)}
        />
        <Table
          courseRegistrations={this.props.courseRegistrations}
          courses={this.props.courses}
          setState={this.setState.bind(this)}
        />
        {this.state.viewCourse == true && (
          <ViewCourse
            setState={this.setState.bind(this)}
            closeModal={this.closeModal.bind(this)}
            cancelRegistration={this.props.cancelRegistration.bind(this)}
            courseRegistrations={this.props.courseRegistrations}
            course={this.state.course}
            user={this.props.user}
          />
        )}
        {this.state.confirmRegistration == true && (
          <ConfirmRegistration
            course={this.state.course}
            closeModal={this.closeModal.bind(this)}
            registrationType={this.state.registrationType}
            setState={this.setState.bind(this)}
            user={this.props.user}
            newCourseRegistration={this.props.newCourseRegistration.bind(this)}
          />
        )}
        {this.state.registrationComplete && (
          <RegistrationComplete
            course={this.state.course}
            registrationType={this.state.registrationType}
            registrationComplete={this.state.registrationComplete}
            closeModal={this.closeModal.bind(this)}
            setState={this.setState.bind(this)}
          />
        )}
        {this.props.courses.length == 0 &&
          this.props.courseRegistrations.length == 0 && (
            <Spinner notice="...loading available courses..." />
          )}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.courses,
    ...state.user,
    ...state.courseRegistrations
  }),
  {
    ...courses.actionCreators,
    ...user.actionCreators,
    ...courseRegistrations.actionCreators
  }
)(CourseRegistration as any);

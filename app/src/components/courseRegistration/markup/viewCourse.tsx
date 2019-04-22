import * as React from "react";
import * as types from "../../../store/types";
import Modal from "react-responsive-modal";
import Waitlist from "./waitlist";
import userIsRegistered from "../functions/userIsRegistered";
const moment = require("moment");

type props = {
  user: types.user;
  course: types.course;
  courseRegistrations: types.courseRegistration[];
  cancelRegistration: (registration: types.courseRegistration) => void;
  setState: (stateObj: object) => void;
  closeModal: () => void;
};

export default class ViewCourse extends React.Component<props, {}> {
  registerActive() {
    this.props.setState({
      viewCourse: false,
      confirmRegistration: true,
      registrationType: "Active"
    });
  }

  registerWaitlist() {
    this.props.setState({
      viewCourse: false,
      confirmRegistration: true,
      registrationType: "Waitlisted"
    });
  }

  async cancelRegistration() {
    this.setState({ spinner: true });
    // get the relevant registration record
    const registration = this.props.courseRegistrations.find(
      r =>
        r.courseCode == this.props.course.courseCode &&
        r.user == this.props.user.email
    );
    await this.props.cancelRegistration(registration);
    this.props.closeModal();
  }

  courseIsNotInPast() {
    return (
      +new Date(moment(this.props.course.startDate, "MM-DD-YYYY h:m A")) >
      +new Date()
    );
  }

  public render() {
    const enrollments = this.props.courseRegistrations.filter(
      reg => reg.courseCode == this.props.course.courseCode
    );
    const countActive = enrollments.filter(
      x => x.registrationStatus == "Active"
    ).length;
    const waitlist = enrollments.filter(
      x => x.registrationStatus == "Waitlisted"
    );
    const countWaitlisted = waitlist.length;
    const userAlreadyRegistered = userIsRegistered(
      this.props.user,
      this.props.course,
      this.props.courseRegistrations
    );

    return (
      <Modal
        open={true}
        onClose={() => this.props.closeModal()}
        classNames={{
          overlay: "custom-overlay",
          modal: "custom-modal"
        }}
        center
      >
        <div className="text-center">
          {userAlreadyRegistered && (
            <div>
              <br />
              <div className="alert alert-info">
                You are currently registered for this course
              </div>
            </div>
          )}
          <h4 className="oswald-header">{this.props.course.courseName}</h4>
          <div>{this.props.course.courseDescription}</div>
          <br />
          <div>
            <b>Course start</b>
          </div>
          <div>{this.props.course.startDate}</div>
          <div>
            <b>Course end</b>
          </div>
          <div>{this.props.course.endDate}</div>
          <div>
            <b>Maximum capacity</b>
          </div>
          <div>{this.props.course.maximumCapacity} eager learners</div>
          <div>
            <b>Currently enrolled</b>
          </div>
          <div>
            {countActive}/{this.props.course.maximumCapacity}
          </div>
          {countWaitlisted > 0 && (
            <div>
              <div>
                <b>Currently waitlisted</b>
              </div>
              <div>
                {countWaitlisted} hungry brain{countWaitlisted > 1 ? "s" : ""}
              </div>
              <Waitlist waitlist={waitlist} />
            </div>
          )}
          <br />
          {userAlreadyRegistered && (
            <div>
              <button
                className="btn btn-danger"
                onClick={this.cancelRegistration.bind(this)}
              >
                Click here to cancel your registration
              </button>
            </div>
          )}
          {!userAlreadyRegistered && this.courseIsNotInPast() && (
            <div>
              {countActive < this.props.course.maximumCapacity &&
                countWaitlisted == 0 && (
                  <button
                    className="btn btn-success"
                    onClick={this.registerActive.bind(this)}
                  >
                    Sign me up!
                  </button>
                )}
              {(countActive >= this.props.course.maximumCapacity ||
                countWaitlisted > 0) && (
                <button
                  className="btn btn-warning"
                  onClick={this.registerWaitlist.bind(this)}
                >
                  Add me to the waitlist!
                </button>
              )}
            </div>
          )}
        </div>
      </Modal>
    );
  }
}

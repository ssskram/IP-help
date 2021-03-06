import * as React from "react";
import * as types from "../../../store/types";
import ReactTable from "react-table";
import "react-table/react-table.css";
const moment = require("moment");

type props = {
  courses: types.course[];
  courseRegistrations: types.courseRegistration[];
  setState: (stateObj: object) => void;
};

export default class Table extends React.Component<props, {}> {
  viewEvent(event) {
    this.props.setState({
      viewCourse: true,
      course: this.props.courses.find(
        course => course.courseId == event.courseId
      )
    });
  }

  public render() {
    const columns = [
      {
        Header: "",
        accessor: "startDate"
      },
      {
        Header: "Course",
        accessor: "courseName"
      },
      {
        Header: "Capacity",
        accessor: "maximumCapacity"
      },
      {
        Header: "Enrolled",
        accessor: "maximumCapacity",
        Cell: props => {
          const countActive = this.props.courseRegistrations.filter(
            reg =>
              reg.courseCode == props.original.courseCode &&
              reg.registrationStatus == "Active"
          ).length;
          return (
            <div
              style={
                countActive >= props.original.maximumCapacity
                  ? { color: "red", fontWeight: "bold" }
                  : { color: "green", fontWeight: "bold" }
              }
            >
              {countActive}
            </div>
          );
        }
      },
      {
        Header: "Waitlisted",
        accessor: "maximumCapacity",
        Cell: props => {
          const countWaitlisted = this.props.courseRegistrations.filter(
            reg =>
              reg.courseCode == props.original.courseCode &&
              reg.registrationStatus == "Waitlisted"
          ).length;
          return (
            <div
              style={
                countWaitlisted > 0
                  ? { color: "orange", fontWeight: "bold" }
                  : { fontWeight: "bold" }
              }
            >
              {countWaitlisted}
            </div>
          );
        }
      },
      {
        Header: "",
        accessor: "courseId",
        Cell: props => (
          <button
            onClick={() => this.viewEvent(props.original)}
            className="btn btn-secondary"
            title="View course"
          >
            <span className="glyphicon glyphicon-eye-open" />
          </button>
        ),
        maxWidth: 65
      }
    ];

    const now = +new Date();
    return (
      <div className="text-center">
        <br />
        <ReactTable
          data={this.props.courses
            .filter(
              course =>
                +new Date(
                  moment(course.startDate, "MM-DD-YYYY h:m A").format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
                ) > now
            )
            .sort(
              (a, b) =>
                +new Date(
                  moment(a.startDate, "MM-DD-YYYY h:m A").format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
                ) -
                +new Date(
                  moment(b.startDate, "MM-DD-YYYY h:m A").format(
                    "YYYY-MM-DD HH:mm:ss"
                  )
                )
            )}
          columns={columns}
          loading={false}
          minRows={0}
          pageSize={20}
          showPageSizeOptions={false}
          noDataText=""
        />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

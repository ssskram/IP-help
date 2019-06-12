// hydrates the wholeeeeee store

import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as user from "../../store/user";
import * as liaisons from "../../store/liaisons";
import * as equipmentLoans from "../../store/equipmentLoan";
import * as equipment from "../../store/equipment";
import * as courses from "../../store/courses";
import * as courseRegistrations from "../../store/courseRegistrations";

class Hydrate extends React.Component<any, {}> {
  componentDidMount() {
    this.props.loadUser();
    this.props.loadLiaisons();
    this.props.loadEquipmentLoans();
    this.props.loadEquipment();
    this.props.loadCourses();
    this.props.loadCourseRegistrations();
  }

  public render() {
    return null;
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.user,
    ...state.liaisons,
    ...state.loans,
    ...state.equipment,
    ...state.courses,
    ...state.courseRegistrations
  }),
  {
    ...user.actionCreators,
    ...liaisons.actionCreators,
    ...equipmentLoans.actionCreators,
    ...equipment.actionCreators,
    ...courses.actionCreators,
    ...courseRegistrations.actionCreators
  }
)(Hydrate);

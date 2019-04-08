import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import * as constants from "./constants/index";
import * as types from "./types";

const unloadedState: types.courseRegistrations = {
  courseRegistrations: []
};

export const actionCreators = {
  loadCourseRegistrations: (): AppThunkAction<any> => dispatch => {
    fetch("https://365proxy.azurewebsites.us/iphelp/allCourseRegistrations", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_365_API
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: constants.loadRegistrations, registrations: data });
      })
      .catch(err => {});
  },
  newCourseRegistration: (
    registration
  ): AppThunkAction<any> => async dispatch => {
    let SPload = JSON.stringify({
      User: registration.user,
      Course_x0020_Code: registration.courseCode,
      Registration_x0020_Status: registration.registrationStatus
    });
    const response = await fetch(
      "https://365proxy.azurewebsites.us/iphelp/newCourseRegistration",
      {
        method: "POST",
        body: SPload,
        headers: new Headers({
          Authorization: "Bearer " + process.env.REACT_APP_365_API,
          "Content-Type": "application/json"
        })
      }
    );
    if (response.status == 200) {
      dispatch({ type: constants.newRegistration, registration: registration });
      return "Success";
    } else return "Error";
  },
  cancelRegistration: (registration): AppThunkAction<any> => async dispatch => {
    fetch(
      "https://course-registration.azurewebsites.us/api/cancelRegistration?code=x9O/azEQFdHRCly948bm61UaQ5aGSTx1jKSb0kcEdglSTaFKqHkisg==&id=" +
        registration.registrationId +
        "&user=" +
        registration.user
    );
    dispatch({
      type: constants.cancelRegistration,
      id: registration.registrationId
    });
  }
};

export const reducer: Reducer<types.courseRegistrations> = (
  state: types.courseRegistrations,
  incomingAction: Action
) => {
  const action = incomingAction as any;
  switch (action.type) {
    case constants.loadRegistrations:
      return { ...state, courseRegistrations: action.registrations };
    case constants.newRegistration:
      return {
        ...state,
        courseRegistrations: state.courseRegistrations.concat(
          action.registration
        )
      };
    case constants.cancelRegistration:
      return {
        ...state,
        courseRegistrations: state.courseRegistrations.map(registration => {
          return registration.registrationId == action.id
            ? { ...registration, registrationStatus: "Canceled" }
            : registration;
        })
      };
  }
  return state || unloadedState;
};

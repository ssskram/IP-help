import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import * as constants from "./constants/index";
import * as types from "./types";

const unloadedState: types.equipmentLoans = {
  loans: []
};

export const actionCreators = {
  loadEquipmentLoans: (): AppThunkAction<any> => dispatch => {
    fetch("https://365proxy.azurewebsites.us/iphelp/allEquipmentLoans", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_365_API
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: constants.loadEquipmentLoans, loans: data });
      })
      .catch(err => {});
  }
};

export const reducer: Reducer<types.equipmentLoans> = (
  state: types.equipmentLoans,
  incomingAction: Action
) => {
  const action = incomingAction as any;
  switch (action.type) {
    case constants.loadEquipmentLoans:
      return { ...state, loans: action.loans };
  }
  return state || unloadedState;
};

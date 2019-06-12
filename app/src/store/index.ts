import * as user from "./user";
import * as types from "./types";
import * as messages from "./messages";
import * as liaisons from "./liaisons";
import * as equipmentLoans from "./equipmentLoan";
import * as equipment from "./equipment";
import * as courses from "./courses";
import * as courseRegistrations from "./courseRegistrations";

export interface ApplicationState {
  user: types.user;
  messages: types.messsage;
  liaisons: types.liaisons;
  loans: types.equipmentLoans;
  equipment: types.equipment;
  courses: types.courses;
  courseRegistrations: types.courseRegistrations;
}

export const reducers = {
  user: user.reducer,
  messages: messages.reducer,
  liaisons: liaisons.reducer,
  loans: equipmentLoans.reducer,
  equipment: equipment.reducer,
  courses: courses.reducer,
  courseRegistrations: courseRegistrations.reducer
};

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

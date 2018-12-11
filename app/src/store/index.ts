import * as user from './user'
import * as types from './types'
import * as messages from './messages'
import * as liaisons from './liaisons'
import * as equipmentLoans from './equipmentLoan'
import * as equipment from './equipment'

export interface ApplicationState {
    user: types.user,
    messages: types.messsage,
    liaisons: types.liaisons,
    equipmentLoans: types.equipmentLoans,
    equipment: types.equipment
}

export const reducers = {
    user: user.reducer,
    messages: messages.reducer,
    liaisons: liaisons.reducer,
    equipmentLoans: equipmentLoans.reducer,
    equipment: equipment.reducer
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
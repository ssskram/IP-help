
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants/index'
import * as types from './types/index'

const unloadedState: types.equipment = {
    equipment: []
}

export const actionCreators = {
    loadEquipment: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://365proxy.azurewebsites.us/iphelp/allEquipmentLoans", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_API
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: constants.loanEquipmentLoans, loans: data });
            })
    }
}

export const reducer: Reducer<types.equipmentLoans> = (state: types.equipmentLoans, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loanEquipmentLoans:
            return { ...state, loans: action.loans }
    }
    return state || unloadedState
}
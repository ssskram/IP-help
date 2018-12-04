
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.liaisons = {
    liaisons: []
}

export const actionCreators = {
    loadLiaisons: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://365proxy.azurewebsites.us/iphelp/allLiaisons", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_API
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: constants.loadLiaisons, liaisons: data });
            })
    }
}

export const reducer: Reducer<types.liaisons> = (state: types.liaisons, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadLiaisons:
            return { ...state, liaisons: action.liaisons }
    }
    return state || unloadedState
}
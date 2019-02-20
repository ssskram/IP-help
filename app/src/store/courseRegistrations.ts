
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants/index'
import * as types from './types'

const unloadedState: types.courseRegistrations = {
    courseRegistrations: []
}

export const actionCreators = {
    loadCourseRegistrations: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://365proxy.azurewebsites.us/iphelp/allCourseRegistrations", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_API
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: constants.loadRegistrations, registrations: data });
            })
            .catch(err => {})
    }
}

export const reducer: Reducer<types.courseRegistrations> = (state: types.courseRegistrations, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadRegistrations:
            return { ...state, courseRegistrations: action.registrations }
    }
    return state || unloadedState
}
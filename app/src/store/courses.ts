
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants/index'
import * as types from './types/index'

const unloadedState: types.courses = {
    courses: []
}

export const actionCreators = {
    loadCourses: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://365proxy.azurewebsites.us/iphelp/allCourses", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_API,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: constants.loadCourses, courses: data });
            })
            .catch(err => {})
    }
}

export const reducer: Reducer<types.courses> = (state: types.courses, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadCourses:
            return { ...state, courses: action.courses }
    }
    return state || unloadedState
}
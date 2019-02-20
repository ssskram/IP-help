
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
            .catch(err => { })
    },
    newCourseRegistration: (registration): AppThunkAction<any> => async (dispatch) => {
        let SPload = JSON.stringify({
            User: registration.user,
            Course_x0020_Code: registration.courseCode,
            Registration_x0020_Status: registration.registrationStatus
        })
        const response = await fetch('https://365proxy.azurewebsites.us/iphelp/newCourseRegistration', {
            method: 'POST',
            body: SPload,
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_API,
                'Content-Type': 'application/json'
            })
        })
        if (response.status == 200) {
            dispatch({ type: constants.newRegistration, registration: registration })
            return 'Success'
        } else return 'Error'
    }
}

export const reducer: Reducer<types.courseRegistrations> = (state: types.courseRegistrations, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadRegistrations:
            return { ...state, courseRegistrations: action.registrations }
        case constants.newRegistration:
            return { ...state, courseRegistrations: state.courseRegistrations.concat(action.registration) }
    }
    return state || unloadedState
}
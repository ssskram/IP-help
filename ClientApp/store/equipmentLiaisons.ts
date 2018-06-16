import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface equipmentLiaisonsState {
    liaison: boolean
}

interface RequestLiaisonAction {
    type: 'REQUEST_LIAISON';
}

interface ReceiveLiaisonAction {
    type: 'RECEIVE_LIAISON';
    liaison: boolean;
}

type KnownAction = RequestLiaisonAction | ReceiveLiaisonAction;


export const actionCreators = {
    requestLiaisons: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/userdata/equipment_check', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'RECEIVE_LIAISON', liaison: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_LIAISON' });
    }
};

export const reducer: Reducer<equipmentLiaisonsState> = (state: equipmentLiaisonsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_LIAISON':
            return {
                liaison: state.liaison,
            };
        case 'RECEIVE_LIAISON':
            return {
                liaison: action.liaison,
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || { liaison: '' }
};
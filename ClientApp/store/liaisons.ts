import { fetch } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

const loadLiaisons = 'loadLiaisonStatus'

export interface equipmentLiaisonsState {
    liaison: number
}

export const actionCreators = {
    requestLiaisons: (): AppThunkAction<any> => (dispatch, getState) => {
        fetch('/api/userdata/equipment_check', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: loadLiaisons, liaison: data });
            })
    }
}

export const reducer: Reducer<equipmentLiaisonsState> = (state: equipmentLiaisonsState, incomingAction: Action) => {
    const action = incomingAction as any;
    switch (action.type) {
        case loadLiaisons:
            return {
                liaison: action.liaison,
            }
    }

    return state || { liaison: 1 }
};
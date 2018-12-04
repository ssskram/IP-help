import { fetch } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

const loadEquipment = 'loadEquipment'

const unloadedState: EquipmentState = {
    equipment: []
}

export interface EquipmentState {
    equipment: EquipmentItem[]
}

export interface EquipmentItem {
    item: string
    itemType: string
    location: string
    pcNumber: string
    assetNumber: string
    itemID: string
}


export const actionCreators = {
    loadEquipment: (): AppThunkAction<any> => (dispatch, getState) => {
        fetch('/api/equipmentReservation/getEquipment', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: loadEquipment, equipment: data });
            });
    }
}

export const reducer: Reducer<EquipmentState> = (state: EquipmentState, incomingAction: Action) => {
    const action = incomingAction as any;
    switch (action.type) {
        case loadEquipment:
            return {
                ...state,
                equipment: action.equipment,
            }
    }

    return state || unloadedState
}
import { fetch } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

const loadReservations = 'loadReservations'

const unloadedState: ReservationState = {
    reservations: []
}

export interface ReservationState {
    reservations: ReservationItem[]
}

export interface ReservationItem {
    reservationID: string
    user: string
    department: string
    item: string
    itemID: string
    assetNumber: string
    from: string
    to: string
    pickedUp: string
    returned: string
}


export const actionCreators = {
    loadReservations: (): AppThunkAction<any> => (dispatch, getState) => {
        fetch('/api/equipmentReservation/getReservations', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: loadReservations, reservations: data });
            });
    }
}

export const reducer: Reducer<ReservationState> = (state: ReservationState, incomingAction: Action) => {
    const action = incomingAction as any;
    switch (action.type) {
        case loadReservations:
            return {
                ...state,
                reservations: action.reservations,
            }
    }

    return state || unloadedState
};
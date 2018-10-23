import * as Messages from './messages'
import * as Ping from './ping'
import * as User from './user'
import * as equipmentLiaisons from './liaisons'
import * as Reservations from './reservations'

export interface ApplicationState {
    user: User.UserState;
    ping: Ping.PingState;
    messages: Messages.MessageState;
    liaison: equipmentLiaisons.equipmentLiaisonsState;
    reservations: Reservations.ReservationState
}

export const reducers = {
    user: User.reducer,
    ping: Ping.reducer,
    messages: Messages.reducer,
    liaison: equipmentLiaisons.reducer,
    reservations: Reservations.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

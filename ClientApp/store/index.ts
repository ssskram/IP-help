import * as Messages from './messages';
import * as Ping from './ping';
import * as User from './user';
import * as equipmentLiaisons from './equipmentLiaisons';

export interface ApplicationState {
    user: User.UserState;
    ping: Ping.PingState;
    messages: Messages.MessageState;
    liaison: equipmentLiaisons.equipmentLiaisonsState;
}

export const reducers = {
    user: User.reducer,
    ping: Ping.reducer,
    messages: Messages.reducer,
    liaison: equipmentLiaisons.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

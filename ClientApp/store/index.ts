import * as Messages from './messages';
import * as Ping from './ping';
import * as User from './user';
import * as equipmentLiaisons from './equipmentLiaisons';

// The top-level state object
export interface ApplicationState {
    user: User.UserState;
    ping: Ping.PingState;
    messages: Messages.MessageState;
    liaison: equipmentLiaisons.equipmentLiaisonsState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    user: User.reducer,
    ping: Ping.reducer,
    messages: Messages.reducer,
    liaison: equipmentLiaisons.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
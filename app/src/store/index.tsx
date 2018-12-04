import * as user from './user'
import * as types from './types'
import * as messages from './messages'
import * as liaisons from './liaisons'

export interface ApplicationState {
    user: types.user,
    messages: types.messsage,
    liaisons: types.liaisons
}

export const reducers = {
    user: user.reducer,
    messages: messages.reducer,
    liaisons: liaisons.reducer
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
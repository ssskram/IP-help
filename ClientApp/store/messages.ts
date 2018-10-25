import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface MessageState {
    messages: string
}

interface ReservationMessageAction { type: 'RESERVATION', message: string }
interface SuccessMessageAction { type: 'FORM_SUCCESS' }
interface LiaisonMessageAction { type: 'ACCESS_DENIED' }
interface ClearMessageAction { type: 'CLEAR' }

type KnownAction = SuccessMessageAction | ClearMessageAction  | LiaisonMessageAction | ReservationMessageAction;

export const actionCreators = {
    reservation: (message) => <ReservationMessageAction>{ type: 'RESERVATION', message },
    success: () => <SuccessMessageAction>{ type: 'FORM_SUCCESS' },
    fourohfour: () => <LiaisonMessageAction>{ type: 'ACCESS_DENIED' },
    clear: () => <ClearMessageAction>{ type: 'CLEAR' },
};

export const reducer: Reducer<MessageState> = (state: MessageState, action: KnownAction) => {
    switch (action.type) {
        case 'FORM_SUCCESS':
            return { messages: "Success! You'll be hearing from us soon." };
        case 'ACCESS_DENIED':
            return { messages: "Sorry! Only certain people can request new equipment<br/>Please contact your department's I&P liaison" };
        case 'CLEAR':
            return { messages: "" }
        case 'RESERVATION':
            return { messages: action.message}
        default:
            const exhaustiveCheck: never = action;
    }
    return state || { messages: "" }
};

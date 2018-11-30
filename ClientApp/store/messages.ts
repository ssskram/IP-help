import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface MessageState {
    messages: string
}

interface ReservationMessageAction { type: 'RESERVATION', message: string }
interface SuccessMessageAction { type: 'FORM_SUCCESS' }
interface FailureMessageAction { type: 'FORM_FAILURE' }
interface LiaisonMessageAction { type: 'ACCESS_DENIED' }
interface ClearMessageAction { type: 'CLEAR' }

type KnownAction =
    SuccessMessageAction |
    FailureMessageAction |
    ClearMessageAction |
    LiaisonMessageAction |
    ReservationMessageAction;

export const actionCreators = {
    reservation: (message) => <ReservationMessageAction>{ type: 'RESERVATION', message },
    success: () => <SuccessMessageAction>{ type: 'FORM_SUCCESS' },
    failure: () => <FailureMessageAction>{ type: 'FORM_FAILURE' },
    fourohfour: () => <LiaisonMessageAction>{ type: 'ACCESS_DENIED' },
    clear: () => <ClearMessageAction>{ type: 'CLEAR' },
};

export const reducer: Reducer<MessageState> = (state: MessageState, action: KnownAction) => {
    switch (action.type) {
        case 'FORM_SUCCESS':
            return { messages: "<b>Success!</b> You'll be hearing from us soon" };
        case 'FORM_FAILURE':
            return { messages: "<b>Oops! That didn't work</b><br/> Please logout, log back in, and try again" };
        case 'ACCESS_DENIED':
            return { messages: "<b>Sorry!</b> Only certain people can request new equipment<br/>Please contact your department's I&P liaison" };
        case 'CLEAR':
            return { messages: "" }
        case 'RESERVATION':
            return { messages: action.message }
        default:
            const exhaustiveCheck: never = action;
    }
    return state || { messages: "" }
};

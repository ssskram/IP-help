import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface MessageState {
    messages: string
}

interface SuccessMessageAction { type: 'FORM_SUCCESS' }
interface LiaisonMessageAction { type: 'ACCESS_DENIED' }
interface ClearMessageAction { type: 'CLEAR' }

type KnownAction = SuccessMessageAction | ClearMessageAction  | LiaisonMessageAction;

export const actionCreators = {
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
        default:
            const exhaustiveCheck: never = action;
    }
    return state || { messages: "" }
};

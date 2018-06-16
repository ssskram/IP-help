import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface MessageState {
    messages: string
}

interface SuccessMessageAction { type: 'FORM_SUCCESS' }
interface SurveyMessageAction { type: 'SURVEY_SUBMITTED' }
interface LiaisonMessageAction { type: 'ACCESS_DENIED' }
interface ClearMessageAction { type: 'CLEAR' }

type KnownAction = SuccessMessageAction | ClearMessageAction | SurveyMessageAction | LiaisonMessageAction;

export const actionCreators = {
    success: () => <SuccessMessageAction>{ type: 'FORM_SUCCESS' },
    surveySubmitted: () => <SurveyMessageAction>{ type: 'SURVEY_SUBMITTED' },
    fourohfour: () => <LiaisonMessageAction>{ type: 'ACCESS_DENIED' },
    clear: () => <ClearMessageAction>{ type: 'CLEAR' },
};

export const reducer: Reducer<MessageState> = (state: MessageState, action: KnownAction) => {
    switch (action.type) {
        case 'FORM_SUCCESS':
            return { messages: "Success! You'll be hearing from us soon." };
        case 'ACCESS_DENIED':
            return { messages: "Sorry! Only certain people can request new equipment<br/>Please contact your department's I&P liaison" };
        case 'SURVEY_SUBMITTED':
            return { messages: "Thanks again!" };
        case 'CLEAR':
            return { messages: "" }
        default:
            const exhaustiveCheck: never = action;
    }
    return state || { messages: "Welcome to the new Help Desk portal!<br/><a href='/Survey'>Let us know what you think</a>" }
};

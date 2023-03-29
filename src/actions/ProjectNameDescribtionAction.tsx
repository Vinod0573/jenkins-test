import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { accountNameState } from '../reducers/AccountNameReducers';

export enum accountNameActionTypes {
    ACCOUNT_NAME = 'ACCOUNT_NAME',
    LOAD_ACCOUNT_NAME = 'LOAD_ACCOUNT_NAME',
    ERROR = 'ERROR'
}

export interface accountNameAction {
    type: accountNameActionTypes.ACCOUNT_NAME;
    payload: string;
}

export interface loadAccountAction {
    type: accountNameActionTypes.LOAD_ACCOUNT_NAME;
    loading: boolean;
}

export interface errorAction {
    type: accountNameActionTypes.ERROR;
    errorMessage: string;
}
export type accountActions = accountNameAction | loadAccountAction | errorAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAccountNameData: ActionCreator<ThunkAction<Promise<any>, accountNameState, null, accountNameAction>> = (name: string) => {
    return async (dispatch: Dispatch) => {
        try {
             dispatch({ type: accountNameActionTypes.ACCOUNT_NAME,payload: name });

        } catch (err) {
        console.error(err);
        dispatch({type: accountNameActionTypes.ERROR, errorMessage: err});
        dispatch({type: accountNameActionTypes.LOAD_ACCOUNT_NAME, loading: false});
        };
    };
};
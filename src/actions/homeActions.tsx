import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { homeState } from '../reducers/homeReducers';

export enum homeActionTypes {
    HOME = 'HOME',
    LOAD_HOME = 'LOAD_HOME',
    ERROR = 'ERROR'
}

export interface homeAction {
    type: homeActionTypes.HOME;
    payload: string;
}

export interface loadHomeAction {
    type: homeActionTypes.LOAD_HOME;
    loading: boolean;
}

export interface errorAction {
    type: homeActionTypes.ERROR;
    errorMessage: string;
}
export type homeActions = homeAction | loadHomeAction | errorAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getButtonData: ActionCreator<ThunkAction<Promise<any>, homeState, null, homeAction>> = (name: string) => {
    return async (dispatch: Dispatch) => {
         try {
            // let result = await (await fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)).json();
            // if (result.status !== 'success')
            //     throw new Error(result.message);
             dispatch({ type: homeActionTypes.HOME,payload: name });
             setTimeout(() => {
            dispatch({type: homeActionTypes.LOAD_HOME, loading: false});
                 
             }, 3000);

        } catch (err) {
        console.error(err);
        dispatch({type: homeActionTypes.ERROR, errorMessage: err});
        dispatch({type: homeActionTypes.LOAD_HOME, loading: false});
        };
    };
};

export const loadHomeAction: ActionCreator<ThunkAction<any, homeState, null, loadHomeAction>> = (shouldLoad: boolean) => 
    (dispatch: Dispatch) => dispatch({type: homeActionTypes.LOAD_HOME, loading: shouldLoad})

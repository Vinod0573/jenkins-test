import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { loginState } from '../reducers/loginReducers';

export enum loginActionTypes {
    ALL_LOGIN_DATA = 'ALL_LOGIN_DATA',
    LOAD_HOME = 'LOAD_HOME',
    ERROR = 'ERROR'
}

export interface loginAction {
    type: loginActionTypes.ALL_LOGIN_DATA;
    payload: any;
}

export interface loadLoginAction {
    type: loginActionTypes.LOAD_HOME;
    loading: boolean;
}

export interface errorAction {
    type: loginActionTypes.ERROR;
    errorMessage: string;
}
export type loginActions = loginAction | loadLoginAction | errorAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getLoginInfo  = async (data : any ,dispatch:Dispatch) => {
  

        try {
            // let result = await (await fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)).json();
            // if (result.status !== 'success')
            //     throw new Error(result.message);
             dispatch({ type: loginActionTypes.ALL_LOGIN_DATA ,payload: data });
            //  setTimeout(() => {
            // dispatch({type: loginActionTypes.LOAD_HOME, loading: false});
                 
            //  }, 3000);
            
        } catch (err) {
        console.error(err);
        dispatch({type: loginActionTypes.ERROR, errorMessage: err});
        dispatch({type: loginActionTypes.LOAD_HOME, loading: false});
        };
    
};

export const loadLoginAction: ActionCreator<ThunkAction<any, loginState, null, loadLoginAction>> = (shouldLoad: boolean) => 
    (dispatch: Dispatch) => dispatch({type: loginActionTypes.LOAD_HOME, loading: shouldLoad})

import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { pushAccountState} from '../reducers/PushAccountPageReducer';

export enum pushAccountPage {
    PUSH_PAGE = 'PUSH_PAGE',

    LOAD_ACCOUNT_NAME = 'LOAD_ACCOUNT_NAME',
    ERROR = 'ERROR'
}

export interface pushAccountAction {
    type:  pushAccountPage.PUSH_PAGE;
    payload: boolean;
}



export interface loadAccountAction {
    type:  pushAccountPage.LOAD_ACCOUNT_NAME;
    loading: boolean;
}

export interface errorAction {
    type:  pushAccountPage.ERROR;
    errorMessage: string;
}
export type pushAccountActions = pushAccountAction| loadAccountAction | errorAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
// export const pushAccountPageState = (dispatch: Dispatch,name: boolean) => {
//     return async () => {
     
//         try {
//              dispatch({ type:  pushAccountPage.PUSH_PAGE,payload: name });
//              console.log(name)
//         } catch (err) {
//         console.error(err);
//         dispatch({type:  pushAccountPage.ERROR, errorMessage: err});
//         dispatch({type:  pushAccountPage.LOAD_ACCOUNT_NAME, loading: false});
      
//         };
//     };
// };

export const pushAccountPageState = async (
    dispatch: Dispatch,
    name:boolean
  ) => {
    try {
     
      dispatch({
        type:  pushAccountPage.PUSH_PAGE,payload: name 
      });
    } catch (err) {}
  };
  
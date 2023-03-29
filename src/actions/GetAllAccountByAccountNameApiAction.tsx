import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { homeState } from '../reducers/homeReducers';
import {GETALLACCOUNT_BYDOMAIN_URL} from "../utilities/ApiRoutes"
import axios from 'axios';

export enum getAllAccountByAccountName {
    GETALLACCOUNTBYACCOUNTNAME_API = 'GETALLACCOUNTBYACCOUNTNAME_API',
    LOAD_HOME = 'LOAD_SELECTDOMAIN',
    ERROR = 'ERROR'
}

export interface getAllAccountByAccountNameApiAction {
    type: getAllAccountByAccountName.GETALLACCOUNTBYACCOUNTNAME_API;
    payload: string;
}



export interface errorAction {
    type: getAllAccountByAccountName.ERROR;
    errorMessage: string;
}
export type getAllAccountByAccountNameApiActions  = getAllAccountByAccountNameApiAction | errorAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllAccountbyAccountName = async (dispatch:any , data:any , domain:any) => {
        try {
            let result = await axios.get(`${GETALLACCOUNT_BYDOMAIN_URL.GETALL_ACCOUNT_BYACCOUNTNAME}${data}&domain=${domain}`)
            if(result.data){
                dispatch({type : getAllAccountByAccountName.GETALLACCOUNTBYACCOUNTNAME_API ,
                         payload: result.data?.data
                })

            }
            return result


        } catch (err) {
        console.error(err);
        dispatch({type : getAllAccountByAccountName.ERROR ,
            errorMessage: err
          })
        };
};
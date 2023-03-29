import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { homeState } from '../reducers/homeReducers';
import {SELECT_ALLDOMAIN_URL} from "../utilities/ApiRoutes"
import axios from 'axios';

export enum selectDomainApiActionTypes {
    SELECT_DOMAIN_API = ' SELECT_DOMAIN_API',
    LOAD_HOME = 'LOAD_SELECTDOMAIN',
    ERROR = 'ERROR'
}

export interface selectDomainApiAction {
    type: selectDomainApiActionTypes.SELECT_DOMAIN_API;
    payload: string;
}



export interface errorAction {
    type: selectDomainApiActionTypes.ERROR;
    errorMessage: string;
}
export type selectDomainApiActions  = selectDomainApiAction | errorAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllDomain = async (dispatch:any) => {
        try {
            let result = await axios.get(SELECT_ALLDOMAIN_URL.GET_ALLDOMAIN_URL)
            if(result.data){
                dispatch({type : selectDomainApiActionTypes.SELECT_DOMAIN_API ,
                         payload: result.data?.data
                })
            }


        } catch (err) {
        console.error(err);
        dispatch({type : selectDomainApiActionTypes.ERROR ,
            errorMessage: err
          })
        };
};
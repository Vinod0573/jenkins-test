import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { domainNameState } from "../reducers/SelectDomainNameReducers";

export enum domainNameActionTypes {
  DOMAIN_NAME = "DOMAIN_NAME",
  LOAD_ACCOUNT_NAME = "DOMAIN_NAME",
  ERROR = "ERROR",
}

export interface domainNameAction {
  type: domainNameActionTypes.DOMAIN_NAME;
  payload: string;
}

export interface loadDomainAction {
  type: domainNameActionTypes.LOAD_ACCOUNT_NAME;
  loading: boolean;
}

export interface errorAction {
  type: domainNameActionTypes.ERROR;
  errorMessage: string;
}
export type domainActions = domainNameAction | loadDomainAction | errorAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getDomainNameData: ActionCreator<
  ThunkAction<Promise<any>, domainNameState, null, domainNameAction>
> = (name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: domainNameActionTypes.DOMAIN_NAME, payload: name });
    } catch (err) {
      console.error(err);
      dispatch({ type: domainNameActionTypes.ERROR, errorMessage: err });
      dispatch({
        type: domainNameActionTypes.LOAD_ACCOUNT_NAME,
        loading: false,
      });
    }
  };
};

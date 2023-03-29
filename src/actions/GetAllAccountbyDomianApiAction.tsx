import { GETALLACCOUNT_BYDOMAIN_URL } from "../utilities/ApiRoutes";
import axios from "axios";
import { Dispatch } from "redux";

export enum getAllAccountByDomain {
  GETALLACCOUNTBYDOMAIN_API = "GETALLACCOUNTBYDOMAIN_API",
  GET_ALL_PROJECTS_BY_ACCOUNT = "GET_ALL_PROJECTS_BY_ACCOUNT",
  SET_SELECTED_PROJECT = "SET_SELECTED_PROJECT",
  SET_SELECTED_PROJECT_NAME = "SET_SELECTED_PROJECT_NAME",
  LOAD_HOME = "LOAD_SELECTDOMAIN",
  ERROR = "ERROR",
}

export enum getAllProjectsByAccount {
  GET_ALL_PROJECTS_BY_ACCOUNT = "GET_ALL_PROJECTS_BY_ACCOUNT",
  LOAD_HOME = "LOAD_SELECTDOMAIN",
  ERROR = "ERROR",
}

export interface getAllAccountByDomainApiAction {
  type: getAllAccountByDomain.GETALLACCOUNTBYDOMAIN_API;
  payload: string;
}
export interface getAllProductByAccountApiAction {
  type: getAllAccountByDomain.GET_ALL_PROJECTS_BY_ACCOUNT;
  payload: string;
}

export interface setProjectDetailsApiAction {
  type: getAllAccountByDomain.SET_SELECTED_PROJECT;
  payload: string;
}
export interface setProjectNameAction{
    type: getAllAccountByDomain.SET_SELECTED_PROJECT_NAME;
    payload: string;
  }


export interface errorAction {
  type: getAllAccountByDomain.ERROR;
  errorMessage: string;
}
export type getAllAccountByDomainApiActions =
  | getAllAccountByDomainApiAction
  | getAllProductByAccountApiAction
  | setProjectDetailsApiAction
  | setProjectNameAction
  | errorAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllAccountbyDomain = async (dispatch: any, data: any) => {
  try {
    let result = await axios.get(
      `${GETALLACCOUNT_BYDOMAIN_URL.GETALL_ACCOUNT_BYDOMAIN}${data}`
    );
    if (result.data) {
      dispatch({
        type: getAllAccountByDomain.GETALLACCOUNTBYDOMAIN_API,
        payload: result.data?.data,
      });

    }


    return result
  } catch (err) {
    console.error(err);
    dispatch({ type: getAllAccountByDomain.ERROR, errorMessage: err });
  }
};

export const getAllProjectsbyAccount = async (
  dispatch: any,
  data: any,
  history: any
) => {
  try {
    let result = await axios.get(
      `${GETALLACCOUNT_BYDOMAIN_URL.GET_ALL_PROJECTS_BY_ACCOUNT}${data.name}`
    );
    if (result.data) {
      dispatch({
        type: getAllAccountByDomain.GET_ALL_PROJECTS_BY_ACCOUNT,
        payload: result.data?.data,
      });
      dispatch({
        type: getAllAccountByDomain.SET_SELECTED_PROJECT,
        payload: data,
      });
    }

    if(history){
        history.push("/projectpage");
    }

  } catch (err) {
    console.error(err);
    dispatch({ type: getAllAccountByDomain.ERROR, errorMessage: err });
  }
};
export const setSelectedProjectName = async (dispatch: Dispatch, data: any) => {



        dispatch({
          type: getAllAccountByDomain.SET_SELECTED_PROJECT_NAME,
          payload: data,
        });



  };

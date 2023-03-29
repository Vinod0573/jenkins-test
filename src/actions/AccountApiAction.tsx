import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { homeState } from "../reducers/homeReducers";
import {
  ACCOUNT_DETAILS_URL,
  SEARCH_URL_ACCOUNT,
} from "../utilities/ApiRoutes";
import { getAllTableData } from "./GetAllTabledataApiAction";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export enum homeActionTypes {}
// HOME = 'HOME',

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getButtonData = async (bodyData: string) => {
  try {
    let result = await axios.post(
      ACCOUNT_DETAILS_URL.CREATE_ACCOUNT_URL,
      bodyData
    );
    toast.success("Account Created Successfully");
    return result;
  } catch (err: any) {
    toast.error(err?.response?.data?.error);
    console.error(err);
  }
};

export const getSearch = async (name: string, bodyData: string) => {
  try {
    let result = await axios.post(
      `${SEARCH_URL_ACCOUNT.SEARCH_API}${name}`,
      bodyData
    );

    return result;
  } catch (err) {
    console.error(err);
  }
};

let cancelTokenData: any;

export const getSearchedData = async (dispatch: any, bodyData: string) => {
  try {
    if (typeof cancelTokenData != typeof undefined) {
      cancelTokenData.cancel("cancelled due to new request.");
    }

    cancelTokenData = axios.CancelToken.source();

    let result = await axios.post(
      `${SEARCH_URL_ACCOUNT.SEARCH_ALL_API}`,
      bodyData,
      { cancelToken: cancelTokenData.token }
    );
    //  console.log("api intrigrated search" , result)
    dispatch({
      type: getAllTableData.SET_TABLE_DATA,
      payload: result.data?.data,
    });

    return result;
  } catch (err) {
    console.error(err);
  }
};

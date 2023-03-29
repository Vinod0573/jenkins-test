import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { homeState } from "../reducers/homeReducers";
import { USERLIST_CREATE_URL } from "../utilities/ApiRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export enum homeActionTypes {}
// HOME = 'HOME',
/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const registerUser = async (bodyData: any) => {
  let result = await axios.post(USERLIST_CREATE_URL.CREATE_USER, bodyData);
  //toast.success("Account Created")
  return result;
};

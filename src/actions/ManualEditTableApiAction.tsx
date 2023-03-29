import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { homeState } from "../reducers/homeReducers";
import { SERVER_URL, ONBOARDING_URL } from "../utilities/ApiRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { GET_USER_URL } from "../utilities/ApiRoutes";
export enum homeActionTypes {}
// HOME = 'HOME',

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const userUpdateApi = async (bodyData: any, id: any) => {
  let headers = {
    "Content-Type": "application/json",
    userId: id,
  };
  try {
    const updateUserUrl = SERVER_URL + ONBOARDING_URL.UPDATE_USER_DATA;
    let result = await axios.post(updateUserUrl, bodyData, { headers });
    return result;
  } catch (err) {
    console.error(err);
  }
};

// export const getUserDetail = async (Id: string) => {
//   //console.log("ids", Id);
//   //console.log(GET_USER_URL.UPDATE_USER + `?id=${Id}`);
//   try {
//     let result = await axios.get(GET_USER_URL.UPDATE_USER +`${Id}`);
//     console.log("updateresults", result);
//     return result;
//   } catch (err) {
//     console.error(err);
//   }
// };

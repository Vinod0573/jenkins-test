import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { homeState } from "../reducers/homeReducers";
import { ADD_USER_PROJECT_URL } from "../utilities/ApiRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { setIsLoading } from "./PopupUploadFileAction";

export enum homeActionTypes {}
// HOME = 'HOME',

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const addUserProject = async (
  url: string,
  header: any,
  bodyData: any,
  dispatch: Dispatch,
  adminUserId: string,
) => {
  header = {
    "Content-Type": "application/json",
    userId: adminUserId,
  };
  setIsLoading(true, dispatch);
  try {
    let result = await axios.post(
      `${ADD_USER_PROJECT_URL.ADD_USER_PROJECT_API}${url}`,
      bodyData,
      { headers: header }
    );

    if (result) {
      setIsLoading(false, dispatch);
      toast.success("User Added Successfully");
    }
    return result;
  } catch (err: any) {
    toast.error(err?.response?.data?.error);
    console.error(err);
    // console.log(err?.response?.data?.error, "ggg");
    setIsLoading(false, dispatch);
  }
};

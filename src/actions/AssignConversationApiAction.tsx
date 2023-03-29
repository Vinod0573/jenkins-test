import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { homeState } from "../reducers/homeReducers";
import { ASSIGN_CONVERSATION_URL, SERVER_URL2 } from "../utilities/ApiRoutes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { setIsLoading } from "./PopupUploadFileAction";
import { useDispatch } from "react-redux";
export enum homeActionTypes {}
// HOME = 'HOME',

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const postAssignConversation = async (
  bodyData: any,
  dispatch: Dispatch
) => {
  setIsLoading(true, dispatch);
  try {
    let result = await axios.post(
      ASSIGN_CONVERSATION_URL.ASSIGN_CONVERSATION,
      bodyData
    );

    toast.success(`${bodyData["action"]}ed Conversations Successfully `);
    setIsLoading(false, dispatch);

    return result;
  } catch (err: any) {
    toast.error(err?.response?.data?.error);
    setIsLoading(false, dispatch);
    console.error(err);
    // console.error(err?.response?.data?.error);
  }
};
export const postAssignConversationForQc = async (
  bodyData: any,
  dispatch: Dispatch
) => {
  setIsLoading(true, dispatch);
  try {
    // console.log({ bodyData }, "nithin assign");
    let result = await axios.post(
      ASSIGN_CONVERSATION_URL.ASSIGN_CONVERSATION_QC,
      bodyData
    );

    toast.success(`${bodyData["action"]}ed Conversations Successfully `);
    setIsLoading(false, dispatch);

    return result;
  } catch (err: any) {
    toast.error(err?.response?.data?.error);
    setIsLoading(false, dispatch);
    console.error(err);
    // console.error(err?.response?.data?.error);
  }
};
export const postUnAssignConversation = async (
  bodyData: any,
  dispatch: Dispatch
) => {
  setIsLoading(true, dispatch);
  try {
    let result = await axios.post(
      `${SERVER_URL2}${ASSIGN_CONVERSATION_URL.UNASSIGN_CONVERSATION}`,
      bodyData
    );

    toast.success(`${bodyData["action"]}ed Conversations Successfully `);
    setIsLoading(false, dispatch);
    return result;
  } catch (err: any) {
    toast.error(err?.response?.data?.error);
    setIsLoading(false, dispatch);
    console.error(err);
  }
};
export const postUnAssignConversationForQc = async (
  bodyData: any,
  dispatch: Dispatch
) => {
  setIsLoading(true, dispatch);
  try {
    let result = await axios.post(
      `${ASSIGN_CONVERSATION_URL.UNASSIGN_CONVERSATION_QC}`,
      bodyData
    );

    toast.success(`${bodyData["action"]}ed Conversations Successfully `);
    setIsLoading(false, dispatch);
    return result;
  } catch (err: any) {
    toast.error(err?.response?.data?.error);
    setIsLoading(false, dispatch);
    console.error(err);
  }
};

import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { landingState } from "../reducers/LandingReducers";
import axios from "axios";
import { CONVERSATIONS_URL } from "../utilities/ApiRoutes";
import { getLodderUpdate } from "./LodderUpdate";
import { ToastContainer, toast } from "react-toastify";

let cancelToken: any;
export enum landingActionTypes {
  GET_ALL_CONVERSATION_DETAILS = "GET_ALL_CONVERSATION_DETAILS",
  UPDATED_CONVERSATION = "UPDATED_CONVERSATION",
  LIST_LOADER = "LIST_LOADER",
  SET_SELECTED_CONVERSATION_INFO = "SET_SELECTED_CONVERSATION_INFO",
  SET_AGENT_TYPE = "SET_AGENT_TYPE",
  SET_UPDATE_CONVERSATION_LIST = "SET_UPDATE_CONVERSATION_LIST",
  RESET_LANDING_STATE = "RESET_LANDING_STATE",
}

export interface landingAction {
  type: landingActionTypes.GET_ALL_CONVERSATION_DETAILS;
  payload: string;
}

export interface updatedConversationAction {
  type: landingActionTypes.UPDATED_CONVERSATION;
  payload: string;
}

export interface loaderAction {
  type: landingActionTypes.LIST_LOADER;
  payload: boolean;
}

export interface setSelectedConversationInfoAction {
  type: landingActionTypes.SET_SELECTED_CONVERSATION_INFO;
  payload: string;
}
export interface setAgentTypeAction {
  type: landingActionTypes.SET_AGENT_TYPE;
  payload: string;
}
export interface setUpdatedConversationList {
  type: landingActionTypes.SET_UPDATE_CONVERSATION_LIST;
  payload: boolean;
}
export interface ResetLandingState {
  type: landingActionTypes.RESET_LANDING_STATE;
  payload: any;
}

export type leftSideLandingActions =
  | landingAction
  | updatedConversationAction
  | loaderAction
  | setSelectedConversationInfoAction
  | setAgentTypeAction
  | setUpdatedConversationList
  | ResetLandingState;
/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const ResetLandingStateAction = async (dispatch: Dispatch) => {
  dispatch({ type: landingActionTypes.RESET_LANDING_STATE });
};
export const getAllConversations = async (
  data: string,
  agentType: string,
  dispatch: Dispatch
) => {
  // console.log("jai ho", agentType, agentType?.length);
  dispatch({ type: landingActionTypes.LIST_LOADER, payload: true });

  if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel("cancelled due to new request.");
  }

  cancelToken = axios.CancelToken.source();
  try {
    let url = CONVERSATIONS_URL.GET_ALL_CONVERSATIONS_EXTERNAL;
    let result = await axios.post(url, data, {
      cancelToken: cancelToken.token,
    });
    if (result.data) {
      console.log(result.data.data, "test");
      dispatch({
        type: landingActionTypes.GET_ALL_CONVERSATION_DETAILS,
        payload: result.data.data,
      });
      if (result.data.data?.length == 0) {
        dispatch({ type: landingActionTypes.LIST_LOADER, payload: false });
      } else {
        dispatch({ type: landingActionTypes.LIST_LOADER, payload: false });
      }
      dispatch({
        type: landingActionTypes.SET_UPDATE_CONVERSATION_LIST,
        payload: false,
      });
    }
    return result;
  } catch (err: any) {
    dispatch({
      type: landingActionTypes.GET_ALL_CONVERSATION_DETAILS,
      payload: { totalPages: 0, results: [] },
    });
    if (err.message != "cancelled due to new request.") {
      dispatch({ type: landingActionTypes.LIST_LOADER, payload: false });
    }
  }
};

export const updateConversation = async (data: string, dispatch: Dispatch) => {
  getLodderUpdate(true, dispatch);
  try {
    let result = await axios.post(
      `${CONVERSATIONS_URL.UPDATE_CONVERSATION_EXTERNAL}`,
      data
    );
    // getLodderUpdate(false , dispatch)
    toast.success("Updated successfully!");
    return result;
  } catch (err: any) {
    getLodderUpdate(false, dispatch);
    toast.error(err?.response?.data?.data);
  }
};
export const updateChunkingConversation = async (
  data: string,
  dispatch: Dispatch
) => {
  getLodderUpdate(true, dispatch);
  try {
    let result = await axios.post(
      `${CONVERSATIONS_URL.UPDATE_CONVERSATION_CHUNKING}`,
      data
    );
    // getLodderUpdate(false , dispatch)
    toast.success("Chunking updated successfully!");
    return result;
  } catch (err: any) {
    getLodderUpdate(false, dispatch);
    toast.error(err?.response?.data?.data);
  }
};
export const deleteConversation = async (data: string, dispatch: Dispatch) => {
  getLodderUpdate(true, dispatch);
  try {
    let result = await axios.delete(
      `${CONVERSATIONS_URL.DELETE_CONVERSATION}`,
      { data: data }
    );
    // getLodderUpdate(false , dispatch)
    toast.success("Deleted successfully!");
    return result;
  } catch (err: any) {
    getLodderUpdate(false, dispatch);
    toast.error(err?.response?.data?.data);
  }
};

export const loaderAction = (dispatch: Dispatch) => {
  dispatch({ type: landingActionTypes.LIST_LOADER, payload: false });
};

export const setSelectedConversationInfo = (
  data: string,
  dispatch: Dispatch
) => {
  dispatch({
    type: landingActionTypes.SET_SELECTED_CONVERSATION_INFO,
    payload: data,
  });
};
export const setAgentType = (data: string, dispatch: Dispatch) => {
  dispatch({ type: landingActionTypes.SET_AGENT_TYPE, payload: data });
};
export const getUpdatedAllConversations = (data: any, dispatch: Dispatch) => {
  dispatch({
    type: landingActionTypes.SET_UPDATE_CONVERSATION_LIST,
    payload: true,
  });
  console.log(data, "updatetest");
  dispatch({
    type: landingActionTypes.GET_ALL_CONVERSATION_DETAILS,
    payload: data,
  });
};

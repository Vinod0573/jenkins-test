import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { accountNameState } from "../reducers/AccountNameReducers";

export enum popupUploadActionType {
  SET_AGENT_DETAILS = "SET_AGENT_DETAILS",
  SET_UPLOADED_FILES = "SET_UPLOADED_FILES",
  SET_IS_EDIT_ICON = "SET_IS_EDIT_ICON",
  SET_IS_LOADING = "SET_IS_LOADING"
}

export interface editDetails {
  type: popupUploadActionType.SET_IS_EDIT_ICON;
  payload: string;
}
export interface agentDetails {
  type: popupUploadActionType.SET_AGENT_DETAILS;
  payload: string;
}
export interface uploadedDetails {
  type: popupUploadActionType.SET_UPLOADED_FILES;
  payload: string;
}

export type projectActions = agentDetails | uploadedDetails | editDetails;

export const setAgentDetails = (dispatch: Dispatch, bodyData: any) => {
  console.log(bodyData);
  try {
    dispatch({
      type: popupUploadActionType.SET_AGENT_DETAILS,
      payload: bodyData,
    });
  } catch (err) {
    console.error(err);
  }
};

export const setUploadedFiles = (dispatch: Dispatch, bodyData: any) => {
  try {
    dispatch({
      type: popupUploadActionType.SET_UPLOADED_FILES,
      payload: bodyData,
    });
  } catch (err) {
    console.error(err);
  }
};

export const isEditIconClicked = async (data: any, dispatch: Dispatch) => {
  try {
    dispatch({
      type: popupUploadActionType.SET_IS_EDIT_ICON,
      payload: data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const setIsLoading=async(value:any,dispatch:Dispatch)=>{
  try {
      dispatch({type: popupUploadActionType.SET_IS_LOADING,  payload: value});
  } catch (err) {
  console.error(err);
  };
}

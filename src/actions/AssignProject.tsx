import axios from "axios";
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { assignProjectState } from "../reducers/AssignProjectReducers";
import { ASSIGN_PROJECT } from "../utilities/ApiRoutes";

export enum assignProjectActionTypes {
  ASSIGN_PROJECT_LIST = "ASSIGN_PROJECT_LIST",
  SET_SELECTED_ASSIGNED_PROJECT = "SET_SELECTED_ASSIGNED_PROJECT",
  SET_SELECTED_ACCOUNT_NAME="SET_SELECTED_ACCOUNT_NAME",
  SET_ASSIGNED_PROJECTS_CLIENTWISE="SET_ASSIGNED_PROJECTS_CLIENTWISE",
  SET_ALL_LANGUAGE = "SET_ALL_LANGUAGE",
  SET_SHOW_UPLOAD="SET_SHOW_UPLOAD",
  ERROR = "ERROR",
}
export interface assignProjectAction {
  type: assignProjectActionTypes.ASSIGN_PROJECT_LIST;
  payload: string;
}
export interface selectedProjectAction {
  type: assignProjectActionTypes.SET_SELECTED_ASSIGNED_PROJECT;
  payload: string;
}

export interface selectedAccountAction {
  type: assignProjectActionTypes.SET_SELECTED_ACCOUNT_NAME;
  payload: string;
}

export interface errorAction {
  type: assignProjectActionTypes.ERROR;
  errorMessage: string;
}

export interface getProjectByClientNameAction {
  type: assignProjectActionTypes.SET_ASSIGNED_PROJECTS_CLIENTWISE;
  payload: string;
}

export interface getAllLangauge{
  type: assignProjectActionTypes.SET_ALL_LANGUAGE;
  payload: string;
}

export interface showUploadModal{
  type: assignProjectActionTypes.SET_SHOW_UPLOAD;
  payload: string;
}

export type assignProjectActions =
  | assignProjectAction
  | selectedProjectAction
  | errorAction
  |selectedAccountAction
  |getProjectByClientNameAction
  | getAllLangauge
  | showUploadModal;

export const getAssignedProjectList = async (
  userName: string,
  dispatch: Dispatch
) => {
  try {
    let result = await axios.get(
      ASSIGN_PROJECT.GET_ASSIGNED_PROJECTS + userName
    );
    dispatch({
      type: assignProjectActionTypes.ASSIGN_PROJECT_LIST,
      payload: result.data.data,
    });
    return result;
  } catch (err) {}
};

export const setSelectedProjectDetail = async (
  data: any,
  dispatch: Dispatch,
  history: any,
  accName:any
) => {
  try {
    let result = await axios.get(
      ASSIGN_PROJECT.GET_ASSIGNED_PROJECTS_CLIENTWISE + accName
    );
    dispatch({
      type: assignProjectActionTypes.SET_ASSIGNED_PROJECTS_CLIENTWISE,
      payload: result.data.data,
    });
    dispatch({
      type: assignProjectActionTypes.SET_SELECTED_ASSIGNED_PROJECT,
      payload: data,
    });
    dispatch({
      type: assignProjectActionTypes.SET_SELECTED_ACCOUNT_NAME,
      payload: accName,
    })
    history.push("/annotator");
  } catch (err) {}
};


export const getAllLangauge = async(
  dispatch: Dispatch
) => {
  try {
    let result = await axios.get(
      ASSIGN_PROJECT.GET_ALL_LANGUAGE
    );
    dispatch({
      type: assignProjectActionTypes.SET_ALL_LANGUAGE,
      payload: result.data.data,
    });
    return result;
  } catch (err) {}
}

export const setIsUploadModal=(bodyData:any,dispatch: Dispatch)=>{
          try {
              dispatch({ type: assignProjectActionTypes.SET_SHOW_UPLOAD,payload: bodyData });
          } catch (err) {
          console.error(err);
      };

  }
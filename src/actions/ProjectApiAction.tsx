import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { homeState } from "../reducers/homeReducers";
import { PROJECT_DETAILS_URL, DELETE_USER_URL } from "../utilities/ApiRoutes";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";

export enum projectActionTypes {}

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const projectApi = async (bodyData: string) => {
  try {
    let result = await axios.post(
      PROJECT_DETAILS_URL.CREATE_PROJECT_URL,
      bodyData
    );
    //toast.success("Project Created");
    toast.success(result?.data?.data?.status?.status);
    return result;
  } catch (err: any) {
    console.error(err);
    // toast.error("Project Creation unsuccessfull");
    toast.error(err?.response?.data?.error);
  }
};

export const projectUpdateApi = async (bodyData: string) => {
  try {
    let result = await axios.post(
      PROJECT_DETAILS_URL.UPDATE_PROJECT_URL,
      bodyData
    );
    toast.success(result?.data?.data?.status?.status);
    //toast.success("Project Updated");
    return result;
  } catch (err: any) {
    console.error(err);
    toast.error(err?.response?.data?.error);
  }
};

export const getProjectDetail = async (Id: any) => {
  console.log(Id);
  try {
    let result = await axios.get(PROJECT_DETAILS_URL.GET_PROJECT_DETAIL + Id);
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const uploadedFilesList = async (id: any) => {
  try {
    let result = await axios.get(
      PROJECT_DETAILS_URL.GET_UPLODED_FILES + `?projectId=${id}`
    );
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const deleteDataUrl = async (id: any, adminUserId: string) => {
  let headers = {
    "Content-Type": "application/json",
    //userId: window.sessionStorage.getItem("Id"),
    userId: adminUserId,
    "x-access-token": window.sessionStorage.getItem("token"),
  };
  let data = { id: id };
  try {
    let result = await axios.delete(DELETE_USER_URL.DELETE_USER, {
      data: data,
      headers: headers,
    });
    toast.success("User Deleted Successfully");
    return result;
  } catch (err: any) {
    toast.error(err?.response?.data?.error || "User Deletion Unsuccessful!");
    console.error(err);
  }
};

export const deleteUserFromProject = async (
  id: any,
  userId: any,
  adminUserId: string
) => {
  let headers = {
    "Content-Type": "application/json",
    // userId: window.sessionStorage.getItem("Id"),
    // userId: "61bf0db859f3031717b673a8",
    userId: adminUserId,
    "x-access-token": window.sessionStorage.getItem("token"),
  };
  // let data={userId:[window.sessionStorage.getItem("Id")]}
  let data = { userId: [userId] };
  try {
    let result = await axios.post(
      DELETE_USER_URL.DELETE_PROJECT_USER + id,
      data,
      { headers: headers }
    );
    toast.success("User Deleted Successfully");
    return result;
  } catch (err: any) {
    toast.error(err?.response?.data?.error || "User Deletion Unsuccessful!");
    console.log(err);
  }
};

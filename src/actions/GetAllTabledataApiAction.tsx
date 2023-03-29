import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { homeState } from "../reducers/homeReducers";
import { FETCH_ALL_DATATABLE_URL } from "../utilities/ApiRoutes";
import axios from "axios";

export enum getAllTableData {
  GETALLTABLE_API = "GETALLTABLE_API",
  GET_ALL_TABLEDATA_BY_PROJECT = "GET_ALL_TABLEDATA_BY_PROJECT",
  LOAD_HOME = "LOAD_SELECTDOMAIN",
  ERROR = "ERROR",
  SET_TABLE_DATA = "SET_TABLE_DATA",
  SET_TABLE_DATA_BY_PROJECT = "SET_TABLE_DATA_BY_PROJECT",
  SET_FILTER_PARAMETERS = "SET_FILTER_PARAMETERS",
  CLEAR_ALL_FILTER_PARAMETERS = "CLEAR_ALL_FILTER_PARAMETERS",
  CLEAR_ALL_FILTER_PARAMETERS_MU = "CLEAR_ALL_FILTER_PARAMETERS_MU",
  SET_SHOW_MANUAL_UNIQUE_MODAL = "SET_SHOW_MANUAL_UNIQUE_MODAL",
}

export interface getAllTableDataApiAction {
  type: getAllTableData.GETALLTABLE_API;
  payload: string;
}
export interface setTableDataApiAction {
  type: getAllTableData.SET_TABLE_DATA;
  payload: {
    totalPages: number;
    next?: object;
    previous?: object;
    result?: object[];
    results?: object[];
    isItFilteredData: boolean;
  };
}

export interface setTableDataByProjectApiAction {
  type: getAllTableData.SET_TABLE_DATA_BY_PROJECT;
  payload: {
    totalPages: number;
    next?: object;
    previous?: object;
    result?: object[];
    results?: object[];
    isItFilteredData: boolean;
  };
}

export interface getAllTableByProjectNameApiAction {
  type: getAllTableData.GET_ALL_TABLEDATA_BY_PROJECT;
  payload: string;
}

export interface errorAction {
  type: getAllTableData.ERROR;
  errorMessage: string;
}
export interface setFilterParametersAction {
  type: getAllTableData.SET_FILTER_PARAMETERS;
  payload: {
    selectedData: string[];
    columnName: string;
  };
}
export interface clearAllFilterParametersAction {
  type: getAllTableData.CLEAR_ALL_FILTER_PARAMETERS;
}
export interface clearAllFilterParametersMUAction {
  type: getAllTableData.CLEAR_ALL_FILTER_PARAMETERS_MU;
}

export interface setShowManualUniqueModalAction {
  type: getAllTableData.SET_SHOW_MANUAL_UNIQUE_MODAL;
  payload: boolean;
}

export type getAllTableDataApiActions =
  | getAllTableDataApiAction
  | getAllTableByProjectNameApiAction
  | errorAction
  | setFilterParametersAction
  | setTableDataApiAction
  | clearAllFilterParametersAction
  | setShowManualUniqueModalAction
  | clearAllFilterParametersMUAction
  | setTableDataByProjectApiAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllTabledata = async (
  dispatch: any,
  accountName: string,
  page: string
) => {
  try {
    let data = `${page}`;
    let result = await axios.get(
      `${FETCH_ALL_DATATABLE_URL.FETCH_ALL_USER_API}${data}`
    );
    if (result.data) {
      dispatch({
        type: getAllTableData.GETALLTABLE_API,
        payload: result.data?.data,
      });
    }

    return result;
  } catch (err) {
    console.error(err);
    dispatch({ type: getAllTableData.ERROR, errorMessage: err });
  }
};
// Instead of this use 'getTableDataAllTypes', common action.
export const getAllDataInTableByProject = async (
  dispatch: any,
  projectName: string
) => {
  try {
    let result = await axios.get(
      `${FETCH_ALL_DATATABLE_URL.FETCH_TABLEDATA_BY_PROJECTNAME}${projectName}`
    );
    if (result.data) {
      dispatch({
        type: getAllTableData.GET_ALL_TABLEDATA_BY_PROJECT,
        payload: result.data?.data,
      });
    }

    return result?.data?.data;
  } catch (err) {
    console.error(err);
    dispatch({ type: getAllTableData.ERROR, errorMessage: err });
  }
};

// Action to fetch table data (all, byProjectName, byFilter)
let cancelTokenData: any;
export const getTableDataAllTypes = async (
  dispatch: any,
  page: number,
  limit: number,
  filterParameters: any,
  projectName: string
) => {
  try {
    type bodyDataType = {
      page: number;
      limit: number;
      userName?: string;
      projectName?: string;
      languages?: string[];
      role?: string;
      status?: boolean;
    };
    const bodyData: bodyDataType = { page, limit };
    if (filterParameters?.language) {
      bodyData.languages = filterParameters.language;
    }
    if (filterParameters?.userName) {
      bodyData.userName = filterParameters.userName;
    }
    if (filterParameters?.role) {
      bodyData.role = filterParameters.role;
    }
    if (filterParameters?.status) {
      bodyData.status = filterParameters.status[0] === "Enabled" ? true : false;
    }
    if (projectName) {
      bodyData.projectName = projectName;
    }
    const isItFilteredData = Object.keys(filterParameters).length !== 0;

    if (typeof cancelTokenData != typeof undefined) {
      cancelTokenData.cancel("cancelled due to new request.");
    }
    cancelTokenData = axios.CancelToken.source();

    const result = await axios.post(
      `${FETCH_ALL_DATATABLE_URL.FETCH_TABLE_DATA_ALL_TYPES}`,
      bodyData,
      { cancelToken: cancelTokenData.token }
    );
    if (result.data) {
      const responseData = result.data?.data;
      responseData.isItFilteredData = isItFilteredData;
      // console.log("projectName",projectName?.length > 0);
      if (projectName?.length > 0) {
        dispatch({
          type: getAllTableData.SET_TABLE_DATA_BY_PROJECT,
          payload: responseData,
        });
      } else {
        dispatch({
          type: getAllTableData.SET_TABLE_DATA,
          payload: responseData,
        });
      }
    }
    return result;
  } catch (err) {
    console.error(err);
    // dispatch({type : getAllTableData.ERROR ,
    //   errorMessage: err
    // })
  }
};

export const targetDateUpdatedApi = async (bodyData: any) => {
  try {
    let result = await axios.post(
      FETCH_ALL_DATATABLE_URL.TARGET_TIMELINE_URL,
      bodyData
    );

    // toast.success("Project Updated");
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getAllTableDataRole = async (dispatch: any) => {
  try {
    let result = await axios.get(
      `${FETCH_ALL_DATATABLE_URL.FETCH_ALL_TABLE_DATA_ROLE}`
    );

    type itemType = { name: string };
    const allRoles = result.data.data.map((item: itemType) => item.name);

    return allRoles;
  } catch (err) {
    console.error(err);
    dispatch({ type: getAllTableData.ERROR, errorMessage: err });
  }
};

// filter parameter actions
export const setFilterParameters = (
  dispatch: any,
  selectedData: string[],
  columnName: string
) => {
  try {
    dispatch({
      type: getAllTableData.SET_FILTER_PARAMETERS,
      payload: { selectedData, columnName },
    });
  } catch (err) {
    console.log(err);
  }
};
export const clearAllFilterParameters = (dispatch: any) => {
  try {
    dispatch({ type: getAllTableData.CLEAR_ALL_FILTER_PARAMETERS });
  } catch (err) {
    console.log(err);
  }
};
export const clearAllFilterParametersMUAction = (dispatch: any) => {
  dispatch({ type: getAllTableData.CLEAR_ALL_FILTER_PARAMETERS_MU });
};

// show manual unique modal action
export const setShowManualUniqueModalAction = (
  dispatch: any,
  data: boolean
) => {
  dispatch({
    type: getAllTableData.SET_SHOW_MANUAL_UNIQUE_MODAL,
    payload: data,
  });
};

import { array } from 'prop-types';
import { Reducer } from 'redux';
import { assignProjectActionTypes, assignProjectActions } from "../actions/AssignProject";

export interface assignProjectState {
    assignedList: any,
    errorMessage: string;
}

const initialAssignedState: assignProjectState = {
    assignedList: [],
    errorMessage: ''
};

export const assignProjectApiReducer: Reducer<assignProjectState, assignProjectActions> = (
    state = initialAssignedState,
    action
  ) => {
    switch (action.type) {
      case assignProjectActionTypes.ASSIGN_PROJECT_LIST: {
        return {
          ...state,
          assignedProjectList:action.payload
        };
      }
      case assignProjectActionTypes.SET_ASSIGNED_PROJECTS_CLIENTWISE: {
        return {
          ...state,
          assignedProjectListClientWise:action.payload
        };
      }
      case assignProjectActionTypes.ERROR: {
        return {
          ...state,
          errorMessage: action.errorMessage,
          image: ''
        }
      }
      case assignProjectActionTypes.SET_SELECTED_ASSIGNED_PROJECT: {
        return {
          ...state,
          assignedProjectDetails: action.payload
        }
      }
      case assignProjectActionTypes.SET_SELECTED_ACCOUNT_NAME:{
        return {
          ...state,
          assignedAccountName: action.payload
        }
      }
      case assignProjectActionTypes.SET_ALL_LANGUAGE:{
        return {
          ...state,
          allLangaugeList: action.payload
        }
      }
      case assignProjectActionTypes.SET_SHOW_UPLOAD:{
        return {
          ...state,
          isUpload: action.payload
        }
      }
      default:
        return state;
    }
  };

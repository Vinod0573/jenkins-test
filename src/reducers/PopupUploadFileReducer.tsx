import { Reducer } from "redux";
import {
  popupUploadActionType,
} from "../actions/PopupUploadFileAction";

export interface popupState {
  filename: string;
  filedata: string;
  fileurl: string;
}

const initialFileNameState: popupState = {
  filename: "",
  filedata: "",
  fileurl: "",
};

export const popupUploadoadReducer: Reducer<popupState, any> = (
  state = initialFileNameState,
  action
) => {
  switch (action.type) {
    case popupUploadActionType.SET_AGENT_DETAILS: {
      return {
        ...state,
        agentDetails: action.payload,
      };
    }
    case popupUploadActionType.SET_UPLOADED_FILES: {
      return {
        ...state,
        uploadedDetails: action.payload,
      };
    }
    case popupUploadActionType.SET_IS_EDIT_ICON:{
      return {
        ...state,
        isEditClicked: action.payload,
      };
    }
    case popupUploadActionType.SET_IS_LOADING:{
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    default:
      return state;
  }
};
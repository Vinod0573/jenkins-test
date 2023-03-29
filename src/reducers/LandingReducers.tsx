import { Reducer } from "redux";
import {
  landingActionTypes,
  leftSideLandingActions,
} from "../actions/LeftSideLandingAction";

export interface landingState {
  conversationList: any;
}

const initialLandingState: landingState = {
  conversationList: [],
};

export const landingReducer: Reducer<landingState, leftSideLandingActions> = (
  state = initialLandingState,
  action
) => {
  switch (action.type) {
    case landingActionTypes.GET_ALL_CONVERSATION_DETAILS: {
      return {
        ...state,
        conversationList: action.payload,
      };
    }
    case landingActionTypes.SET_SELECTED_CONVERSATION_INFO: {
      return {
        ...state,
        selectedConversationInfo: action.payload,
      };
    }
    case landingActionTypes.LIST_LOADER: {
      return {
        ...state,
        listLoader: action.payload,
      };
    }
    case landingActionTypes.SET_AGENT_TYPE: {
      return {
        ...state,
        agentTyperedux: action.payload,
      };
    }
    case landingActionTypes.SET_UPDATE_CONVERSATION_LIST: {
      return {
        ...state,
        updateListHighlight: action.payload,
      };
    }
    case landingActionTypes.RESET_LANDING_STATE: {
      return initialLandingState;
    }
    default:
      return state;
  }
};

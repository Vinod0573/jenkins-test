import { Action } from "redux";
import { DemoState } from "./Demo.interface";
import { Reducer } from "react";
import DEMO_ACTION_TYPES from "./Demo.actionTypes";

const initial_state: DemoState = {
  audioFile: "",
  asrResponse: {
    data: undefined,
    isLoading: false,
    error: undefined,
  },
  state: "UPLOAD",
};
export const DemoReducer: Reducer<DemoState, any> = (
  state: DemoState = initial_state,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case DEMO_ACTION_TYPES.DEMO_GET_AUTO_CHUNK_API_CALL: {
      return {
        ...state,
        asrResponse: { data: undefined, isLoading: true, error: undefined },
      };
    }
    case DEMO_ACTION_TYPES.DEMO_GET_AUTO_CHUNK_API_SUCCESS: {
      return {
        ...state,
        asrResponse: {
          data: action.payload,
          isLoading: false,
          error: undefined,
        },
      };
    }
    case DEMO_ACTION_TYPES.DEMO_GET_AUTO_CHUNK_API_FAILURE: {
      return {
        ...state,
        asrResponse: {
          data: undefined,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    case DEMO_ACTION_TYPES.DEMO_SET_LOCAL_AUDIO_URL: {
      return { ...state, audioFile: action.payload };
    }
    case DEMO_ACTION_TYPES.DEMO_SET_STATE: {
      return { ...state, state: action.payload };
    }
    case DEMO_ACTION_TYPES.DEMO_RESET: {
      return { ...initial_state };
    }
    default: {
      return state;
    }
  }
};

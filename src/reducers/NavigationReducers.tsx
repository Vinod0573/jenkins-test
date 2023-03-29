import { Reducer } from "redux";
import {
  messageListActionTypes,
  messageActions,
} from "../actions/NavigationComponentApiAction";

export interface messageListState {
  messageList: any;
}

const initialMessageState: messageListState = {
  messageList: [],
};

export const navigationReducer: Reducer<messageListState, messageActions> = (
  state = initialMessageState,
  action
) => {
  switch (action.type) {
    case messageListActionTypes.MESSAGE_LIST: {
      //    const newList={...state,}
      // let data=  action.payload?.sort((a:any ,b:any) => {
      //   if(a?.tags?.startTime && b?.tags?.startTime){
      //     return a?.tags?.startTime - b?.tags?.startTime
      //   }
      // })
      return {
        ...state,
        messageList: action.payload,
      };
    }
    case messageListActionTypes.SET_CONVERSATION_ID: {
      return {
        ...state,
        conversationId: action.payload,
      };
    }
    case messageListActionTypes.LOADING: {
      return {
        ...state,
        loadingmessageList: action.payload,
      };
    }
    case messageListActionTypes.GET_TAG_DATA: {
      return {
        ...state,
        tagDropdownData: action.payload,
      };
    }
    case messageListActionTypes.SEND_CHUNK_DATA: {
      return {
        ...state,
        chunkDataReturn: action.payload,
      };
    }
    case messageListActionTypes.CHUNKING_MSG_LIST: {
      return {
        ...state,
        chunkmsgListData: action.payload,
      };
    }
    case messageListActionTypes.CHUNK_START_END_TIME: {
      console.log(action.payload);
      return {
        ...state,
        chunkStartEndTime: action.payload,
      };
    }
    case messageListActionTypes.AUDIO_PLAY_PAUSE: {
      console.log(action.payload);
      return {
        ...state,
        audioPlayOrPause: action.payload,
      };
    }
    case messageListActionTypes.AUDIO_REPLAY: {
      console.log(action.payload);
      return {
        ...state,
        audioReplay: action.payload,
      };
    }
    case messageListActionTypes.AGENT_TOGGLE: {
      console.log(action.payload);
      return {
        ...state,
        agentTypeByToggle: action.payload,
      };
    }
    case messageListActionTypes.RESET_CHUNKING_DATA: {
      return initialMessageState;
    }
    default:
      return state;
  }
};

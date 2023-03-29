import axios from "axios";
import { Dispatch } from "redux";
import { MESSAGE_LIST_URL } from "../utilities/ApiRoutes";
import { getLodderUpdate } from "./LodderUpdate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export enum messageListActionTypes {
  MESSAGE_LIST = "MESSAGE_LIST",
  SET_CONVERSATION_ID = "SET_CONVERSATION_ID",
  LOADING = "LOADING",
  GET_TAG_DATA = "GET_TAG_DATA",
  SEND_CHUNK_DATA = "SEND_CHUNK_DATA",
  CHUNKING_MSG_LIST = "CHUNKING_MSG_LIST",
  CHUNK_START_END_TIME = "CHUNK_START_END_TIME",
  POST_TAG_DATA = "POST_TAG_DATA",
  AUDIO_PLAY_PAUSE = "AUDIO_PLAY_PAUSE",
  AUDIO_REPLAY = "AUDIO_REPLAY",
  AGENT_TOGGLE = "AGENT_TOGGLE",
  RESET_CHUNKING_DATA = "RESET_CHUNKING_DATA",
  ERROR = "ERROR",
}

export interface messageAction {
  type: messageListActionTypes.MESSAGE_LIST;
  payload: any;
}

export interface conversationIdAction {
  type: messageListActionTypes.SET_CONVERSATION_ID;
  payload: string;
}
export interface messageLoading {
  type: messageListActionTypes.LOADING;
  payload: boolean;
}

export interface errorAction {
  type: messageListActionTypes.ERROR;
  errorMessage: string;
}
export interface getTagData {
  type: messageListActionTypes.GET_TAG_DATA;
  payload: any;
}

export interface sendChunk {
  type: messageListActionTypes.SEND_CHUNK_DATA;
  payload: any;
}
export interface chunkmsgAction {
  type: messageListActionTypes.CHUNKING_MSG_LIST;
  payload: any;
}
export interface chunkmsgTimeAction {
  type: messageListActionTypes.CHUNK_START_END_TIME;
  payload: any;
}
export interface postTag {
  type: messageListActionTypes.POST_TAG_DATA;
  payload: any;
}

export interface getaudioplayorpauseAction {
  type: messageListActionTypes.AUDIO_PLAY_PAUSE;
  payload: any;
}
export interface getaudioreplayAction {
  type: messageListActionTypes.AUDIO_REPLAY;
  payload: any;
}
export interface getAgentToggleAction {
  type: messageListActionTypes.AGENT_TOGGLE;
  payload: any;
}
export interface resetChunkingData {
  type: messageListActionTypes.RESET_CHUNKING_DATA;
  payload: any;
}
export type messageActions =
  | messageAction
  | conversationIdAction
  | errorAction
  | messageLoading
  | getTagData
  | sendChunk
  | chunkmsgAction
  | chunkmsgTimeAction
  | getaudioplayorpauseAction
  | getaudioreplayAction
  | postTag
  | getAgentToggleAction
  | resetChunkingData;

export const resetChunkingDataAction = async (dispatch: Dispatch) => {
  dispatch({ type: messageListActionTypes.RESET_CHUNKING_DATA });
};
/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getMessageList = async (
  id: any,
  messagetype: string,
  dispatch: Dispatch
) => {
  dispatch({ type: messageListActionTypes.LOADING, payload: true });

  try {
    if (!id) {
      dispatch({ type: messageListActionTypes.MESSAGE_LIST, payload: [] });
      dispatch({
        type: messageListActionTypes.SET_CONVERSATION_ID,
        payload: "",
      });
      dispatch({ type: messageListActionTypes.LOADING, payload: false });
    } else {
      let url = MESSAGE_LIST_URL.GET_MESSAGE_LIST_EXTERNAL;
      let result = await axios.get(`${url}${id}`, {
        params: {
          messageType: messagetype,
        },
      });

      if (result.data) {
        dispatch({
          type: messageListActionTypes.MESSAGE_LIST,
          payload: result.data?.data,
        });
        dispatch({
          type: messageListActionTypes.SET_CONVERSATION_ID,
          payload: id,
        });
        dispatch({ type: messageListActionTypes.LOADING, payload: false });
        getLodderUpdate(false, dispatch);
      }
      return result;
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: messageListActionTypes.ERROR, errorMessage: err });
    dispatch({ type: messageListActionTypes.LOADING, payload: false });
    getLodderUpdate(false, dispatch);
  }
};

export const getTagDropdownData = async (dispatch: Dispatch) => {
  try {
    let result = await axios.get(MESSAGE_LIST_URL.GET_TAG_DATA);
    if (result.data) {
      dispatch({
        type: messageListActionTypes.GET_TAG_DATA,
        payload: result.data,
      });
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};
export const postTagsForDropdown = async (dispatch: Dispatch, info: any) => {
  try {
    let result = await axios.post(MESSAGE_LIST_URL.POST_TAG_DATA, info);
    if (result.data) {
      dispatch({
        type: messageListActionTypes.POST_TAG_DATA,
        payload: result.data,
      });
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

export const postChunkingTime = async (info: any, dispatch: Dispatch) => {
  getLodderUpdate(true, dispatch);

  try {
    let result = await axios.post(MESSAGE_LIST_URL.POST_CHUNKING, info);
    if (result.data) {
      dispatch({
        type: messageListActionTypes.SEND_CHUNK_DATA,
        payload: result.data,
      });
      dispatch({
        type: messageListActionTypes.CHUNKING_MSG_LIST,
        payload: result.data?.data,
      });
      getLodderUpdate(false, dispatch);
      toast.success("Audio chunked successfully!");
    }
  } catch (err: any) {
    getLodderUpdate(false, dispatch);
    toast.error(err?.response?.data?.data);
  }
};

export const chunkingMsgList = async (data: any, dispatch: Dispatch) => {
  dispatch({ type: messageListActionTypes.CHUNKING_MSG_LIST, payload: data });
};
export const chunkStartEndTime = async (dispatch: Dispatch, data: any) => {
  dispatch({
    type: messageListActionTypes.CHUNK_START_END_TIME,
    payload: data,
  });
};
export const getAudioPlayOrPause = async (
  dispatch: Dispatch,
  data: boolean
) => {
  dispatch({ type: messageListActionTypes.AUDIO_PLAY_PAUSE, payload: data });
};
export const getAudioReplay = async (dispatch: Dispatch, data: boolean) => {
  dispatch({ type: messageListActionTypes.AUDIO_REPLAY, payload: data });
};
export const getAgentTypeByToggleButton = async (
  dispatch: Dispatch,
  data: any
) => {
  dispatch({ type: messageListActionTypes.AGENT_TOGGLE, payload: data });
};

export const getMsgListwithLiveChunk = async (
  dispatch: Dispatch,
  data: any
) => {
  dispatch({ type: messageListActionTypes.MESSAGE_LIST, payload: data });
};

//export const set

import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { homeState } from "../reducers/homeReducers";
import { CONVERSATIONS_URL, GET_ALL_CONVERSATION_URL } from "../utilities/ApiRoutes";
import axios from "axios";

export enum getAllConversation {
  GET_ALL_CONVERSATIONAPI = "GET_ALL_CONVERSATIONAPI",
  SET_SELECTED_CONVERSATION= "SET_SELECTED_CONVERSATION",
  LOAD_HOME = "LOAD_SELECTDOMAIN",
  SET_SELECTED_CONVERSATION_SUMMARY= "SET_SELECTED_CONVERSATION_SUMMARY",
  SET_TYPE_OF_MESSAGE = "SET_TYPE_OF_MESSAGE",
  ERROR = "ERROR",
}

export interface getAllConversationApiAction {
  type: getAllConversation.GET_ALL_CONVERSATIONAPI;
  payload: string;
}

export interface setSelectedApiAction {
    type: getAllConversation.SET_SELECTED_CONVERSATION;
    payload: string;
}
export interface setSelectedConversationsummaryAction {
    type: getAllConversation.SET_SELECTED_CONVERSATION_SUMMARY;
    payload: boolean;
}
export interface setTypeofMessageAction {
  type: getAllConversation.SET_TYPE_OF_MESSAGE;
  payload: boolean;
}

export interface errorAction {
  type: getAllConversation.ERROR;
  errorMessage: string;
}
export type getAllConversationApiActions =
  | getAllConversationApiAction
  | setSelectedApiAction
  | setSelectedConversationsummaryAction
  |setTypeofMessageAction
  | errorAction|any;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllConversationData = async (dispatch: any, data: any, name:any) => {
  try {
    let result = await axios.get(
      `${GET_ALL_CONVERSATION_URL.ALL_CONVERSATION_URL}${data}${'&project='}${name}`
    );
    if (result.data) {
      dispatch({
        type: getAllConversation.GET_ALL_CONVERSATIONAPI,
        payload: result.data?.data,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: getAllConversation.ERROR, errorMessage: err });
  }
};

export const setSelectedMessageDetails = async (dispatch: any, data: any) => {
    console.log(data)
    dispatch({
        type: getAllConversation.SET_SELECTED_CONVERSATION,
        payload: data,
      });
};
export const showSummaryofConversation = async (dispatch: any, data: any) => {
  console.log(data)
  dispatch({
      type: getAllConversation.SET_SELECTED_CONVERSATION_SUMMARY,
      payload: data,
    });
};
export const setTypeofMessage = async (dispatch: any, data: any) => {
  console.log(data)
  dispatch({
      type: getAllConversation.SET_TYPE_OF_MESSAGE,
      payload: data,
    });
};

export const updateTextLanguage=async (datas:any,si:any,url:any,dispatch:any)=>{
  const data=JSON.parse(JSON.stringify(datas))
  data['messageId']=data.id;;
  data['sessionId']=si;
  
  data['recordingFileUrl']=url;
  data['startTime']=data.tags.startTime;
  data['endTime']=data.tags.endTime;
  delete data['id']
   await axios.post(`${CONVERSATIONS_URL.UPDATE_LANGUAGE}`,data)
 
}
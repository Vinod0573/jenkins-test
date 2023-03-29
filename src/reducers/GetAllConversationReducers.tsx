import { Reducer } from 'redux';
import { getAllConversation ,getAllConversationApiActions} from "../actions/GetAllConversationApiAction";
import TransciptAudioActionTypes from '../actions/TranscriptAudioAction';

export interface getAllConversationApiState{
  getAllConversationData: string;
    getSelectedData:string;
    transcriptAudioPlay:boolean,
    transcriptAudioPlayStartEnd:any,
    refreshPlay:any

}

const initialgetAllConversationApiState: getAllConversationApiState= {
  getAllConversationData : '',
    getSelectedData:'',
    transcriptAudioPlay:false,
    transcriptAudioPlayStartEnd:{startTime:'',endTime:''}
    ,
    refreshPlay:{}

};

export const getAllConversationDataApiReducer: Reducer<getAllConversationApiState,getAllConversationApiActions> = (
    state = initialgetAllConversationApiState,
    action
  ) => {
    switch (action.type) {
      case getAllConversation.GET_ALL_CONVERSATIONAPI : {
        return {
          ...state,
          getAllConversationData :action.payload
        };
      }
      case getAllConversation.SET_SELECTED_CONVERSATION : {
        return {
          ...state,
          getSelectedData :action.payload
        };
      }
      case getAllConversation.SET_SELECTED_CONVERSATION_SUMMARY : {
        return {
          ...state,
          showSummaryforConversation :action.payload
        };
      }
      case getAllConversation.SET_TYPE_OF_MESSAGE : {
        return {
          ...state,
          typeOfMessage :action.payload
        };
      }
      case TransciptAudioActionTypes.SET_PLAY:
        return {
        ...state,transcriptAudioPlay:action.payload
      }
      case TransciptAudioActionTypes.TOGGLE_PLAY:
        return {
          ...state,transcriptAudioPlay:!state.transcriptAudioPlay
        }
        case TransciptAudioActionTypes.SET_DATA_FOR_START_END_IN_TRANSCRIPT:
          return {
            ...state,
            transcriptAudioPlayStartEnd:action.payload
          }
          case TransciptAudioActionTypes.REFRESH_PLAY:
            return {
              ...state,
              refreshPlay:{}
            }
      default:
        return state;
    }
  };
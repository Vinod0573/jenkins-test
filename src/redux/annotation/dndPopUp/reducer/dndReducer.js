import  {FILE_UPLOAD_ACTION_TYPE}  from "../action/index.js";
export  default function dndPopUpReducer(state={},action){


    switch(action.type){
        case FILE_UPLOAD_ACTION_TYPE.SET_META_DATA_TYPE:{
            return{
                ...state,
             metaDataType:action.payload
            }
        }
    }
}
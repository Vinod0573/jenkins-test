 export const FILE_UPLOAD_ACTION_TYPE={
  SET_FILE_DATA:"SET_FILE_DATA",
  SET_FILE_NAME:"SET_FILE_NAME",
  SET_UPLOAD_HISTORY:"SET_UPLOAD_HISTORY",
  SET_UPLOAD_URI:"SET_UPLOAD_URI",
  SET_UPLOAD_PROGRESS:"SET_UPLOAD_PROGRESS",
  SET_META_DATA_TYPE:"META_DATA_TYPE",
  SET_META_DATA_LANGUAGE:"META_DATA_LANGUAGE",
  SET_META_DATA_FORMAT:"SET_META_DATA_FORMAT",
  SET_META_DATA_LEVEL:"SET_META_DATA_FORMAT",

};

export const setFileData=(data)=>{
    return async function(dispatch){
        dispatch({
          type:FILE_UPLOAD_ACTION_TYPE.SET_FILE_DATA,
          payload: data
        })
      }
}
export const setFileName=(name)=>{

    return async function(dispatch){
        dispatch({
          type:FILE_UPLOAD_ACTION_TYPE.SET_FILE_NAME,
          payload: name
        })
      }
}

export const setUploadHistory= () => {

    return  async function (dispatch) {
    //  try {
    //    const res =  await axios.get(SCHEDULERSECTION.GET_CAMPAIGN_CONDITION);
    //    const tempData = res.data.data;
       dispatch({
         type: FILE_UPLOAD_ACTION_TYPE.SET_UPLOAD_HISTORY,
         payload: "OK",
       });
    //    return tempData;
    //  } catch (e) {
    //    console.log(e);
    //  }
   };
  };

  export const setMetaDataType=(data)=>{
return function (dispatch) {
    dispatch({
        type:FILE_UPLOAD_ACTION_TYPE.SET_META_DATA_TYPE,
        payload:data
    })

}

  }
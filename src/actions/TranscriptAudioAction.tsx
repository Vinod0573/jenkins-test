
 const TransciptAudioActionTypes={
   SET_PLAY:"SET_PLAY",
   TOGGLE_PLAY:"TOGGLE_PLAY",
   SET_DATA_FOR_START_END_IN_TRANSCRIPT:'SET_DATA_FOR_START_END_IN_TRANSCRIPT',
   REFRESH_PLAY:"REFRESH_PLAY"
   
 }

 export  function setPlayTranscriptAudio(data:boolean){
    return {type:TransciptAudioActionTypes.SET_PLAY,
        payload:data}

 }

 export function togglePlayTranscriptAudio(){
    return {
        type:TransciptAudioActionTypes.TOGGLE_PLAY
    }
 }
 
 export function setStartEndTranscriptAudio(data:any){

 return {
        type:TransciptAudioActionTypes.SET_DATA_FOR_START_END_IN_TRANSCRIPT,
        payload:data
    }
 }
 export function refreshPlayTranscript(){
  return {
    type:TransciptAudioActionTypes.REFRESH_PLAY
    
}
}
 export default  TransciptAudioActionTypes;

 
import { DemoState, pageState } from "./Demo.interface";

import DEMO_ACTION_TYPES from "./Demo.actionTypes";
/**
 * go to annotation and upload page
 * @param page
 * @returns
 */
export function setDemoPageState(page: pageState) {
  return { type: DEMO_ACTION_TYPES.DEMO_SET_STATE, payload: page };
}
export function setDemoLocalAudioUrl(url: string) {
  return { type: DEMO_ACTION_TYPES.DEMO_SET_LOCAL_AUDIO_URL, payload: url };
}

export function getTheChunking(audioFile: any, lang_id: string) {
  return {
    type: DEMO_ACTION_TYPES.DEMO_GET_AUTO_CHUNK_API_CALL,
    payload: { audioFile, lang_id },
  };
}
export function demoReset() {
  return {
    type: DEMO_ACTION_TYPES.DEMO_RESET,
  };
}

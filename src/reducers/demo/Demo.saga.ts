import { call, put, takeLatest } from "redux-saga/effects";
import DEMO_ACTION_TYPES from "./Demo.actionTypes";
import axios from "axios";
import { GET_DEMO_CHUNK } from "../../utilities/ApiRoutes";
import { setDemoLocalAudioUrl, setDemoPageState } from "./Demo.action";
import { toast } from "react-toastify";
import { Toast } from "react-toastify/dist/components";

/**
 * Api developed by sanket
 */
function* demoAudioChunkApiSaga(action: {
  type: string;
  payload: { audioFile: any; lang_id: string };
}): any {
  try {
    const formData = new FormData();
    formData.append("file", action.payload.audioFile);
    formData.append("lang_id", action.payload.lang_id);
    const result: any = yield call(
      axios.post,
      GET_DEMO_CHUNK as string,
      formData
    );
    // console.log(result, "demo data");
    if (result.data) {
      yield put({
        type: DEMO_ACTION_TYPES.DEMO_GET_AUTO_CHUNK_API_SUCCESS,
        payload: result.data,
      });
      const url = URL.createObjectURL(action.payload.audioFile);
      yield put(setDemoLocalAudioUrl(url));
      yield put(setDemoPageState("DEMO_ANNOTATE"));
    }
  } catch (error) {
    console.error(error);
    toast.error("Not able to upload ");
    yield put({
      type: DEMO_ACTION_TYPES.DEMO_GET_AUTO_CHUNK_API_FAILURE,
      payload: error,
    });
  }
}
export default function* demoSagaWatcher(): any {
  yield takeLatest(
    DEMO_ACTION_TYPES.DEMO_GET_AUTO_CHUNK_API_CALL,
    demoAudioChunkApiSaga
  );
}

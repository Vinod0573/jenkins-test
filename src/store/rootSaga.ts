import { all, fork } from "redux-saga/effects";

import * as demoSaga from "../reducers/demo/Demo.saga";
export function* rootSaga() {
  yield all([...Object.values(demoSaga)].map(fork));
}

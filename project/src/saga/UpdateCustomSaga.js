import React, { useEffect } from "react";
import { View } from "react-native";
import { takeLatest, put, call } from "redux-saga/effects";
import {ExecuteSQL} from './OpenDatabase'
import {
  UPDATE_CUSTOM,
  UPDATE_CUSTOM_SUCCESS,
  UPDATE_CUSTOM_FAILED,
} from "../actions/actionType";


function* HandleUpdateCustom(action) {
    console.log(`actionUpdateCustom:  `, action);
    const dataUpdate = action.obj;
    console.log("dataUpdate : ", dataUpdate);
    const results = yield call(ExecuteSQL, "UPDATE Customer set name=?, phone=?, address=?, image=?, note=? WHERE id=?;",
     [dataUpdate.name, dataUpdate.phone, dataUpdate.address, dataUpdate.image, dataUpdate.note, dataUpdate.id]);

  console.log("results: ", results.rowsAffected);
  // var len = results.rowsAffected;
  // if(len >= 0){
  //   console.log("UpdateCustomSuccess", len);
  //   yield put({ type: UPDATE_CUSTOM_SUCCESS, len });
  // }
}

export function* watchUpdateCustom() {
  console.log("SAGA_WATCH_UPDATE_CUSTOM");
  yield takeLatest(UPDATE_CUSTOM, HandleUpdateCustom);
}

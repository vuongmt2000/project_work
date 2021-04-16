import React, { useEffect } from "react";
import { View } from "react-native";
import { takeLatest, put, call } from "redux-saga/effects";
import {ExecuteSQL} from './OpenDatabase'
import {
 ADD_CUSTOM, ADD_CUSTOM_FAILED, ADD_CUSTOM_SUCCESS
} from "../actions/actionType";


function* HandleAddCustom(action) {
    console.log(`actionUpdateCustom:  `, action);
    const dataUpdate = action.newCustom;
    console.log("dataUpdate : ", dataUpdate);
    const results = yield call(ExecuteSQL, "INSERT INTO Customer VALUES (? , ?, ?, ?, ?, ?)",
     [ null ,dataUpdate.name, dataUpdate.phone, dataUpdate.address, dataUpdate.image, dataUpdate.note]);
     
}

export function* watchAddCustom() {
  console.log("SAGA_WATCH_ADD_CUSTOM");
  yield takeLatest(ADD_CUSTOM, HandleAddCustom);
}

import React, { useEffect } from "react";
import { View } from "react-native";
import { takeLatest, put, call } from "redux-saga/effects";
import {ExecuteSQL} from './OpenDatabase'
import {
  FETCH_PLACE,
  FETCH_PLACE_FAILED,
  FETCH_PLACE_SUCCESS,
} from "../actions/actionType";


function* HandleFetchPlace(action) {
  const results = yield call(ExecuteSQL, "SELECT * from Customer JOIN Place JOIN Place_Prodcut JOIN Product on Customer.id = Place.id_Customer and Place.id = Place_Prodcut.id_place and Product.id = Place_Prodcut.id_prouct;", []);

  console.log("results:", results);
  var len = results.rows.length;
  const data = [];

  for (let i = 0; i < len; i++) {
    let row = results.rows.item(i);
    data.push(row)
  }

  if (data?.length > 0) {
    // console.log("dataFetchSaga", data);
    yield put({ type: FETCH_PLACE_SUCCESS, data });
  }
  else {
    yield put({ type: FETCH_PLACE_FAILED, data });
  }
}

export function* watchFetchPlace() {
  console.log("SAGA_WATCH_FETCH_PLACE");
  yield takeLatest(FETCH_PLACE, HandleFetchPlace);
  
}

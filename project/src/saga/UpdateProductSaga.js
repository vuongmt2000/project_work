import React, { useEffect } from "react";
import { View } from "react-native";
import { takeLatest, put, call } from "redux-saga/effects";
import { ExecuteSQL } from "./OpenDatabase";
import {
  FETCH_LIST_PRODUCT,
  FETCH_LIST_PRODUCT_SUCCESS,
  FETCH_LIST_PRODUCT_FAILED,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/actionType";


// update product
function* updateProductSaga(action){
    const dataUpdate = action.obj;
      console.log("dataUpdate : ", dataUpdate);
      const results = yield call(ExecuteSQL, "UPDATE Product set nameProduct=?,valueProduct =?,  imageProduct=?,noteProdcut=? WHERE id=?;",
      [dataUpdate.nameProduct, dataUpdate.valueProduct, dataUpdate.imageProduct, dataUpdate.noteProduct, dataUpdate.id]);
  }

export function* watchUpdateProduct() {
  console.log("SAGA_UPDATE_PRODUCT");
  yield takeLatest(UPDATE_PRODUCT, updateProductSaga);
}

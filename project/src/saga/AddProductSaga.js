import React, { useEffect } from "react";
import { View } from "react-native";
import { takeLatest, put, call } from "redux-saga/effects";
import {ExecuteSQL} from './OpenDatabase'
import {
 ADD_PRODUCT
} from "../actions/actionType";


function* HandleAddProductADD_PRODUCT(action) {
    console.log(`actionUpdateProductADD_PRODUCT:  `, action);
    const dataUpdate = action.obj;
    console.log("dataUpdate : ", dataUpdate);
    const results = yield call(ExecuteSQL, "INSERT INTO Product VALUES (? , ?, ?, ?, ?)",
     [ null ,dataUpdate.nameProduct, dataUpdate.imageProduct,dataUpdate.valueProduct, dataUpdate.noteProduct]);
     
}

export function* watchAddProduct() {
  console.log("SAGA_WATCH_ADD_PRODUCT");
  yield takeLatest(ADD_PRODUCT, HandleAddProductADD_PRODUCT);
}
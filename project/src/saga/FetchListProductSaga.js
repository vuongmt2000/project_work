import React, { useEffect } from "react";
import { View } from "react-native";
import { takeLatest, put, call } from "redux-saga/effects";
import { ExecuteSQL } from "./OpenDatabase";
import {
  FETCH_LIST_PRODUCT,
  FETCH_LIST_PRODUCT_SUCCESS,
  FETCH_LIST_PRODUCT_FAILED,
  ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT
} from "../actions/actionType";

function* getListProduct() {
  const results = yield call(ExecuteSQL, "SELECT * FROM  Product;", []);
  // console.log("RESULTS FETCH CUSTOM SAGA : ", results);
  var len = results.rows.length;
  const data = [];

  for (let i = 0; i < len; i++) {
    let row = results.rows.item(i);
    data.push(row);
  }

  if (data?.length > 0) {
    // console.log("dataFetchSaga", data);
    yield put({ type: FETCH_LIST_PRODUCT_SUCCESS, data });
  } else {
    yield put({ type: FETCH_LIST_PRODUCT_FAILED, data });
  }
}


// delete product

function* deleteProductSaga(action){
  console.log("deleteProduct", action.id)
  const results = yield call(ExecuteSQL, "DELETE FROM Product WHERE id = ?;", [action.id]);

}

// update product
function* updateProductSaga(action){
  const dataUpdate = action.obj;
    console.log("dataUpdate : ", dataUpdate);
    const results = yield call(ExecuteSQL, "UPDATE Product set nameProduct=?,valueProduct =?,  imageProduct=?,noteProdcut=? WHERE id=?;",
    [dataUpdate.nameProduct, dataUpdate.valueProduct, dataUpdate.imageProduct, dataUpdate.noteProduct, dataUpdate.id]);
}

// add product
function* addProductSaga(action){
  const dataUpdate = action.obj;
    console.log("dataUpdate : ", dataUpdate);
    const results = yield call(ExecuteSQL, "INSERT INTO Product VALUES (? , ?, ?, ?, ?)",
    [null, dataUpdate.nameProduct, dataUpdate.valueProduct, dataUpdate.imageProduct, dataUpdate.noteProduct]);
}


export function* watchFetchListProduct() {
  console.log("SAGA_FETCH_LIST_PRODUCT");
  yield takeLatest(FETCH_LIST_PRODUCT, getListProduct);
  // yield takeLatest(DELETE_PRODUCT, deleteProductSaga);
  // yield takeLatest(UPDATE_PRODUCT, updateProductSaga);
  // yield takeLatest(ADD_PRODUCT, addProductSaga);
}

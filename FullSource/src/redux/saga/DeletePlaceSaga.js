import React, {useEffect} from 'react';
import {View} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {ExecuteSQL} from '../saga/OpenDataBase';
import {
  FETCH_LIST_PRODUCT,
  FETCH_LIST_PRODUCT_SUCCESS,
  FETCH_LIST_PRODUCT_FAILED,
  ADD_PRODUCT,
  DELETE_PLACE,
  UPDATE_PRODUCT,
} from '../actions/actionType';

// delete product

function* deletePlaceSaga(action) {
  console.log('deleteProduct', action.id);
  const d = action.id;
  const results = yield call(ExecuteSQL, 'DELETE FROM Place WHERE id = ?;', [
    d,
  ]);
}

export function* watchDeletePlace() {
  console.log('SAGA_DELETE_PRODUCT');
  yield takeLatest(DELETE_PLACE, deletePlaceSaga);
}

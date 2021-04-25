import React, {useEffect} from 'react';
import {View} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {ExecuteSQL} from '../saga/OpenDataBase';
import {
  DELETE_CUSTOM,
  DELETE_CUSTOM_FAILED,
  DELETE_CUSTOM_SUCCESS,
} from '../actions/actionType';

function* HandleDeleteCustom(action) {
  console.log(`actionUpdateCustom:  `, action);
  const dataDelete = action.id;
  console.log('dataUpdate : ', dataDelete);
  const results = yield call(ExecuteSQL, 'DELETE FROM Customer WHERE id = ?', [
    dataDelete,
  ]);

  console.log('results: ', results.rowsAffected);
  // var len = results.rowsAffected;
  // if(len > 0){
  //   console.log("UpdateCustomSuccess", len);
  //   that.props.navigation.navigate("ListCustom");
  // }
}

export function* watchDeleteCustom() {
  console.log('SAGA_WATCH_DELETE_CUSTOM');
  yield takeLatest(DELETE_CUSTOM, HandleDeleteCustom);
}

import React, {useEffect} from 'react';
import {View} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';

import {ExecuteSQL} from '../saga/OpenDataBase';
import {
  FETCH_PLACE,
  FETCH_PLACE_FAILED,
  FETCH_PLACE_SUCCESS,
} from '../actions/actionType';

function* HandleFetchPlace(action) {
  const results = yield call(ExecuteSQL, 'SELECT * from Place', []);
  const data = [];
  for (let i = 0; i < results.rows.length; i++) {
    let rowPlace = results.rows.item(i);
    console.log(`rowPlace`, rowPlace.id);
    const result1 = yield call(
      ExecuteSQL,
      'SELECT * FROM Customer WHERE id = ?',
      [results.rows.item(i).id_Customer],
    );
    let rowCustom = result1.rows.item(i);
    console.log('res1.length = ' + result1.rows.length);
    const result2 = yield call(
      ExecuteSQL,
      'SELECT * FROM Place_Prodcut JOIN Product on Product.id = Place_Prodcut.id_prouct WHERE id_place = ?',
      [results.rows.item(i).id],
    );
    console.log(`result2.rows.length ` + result2.rows.length);
    const dataPlace_Product = [];
    for (let v = 0; v < result2.rows.length; v++) {
      let row = result2.rows.item(v);
      console.log(`itemProcut: ` + row);
      dataPlace_Product.push(row);
    }
    let dataPlace = {
      custom: rowCustom,
      Place_Product: dataPlace_Product,
      place: rowPlace,
    };
    data.push(dataPlace);
  }
  if (data?.length > 0) {
    yield put({type: FETCH_PLACE_SUCCESS, data});
  } else {
    yield put({type: FETCH_PLACE_FAILED, data});
  }
}

export function* watchFetchPlace() {
  yield takeLatest(FETCH_PLACE, HandleFetchPlace);
}

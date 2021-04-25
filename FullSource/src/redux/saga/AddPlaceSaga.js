import React, {useEffect} from 'react';
import {View} from 'react-native';
import {takeLatest, put, call} from 'redux-saga/effects';
import {ExecuteSQL} from './OpenDataBase';
import {fetchPlaceAction} from '../actions/index';
import {ADD_PLACE} from '../actions/actionType';

function* HandleAddPlace(action) {
  const dataPlace = action.newPlace;
  console.log('dataPlace : ', dataPlace);
  const results = yield call(
    ExecuteSQL,
    'INSERT INTO Place VALUES (? , ?, ?, ?, ?)',
    [
      null,
      dataPlace.itemCustom.id,
      dataPlace.notePlace,
      dataPlace.statePlace,
      dataPlace.timePlace,
    ],
  );
  console.log('results: ', results.rowsAffected);
  const results1 = yield call(ExecuteSQL, 'SELECT * FROM Place ', []);
  console.log('add place product1', results1.rowsAffected);
  console.log('results1', results1);
  let len = results1.rows.length;
  const id_place = yield results1.rows.item(len - 1).id;
  console.log('dataPlace_', id_place);
  let a = dataPlace.dataListProduct.length;
  console.log('a', a);
  for (let v = 0; v < a; v++) {
    const results2 = yield call(
      ExecuteSQL,
      'INSERT INTO Place_Prodcut VALUES (? , ?, ?, ?, ?)',
      [
        null,
        dataPlace.dataListProduct[v].id,
        id_place,
        dataPlace.dataListProduct[v].quantity,
        dataPlace.dataListProduct[v].discount,
      ],
    );
    console.log('add place product2', results2.rowsAffected);
  }

  if (results.rowsAffected) {
    console.log('dispatch');
    fetchPlaceAction;
  }
}

export function* watchAddPlace() {
  console.log('SAGA_WATCH_ADD_PLACE');
  yield takeLatest(ADD_PLACE, HandleAddPlace);
}

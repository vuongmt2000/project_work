import React, { useEffect } from "react";
import { View } from "react-native";
import { takeLatest, put, call } from "redux-saga/effects";
import {ExecuteSQL} from './OpenDatabase'
import {
    UPDATE_PLACE,
} from "../actions/actionType";


function* HandleUpdatePlace(action) {
    const dataPlace = action.updatePlace;
    console.log("dataPlace12 : ", dataPlace);
    const results = yield call(ExecuteSQL, "UPDATE Place SET id_Customer =? , noteOrder = ?, timeOrder = ?, statusOrder =? where id = ? ",
     [ dataPlace.custom.id, dataPlace.notePlace,dataPlace.timeOrder, dataPlace.statusOrder, dataPlace.id]);
     console.log("results: ", results.rowsAffected);
    //  const results1 = yield call(ExecuteSQL, "SELECT * FROM Place ", []);
    //  console.log("add place product1" , results1.rowsAffected);
    //  console.log("results1", results1)
    //  let len = results1.rows.length;
    //  const id_place = yield results1.rows.item(len-1).id;
    //  console.log("dataPlace_", id_place);
    //  let a = dataPlace.dataListProduct.length;
    //  console.log("a",a)
    const result1 = yield call(ExecuteSQL, "DELETE FROM Place_Prodcut WHERE id_place = ?;", [dataPlace.id]);
    console.log(`result1`, result1.rowsAffected);
    let a = dataPlace.dataListProduct.length;
     for( let v = 0; v < a ; v++){
      const results2 = yield call(ExecuteSQL, "INSERT INTO Place_Prodcut VALUES (? , ?, ?, ?, ?)",
      [ null ,dataPlace.dataListProduct[v].id, dataPlace.id,dataPlace.dataListProduct[v].quantity, dataPlace.dataListProduct[v].discount]);
     console.log("add place product2" , results2.rowsAffected);
     }
}

export function* watchUpdatePlace() {
  console.log("SAGA_WATCH_ADD_PLACE");
  yield takeLatest(UPDATE_PLACE, HandleUpdatePlace);
}
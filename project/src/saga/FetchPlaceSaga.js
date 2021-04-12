import React, { useEffect } from 'react';
import { View } from 'react-native';
import {takeLatest , put} from 'redux-saga/effects'; 
import SQLite from 'react-native-sqlite-storage'
import {FETCH_PLACE, FETCH_PLACE_FAILED, FETCH_PLACE_SUCCESS} from '../actions/actionType'



function* HandleFetchPlace(action){
    console.log("HandleFetchPlace")
        console.log("ongetdata")
        const a = SQLite.openDatabase({name: 'database.db', createFromLocation: '~www/database.db'}, ()=>{}, (err)=>{console.log(err)});
        a.transaction(tx=>{
            tx.executeSql('SELECT * FROM Product', [], (tx, results) =>{
                console.log(JSON.stringify(results.rows.item(0)));
            })
        })
}

export function* watchFetchPlace(){
    console.log('SAGA_WATCH_FETCH_PLACE')
    yield takeLatest(FETCH_PLACE,HandleFetchPlace);
    
}


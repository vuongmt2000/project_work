import { all, fork} from 'redux-saga/effects';
import {watchFetchPlace} from './FetchPlaceSaga'

export default function* rootSaga(){
    
    yield all([
        fork(watchFetchPlace)
    ])
}
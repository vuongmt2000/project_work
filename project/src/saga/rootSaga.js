import { all, fork} from 'redux-saga/effects';
import {watchFetchPlace} from './FetchPlaceSaga'
import {watchFetchListCustom} from './FetchListCustomSaga'

export default function* rootSaga(){
    
    yield all([
        fork(watchFetchPlace),
        fork(watchFetchListCustom)
    ])
}
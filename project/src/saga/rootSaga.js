import { all, fork} from 'redux-saga/effects';
import {watchFetchPlace} from './FetchPlaceSaga'
import {watchFetchListCustom} from './FetchListCustomSaga'
import {watchUpdateCustom} from './UpdateCustomSaga'
import {watchDeleteCustom} from './DeleteCustomSaga'
import {watchAddCustom} from './AddCustomSaga'
import {watchFetchListProduct} from './FetchListProductSaga'
import {watchDeleteProduct} from './DeleteProductSaga'
import {watchUpdateProduct} from './UpdateProductSaga'
import {watchAddProduct} from './AddProductSaga'

export default function* rootSaga(){
    
    yield all([
        fork(watchFetchPlace),
        fork(watchFetchListCustom),
        fork(watchUpdateCustom),
        fork(watchDeleteCustom),
        fork(watchAddCustom),
        fork(watchFetchListProduct),
        fork(watchDeleteProduct),
        fork(watchUpdateProduct),
        fork(watchAddProduct)
    ])
}
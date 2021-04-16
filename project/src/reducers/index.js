import {combineReducers} from 'redux'
import HomeReducer from  "./HomeReducer"
import ListCustomReducer from './ListCustomReducer'
import ListProductReducer from './ListProductReducer'


const allReducer = combineReducers({
    homeReducer: HomeReducer,
    listCustomReducer : ListCustomReducer,
    listProductReducer: ListProductReducer
});

export default allReducer;
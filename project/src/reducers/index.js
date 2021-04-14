import {combineReducers} from 'redux'
import HomeReducer from  "./HomeReducer"
import ListCustomReducer from './ListCustomReducer'


const allReducer = combineReducers({
    homeReducer: HomeReducer,
    listCustomReducer : ListCustomReducer
});

export default allReducer;
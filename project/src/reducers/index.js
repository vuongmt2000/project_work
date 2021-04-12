import {combineReducers} from 'redux'
import HomeReducer from  "./HomeReducer"


const allReducer = combineReducers({
    homeReducer: HomeReducer
});

export default allReducer;
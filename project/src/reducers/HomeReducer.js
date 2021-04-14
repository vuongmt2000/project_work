import {FETCH_PLACE, FETCH_PLACE_FAILED, FETCH_PLACE_SUCCESS} from '../actions/actionType'

const initStateListPlace = { 
    indexTab : 1,
    dataPlace : [
    ],
}
const HomeReducer =(state = initStateListPlace, action) =>{
    // console.log(`state`, action);
    switch (action.type) {
        case FETCH_PLACE_SUCCESS:
            state.dataPlace = action.data;
            return{...state}
        case FETCH_PLACE_FAILED:
            return state.dataPlace = [];
        default: 
            return state;
    }
} 

export default  HomeReducer;
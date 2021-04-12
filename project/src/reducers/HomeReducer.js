import {FETCH_PLACE, FETCH_PLACE_FAILED, FETCH_PLACE_SUCCESS} from '../actions/actionType'

const initStateListPlace = { 
    indexTab : 1,
    dataPlace : [
        {id: 1, nameProduct:"iphone 6", valueProduct: 12010, imageProduct:"https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/817987901.jpeg", noteProduct:"máy ngon khỏe :v"}
    ],
}
const HomeReducer =(state = initStateListPlace, action) =>{
    switch (action.type) {
        case FETCH_PLACE_SUCCESS:
            state.dataPlace = action.receivedPlaces;
            return{...state}
        case FETCH_PLACE_FAILED:
            return state.dataPlace = [];
        default: 
            return state;
    }
} 

export default  HomeReducer;
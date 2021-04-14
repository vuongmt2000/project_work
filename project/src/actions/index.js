import {FETCH_PLACE, FETCH_PLACE_FAILED, FETCH_PLACE_SUCCESS, FETCH_LIST_CUSTOM} from './actionType'


// screen home
export const fetchPlaceAction = ()=>{
    console.log("Action_fetchPlaceAction");
    return {
        type : FETCH_PLACE,
    }
}

// screen list custom
export const fetchListCustomAction = ()=>{
    console.log("FETCH_LIST_CUSTOM")
    return {
        type: FETCH_LIST_CUSTOM
    }
}
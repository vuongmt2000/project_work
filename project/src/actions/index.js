import {FETCH_PLACE, FETCH_PLACE_FAILED, FETCH_PLACE_SUCCESS} from './actionType'

export const fetchPlaceAction = ()=>{
    console.log("Action_fetchPlaceAction");
    return {
        type : FETCH_PLACE,
    }
}

export const fetchPlaceSuccessAction = (receivedPlaces) =>{
    return {
        type: FETCH_PLACE_SUCCESS,
        receivedPlaces
    }
}

export const fetchPlaceFailedAction = (err) =>{
    return {
        type: FETCH_PLACE_FAILED,
        err
    }
}
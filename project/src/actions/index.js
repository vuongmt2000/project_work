import {FETCH_PLACE, FETCH_LIST_CUSTOM, UPDATE_CUSTOM, DELETE_CUSTOM, ADD_CUSTOM, FETCH_LIST_PRODUCT,
ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, ADD_PLACE, DELETE_PLACE} from './actionType'


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

// screen update custom 
export const updateCustomAction =(obj)=>{
    console.log("updateCustomAction run");
    return {   
        type: UPDATE_CUSTOM,
        obj
    }
}

export const deleteCustomAction=(id)=>{
    console.log("deleteCustomAction ", id);
    return {
        type : DELETE_CUSTOM,
        id
    }
}

// Screen add custom 

export const addCustomAction =(newCustom)=>{
    console.log("addCustomAction ", newCustom);
    return {
        type : ADD_CUSTOM,
        newCustom
    }
}


// Screen list product

export const fetchListProductAction =()=>{
    return{
        type: FETCH_LIST_PRODUCT
    }
}

// Screen edit product

export const addProductAction =(obj)=>{
    return{
        type: ADD_PRODUCT,
        obj
    }
}

export const updateProductAction =(obj)=>{
    return{
        type: UPDATE_PRODUCT,
        obj
    }
}

export const deleteProductAction =(id)=>{
    return{
        type: DELETE_PRODUCT,
        id
    }
}


// ADD PLACE
export const addPlaceAction = (newPlace)=>{
    return {
        type : ADD_PLACE,
        newPlace
    }
}

// delete place

export const deletePlaceAction =(id)=>{
    return {
        type :DELETE_PLACE,
        id
    }
}
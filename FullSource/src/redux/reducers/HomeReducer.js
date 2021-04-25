import {FETCH_PLACE_FAILED, FETCH_PLACE_SUCCESS} from '../actions/actionType';

const initStateListPlace = {
  dataPlace: [],
};
const HomeReducer = (state = initStateListPlace, action) => {
  switch (action.type) {
    case FETCH_PLACE_SUCCESS:
      state.dataPlace = action.data;
      return {...state};
    case FETCH_PLACE_FAILED:
      return (state.dataPlace = []);
    default:
      return state;
  }
};

export default HomeReducer;

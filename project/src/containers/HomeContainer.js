import {connect} from 'react-redux'

import Home from '../components/screens/Home'

import {fetchPlaceAction, fetchPlaceFailedAction, fetchPlaceSuccessAction} from '../actions/index'
const mapStateToProps = (state) =>{
    dataPlace: state.HomeReducer.dataPlace
};


const mapDispatchToProps = (dispatch) =>{
    return{
        onFetchPlace: ()=>{
            dispatch(fetchPlaceAction());
        }
    }
    }
    

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;
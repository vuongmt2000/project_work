import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from "../customs/Styles" 
import { useDispatch, useSelector } from 'react-redux'
import {fetchPlaceAction, fetchPlaceFailedAction, fetchPlaceSuccessAction} from '../../actions/index'

function Home(props) {
    const [dataPlace, setDataPlace] = useState([]);
    // const data = useSelector(function(state){console.log(`state`, state)});
    const dispatch = useDispatch();
    // console.log(data);
    useEffect(()=>{
        dispatch(fetchPlaceAction())
        // setDataPlace(props.dataPlace);
        // props.onFetchPlace();
    }    
)
    
    return (
        <View style ={styles.container}> 
            <Text style = {styles.txt_logo}>Quản lý đơn hàng</Text>   
        </View>
    );
}

export default Home;
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { View, Image, TouchableOpacity, Text } from 'react-native';
import {fetchListCustomAction} from '../../actions/index'
import Feather from 'react-native-vector-icons/Feather'


function ListCustom(props, {navigation}) {
    const dispatch = useDispatch();

    const dataListCustom = useSelector(state =>state.listCustomReducer.dataListCustom);
    useEffect(()=>{
        dispatch(fetchListCustomAction());
    }, [dispatch]) 


    function onChangeScreenEdit(item) {
        props.navigation.navigate("EditCustom", {item : item});
    }

    function changeAddCustom(navigation){
        props.navigation.navigate("AddCustom");
        console.log(navigation)
    }

    const RenderItemListCustom =({item})=>{
        return(
            <TouchableOpacity Style = {{flex :1, marginTop: 10}} onPress = {()=> onChangeScreenEdit(item)}> 
                <View style = {{width: "90%", alignSelf: "center", flexDirection: "row"}}>
                   <View style = {{width:"30%", justifyContent: "center", alignItems: "center"}}>
                        <Image style ={{height: 80, width:80, borderRadius:40}} source ={{uri : item.image}}/>
                   </View>
                   <View style= {{marginLeft: 10}}>
                       <Text>{item.name}</Text>
                       <Text>SĐT: {item.phone}</Text>
                       <Text>Địa chỉ: {item.address}</Text>

                   </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{flex: 1}}>
            {/* Header */}
            <View style = {{height:60, backgroundColor:'#34a4eb',  alignItems: "center", flexDirection:"row"}}>
            <TouchableOpacity style ={{marginLeft:20}}>
                    <Feather name = "arrow-left" color ="white" size ={26}/>
                </TouchableOpacity>
                <Text style = {{color: "white", fontSize: 18, marginLeft: 50}}>Danh sách khách hàng</Text>
            </View>
            
            {dataListCustom?.map((item, index)=>(
                <RenderItemListCustom item = {item} key = {index}/>
            ))}
        <TouchableOpacity onPress ={()=> changeAddCustom(navigation)} style = {{position : "absolute", marginTop: "143%", marginLeft: "77%"}}> 
            <Image source = {require("../../assets/add.png")} style = {{width:80, height: 80}}/>
            </TouchableOpacity>
        </View>
    );
}

export default ListCustom;
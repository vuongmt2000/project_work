import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
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
    }

    const RenderItemListCustom =({item})=>{
        return(
            <TouchableOpacity Style = {{flex :1}} onPress = {()=> onChangeScreenEdit(item)}> 
                <View style = {{width: "90%", alignSelf: "center", flexDirection: "row", backgroundColor :"#d6d5d2",marginTop: 10, borderRadius:5, marginBottom: 10}}>
                   <View style = {{width:"30%", justifyContent: "center", alignItems: "center", marginTop:10, marginBottom:10}}>
                        <Image style ={{height: 80, width:80, borderRadius:40}} source ={{uri : item.image}}/>
                   </View>
                   <View style= {{marginLeft: 10, justifyContent :"center"}}>
                       <Text style ={{fontSize :16, fontWeight:"bold"}}>{item.name}</Text>
                       <Text style ={{marginTop: 5}}>SĐT: {item.phone}</Text>
                       <Text style ={{marginTop:5,fontStyle :"italic"}}>Địa chỉ: {item.address}</Text>

                   </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{flex: 1}}>
            {/* Header */}
            <View style = {{height:60, backgroundColor:'#34a4eb',  alignItems: "center", flexDirection:"row", justifyContent:"center"}}>
                <Text style = {{color: "white", fontSize: 18}}>Danh sách khách hàng</Text>
            </View>
            <ScrollView>
            {dataListCustom?.map((item, index)=>(
                <RenderItemListCustom item = {item} key = {index}/>
            ))}
            </ScrollView>
        <TouchableOpacity onPress ={()=> changeAddCustom(navigation)} style = {{position : "absolute", marginTop: "143%", marginLeft: "77%"}}> 
            <Image source = {require("../../assets/add.png")} style = {{width:80, height: 80}}/>
            </TouchableOpacity>
        </View>
    );
}

export default ListCustom;
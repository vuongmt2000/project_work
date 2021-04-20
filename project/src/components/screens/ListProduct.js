import React, {useEffect} from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import {useDispatch, useSelector} from 'react-redux'
import {fetchListProductAction} from '../../actions/index'
function ListProduct(props) {
    const code  = props.route.params?.code;
    const dispatch = useDispatch();
    const dataListProduct = useSelector(state => state.listProductReducer.dataListProduct)

    useEffect(()=>{
        dispatch(fetchListProductAction());
    }, [dispatch])


    function onChangeScreenEdit(item){
        if(code !=1){
            props.navigation.navigate("EditProduct", {item : item});
        }
        else {
            props.navigation.navigate("AddPlace", {itemProduct : item});
        }
        
    }


    function changeAddProduct(){
        props.navigation.navigate("AddProduct")
    }

    const RenderItemListProduct =({item})=>{
        return(
            <TouchableOpacity Style = {{flex :1}} onPress = {()=> onChangeScreenEdit(item)}> 
                <View style = {{width: "90%", alignSelf: "center", flexDirection: "row", backgroundColor :"#d6d5d2",marginTop: 10, borderRadius:5, marginBottom: 10}}>
                   <View style = {{width:"30%", justifyContent: "center", alignItems: "center", marginTop:10, marginBottom:10}}>
                        <Image style ={{height: 80, width:80, borderRadius:40}} source ={{uri : item.imageProduct}}/>
                   </View>
                   <View style= {{marginLeft: 10, justifyContent :"center"}}>
                       <Text style ={{fontSize :16, fontWeight:"bold"}}>Tên Sp: {item.nameProduct}</Text>
                       <Text style ={{marginTop: 5}}>Giá: {item.valueProduct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ</Text>
                       <Text style ={{marginTop:5,fontStyle :"italic"}}>Ghi chú: {item.noteProdcut}</Text>

                   </View>
                </View>
            </TouchableOpacity>
        )
    }    
    return (
        <View style={{flex:1}}>

            {/* Header */}
            <View style = {{height:60, backgroundColor:'#34a4eb',  alignItems: "center", flexDirection:"row", justifyContent:"center"}}>
                <Text style = {{color: "white", fontSize: 18}}>Danh sách sản phẩm</Text>
            </View>

            <ScrollView>
            {dataListProduct?.map((item, index)=>(
                <RenderItemListProduct item = {item} key = {index}/>
            ))}
            </ScrollView>
        <TouchableOpacity onPress ={()=> changeAddProduct()} style = {{position : "absolute", marginTop: "143%", marginLeft: "77%"}}> 
            <Image source = {require("../../assets/add.png")} style = {{width:80, height: 80}}/>
            </TouchableOpacity>
        </View>
    );
}

export default ListProduct;
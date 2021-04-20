import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "../customs/Styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaceAction } from "../../actions/index";
import ImagePicker from "react-native-image-crop-picker";
import Feather from "react-native-vector-icons/Feather";
import Moment from 'moment';

function Home(props) {
  const dispatch = useDispatch();
  const [dataPlace, setDataPlace] = useState([]);
  const [imageProductChoose, setImageProductChoose] = useState("");
  const data = useSelector((state) => state.homeReducer.dataPlace);
  const date = new Date();
  useEffect(() => {
    dispatch(fetchPlaceAction());
  }, [dispatch]);

  
  function onAddPlace() {
    props.navigation.navigate("AddPlace")
  }

  // price 
  function price(item) {
    let priceProduct = Math.floor(
      (1 - item.discount / 100) * item.valueProduct 
    );
    return priceProduct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const RenderItemProduct = ({ item }) => {
    return (
      <View
        style={{
          width: "95%",
          alignSelf: "center",
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
      
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              flexDirection: "row",
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <View
              style={{
                width: "30%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Image
                style={{ height: 80, width: 80, borderRadius: 40 }}
                source={{ uri: item.imageProduct }}
              />
            </View>
            <View
              style={{ marginLeft: 10, justifyContent: "center", width: "65%" }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Tên Sp: {item.nameProduct}
              </Text>
              <Text style={{ marginTop: 5 }}>
                Giá gốc:{" "}
                {item.valueProduct
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                đ
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ alignItems: "center" }}>Giảm giá: </Text>
                 <Text>{item.discount.toString()}</Text>
                <Text style={{ alignItems: "center" }}> %</Text>
              </View>
              
                <Text> SL: {item.quantity}</Text>

              <Text style={{ marginTop: 5 }}>Giá : {price(item)} đ</Text>
              <Text style={{ marginTop: 5, fontStyle: "italic" , marginBottom:5}}>
                Ghi chú: {item.noteProdcut}
              </Text>
            </View>
          </View>
      </View>
    );
  };

  function sumPrice(item){
    let tong = 0;
    for(let k =0; k < item.length; k ++){
      tong += Math.floor(
        (1 - item[k].discount / 100) * item[k].valueProduct * item[k].quantity)
    }
    return tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function ChangeEditPlace(item){
    props.navigation.navigate("EditPlace", {item: item})
  }
  const RenderItem = ({ item }) => {
    return (
      <View style={{flex :1, backgroundColor: "#b50000", marginBottom: 10, marginTop:10, alignSelf: "center", width:"95%", borderRadius:5}}>

      
      <TouchableOpacity onPress ={()=>ChangeEditPlace(item)} >
        <View style={{  marginTop:10, marginBottom:10,borderRadius:5,
      }}>
         <View style ={{flexDirection : "row"}}>
         <Text style={{ fontSize: 18, marginLeft: 20, color: "white"}}>{ Moment(item.place.timeOrder).format('HH:mm')}</Text>
         <Text style = {{alignSelf:"center", marginLeft:40, fontSize:18, fontWeight: "bold", color: "white"}}>Khách hàng: {item.custom.name}</Text>
         </View>
            <Text style ={{marginTop: 10, fontSize: 18, fontWeight: "bold", marginLeft:20, color: "white"}}>Sản Phẩm: </Text>   
           {item.Place_Product?.map((item, index)=>(
             <RenderItemProduct  item ={item} key = {index +" "+ item.id+ Math.random()*100} />
           ))}
        </View>
      </TouchableOpacity>
      <View >
            <Text style ={{marginLeft:20, color :"white"}}>Ghi chú: {item.place.noteOrder}</Text>
           
         <View style = {{ flexDirection: "row", marginLeft: "5%", marginTop: 20}}>
          <Text style ={{fontWeight: "bold", fontSize: 20, color: "white"}}>Tổng tiền : {sumPrice(item.Place_Product)} đ</Text>
      </View>
            <TouchableOpacity
             style ={{height: 40, alignSelf :"center", marginTop: 10,
             width: 80, backgroundColor :"#30d90d", justifyContent: "center", alignItems: "center", marginBottom:10, borderRadius:5}}>
              <Text style ={{color: "white", fontWeight:"bold"}}>{item.place.statusOrder}</Text>
            </TouchableOpacity>
           </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
       {/* Header */}
       <View style = {{height:60, backgroundColor:'#34a4eb',  alignItems: "center", flexDirection:"row", justifyContent:"center"}}>
                <Text style = {{color: "white", fontSize: 18}}>Quản lý đơn hàng</Text>
            </View>
      
      <ScrollView>
      {data?.map((item, index) => (
        <RenderItem item={item} key={index+ " "+item.id+" " + item.Place_Product.id+ Math.random()*100} />
      ))}
      </ScrollView>
      <TouchableOpacity
        style={{ width: 100, height: 100, borderRadius: 25, position :"absolute", marginTop: "143%", marginLeft: "77%" }}
        onPress={onAddPlace}
      >
        <Image
          style={{ width: 80, height: 80 }}
          source={require("../../assets/add.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Home;

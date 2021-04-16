import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styles from "../customs/Styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaceAction } from "../../actions/index";
import ImagePicker from "react-native-image-crop-picker";

function Home(props) {
  const dispatch = useDispatch();
  const [dataPlace, setDataPlace] = useState([]);
  const [imageProductChoose, setImageProductChoose] = useState("");
  const data = useSelector((state) => state.homeReducer.dataPlace);
  useEffect(() => {
    dispatch(fetchPlaceAction());
  }, [dispatch]);

  
  function onAddPlace() {
    props.navigation.navigate("AddPlace")
  }
  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ flex: 1, backgroundColor: "gray",marginTop:10, marginBottom:10,borderRadius:5,
       alignSelf: "center", width:"90%", height: 60, justifyContent:"center",alignItems:"center" }}>
        <Text style={{ fontSize: 18}}>Đơn hàng của {item.name}</Text>
      </TouchableOpacity>
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
        <RenderItem item={item} key={index} />
      ))}
      </ScrollView>
      <TouchableOpacity
        style={{ width: 100, height: 100, borderRadius: 25, position :"absolute", marginTop: "141%", marginLeft: "75%" }}
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

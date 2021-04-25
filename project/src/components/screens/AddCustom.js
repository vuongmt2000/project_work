import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image, TextInput, ScrollView , RefreshControl} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {useDispatch} from 'react-redux'
import ImagePicker from "react-native-image-crop-picker";
import {addCustomAction} from '../../actions/index'
function AddCustom(props) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("https://st.quantrimang.com/photos/image/072015/22/avatar.jpg");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [check, setCheck] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  function onBack() {
    props.navigation.goBack();
  }

  function onAdd(name, phone, address, image, note){
    if(name.length>0 && phone.length > 0 && address.length >0){
      setCheck(false);
      let newCustom = {name, phone, address, image, note}
      dispatch(addCustomAction(newCustom));
      setRefreshing(true)
      setTimeout(()=>{
        props.navigation.navigate("ListCustom");
        setFullName("")
        setImage("https://st.quantrimang.com/photos/image/072015/22/avatar.jpg")
        setNote("")
        setAddress("")
        setPhone("")
        setRefreshing(false)
      }, 1000)
    }
    else {
      setCheck(true);
    }
    
  }

  function editImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setImage(image.path)
    }).catch((err)=>{
      return console.log(err)
    });;
  }

  return (
    <ScrollView style={{ flex: 1 }}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
      />
    }
    >
      {/* Header */}
      <View style ={{width:"100%", backgroundColor: "#34a4eb"}}>
      <View
        style={{
          width: "90%",
          height: 60,
          alignItems: "center",
          justifyContent:"space-between",
          flexDirection: "row",
          alignSelf:"center"
        }}
      >
        <TouchableOpacity  onPress={onBack}>
          <Feather name="arrow-left" color="white" size={26} />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 18}}>
          Thêm khách hàng
        </Text>
        <TouchableOpacity  onPress={()=>onAdd(fullName, phone, address, image, note)}>
          <Feather name="check" color="white" size={26} />
        </TouchableOpacity>
      </View>
      </View>
      <View
        style={{ width: "90%", height: 230, marginTop:10, alignSelf:"center" }}
      >
        <TouchableOpacity onPress={editImage}>
          <Image
            style={{ width: 200, height: 200, borderRadius :200, alignSelf :"center" }}
            source={{ uri: image }}
          />
          <View style ={{flexDirection :"row", marginTop: 5}}>
            <Feather name ="edit-3" color ="black" size  ={24}/>
            <Text style ={{alignItems: "flex-end", marginLeft:5}}>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: "90%", alignSelf: "center" , flexDirection :"row",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            marginTop: 10,}}>
        <View style ={{width:"10%", justifyContent:"center",alignItems:"center"}}> 
          <Feather name = "user" color="blue" size={24}/>
        </View>
        <TextInput
        placeholder = "Họ tên"
          value={fullName}
          onChangeText={setFullName}
          style={{
            height: 50,
            width: "100%",
            
          }}
        />
         </View>
         <View style={{ width: "90%", alignSelf: "center" , flexDirection :"row",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            marginTop: 10,}}>
        <View style ={{width:"10%", justifyContent:"center",alignItems:"center"}}> 
          <Feather name = "phone" color="blue" size={24}/>
        </View>
        <TextInput
        placeholder ="Số điện thoại"
          value={phone}
          keyboardType ='numeric'
          onChangeText={setPhone}
          style={{
            height: 50,
            width: "100%",
            
          }}
        />
         </View>
         <View style={{ width: "90%", alignSelf: "center" , flexDirection :"row",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            marginTop: 10,}}>
        <View style ={{width:"10%", justifyContent:"center",alignItems:"center"}}> 
          <Feather name = "map-pin" color="blue" size={24}/>
        </View>
        <TextInput
        placeholder ="Địa chỉ"
          value={address}
          onChangeText={setAddress}
          style={{
            height: 50,
            width: "100%",
            
          }}
        />
         </View>
         <View style={{ width: "90%", alignSelf: "center" , flexDirection :"row",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            marginTop: 10,}}>
        <View style ={{width:"10%", justifyContent:"center",alignItems:"center"}}> 
          <Feather name = "file-text" color="blue" size={24}/>
        </View>
        <TextInput
        placeholder ="Ghi chú"
          value={note}
          onChangeText={setNote}
          style={{
            height: 50,
            width: "100%",
            
          }}
        />
         </View>
         {check?<Text style = {{color: "red", marginTop: 20, alignSelf: "center"}}>Kiểm tra thông tin họ tên, số điện thoại và địa chỉ :v</Text>:<View/>}
    </ScrollView>
  );
}

export default AddCustom;

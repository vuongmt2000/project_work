import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image, TextInput } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {useDispatch} from 'react-redux'
import ImagePicker from "react-native-image-crop-picker";
import {addProductAction} from '../../actions/index'
function AddProduct(props) {
    const [nameProduct, setNameProduct] = useState("");
    const [valueProduct, setValueProduct] = useState(0);
    const [imageProduct, setImageProduct] = useState("https://topthuthuat.com/wp/wp-content/uploads/2017/07/android.jpg");
    const [noteProduct, setNoteProduct] = useState("");
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  function onBack() {
    props.navigation.goBack();
  }

  function onAdd(nameProduct, valueProduct, imageProduct, noteProduct){
    if(nameProduct && valueProduct ){
      setCheck(false);
      let obj = {nameProduct, valueProduct, imageProduct, noteProduct}
      dispatch(addProductAction(obj));
      setTimeout(()=>{
        props.navigation.navigate("ListProduct");
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
      setImageProduct(image.path)
    });
  }

  return (
    <View style={{ flex: 1 }}>
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
          Sửa thông tin khách hàng
        </Text>
        <TouchableOpacity  onPress={()=>onAdd(nameProduct, valueProduct, imageProduct, noteProduct)}>
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
            source={{ uri: imageProduct }}
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
        placeholder = "Tên sản phẩm"
          value={nameProduct}
          onChangeText={setNameProduct}
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
        placeholder ="giá"
          value={valueProduct.toString()}
          keyboardType ='numeric'
          onChangeText={text=> setValueProduct(parseInt(text))}
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
          value={noteProduct}
          onChangeText={setNoteProduct}
          style={{
            height: 50,
            width: "100%",
            
          }}
        />
         </View>
         {check?<Text style = {{color: "red", marginTop: 20, alignSelf: "center"}}>Kiểm tra thông tin tên, giá sản phẩm :v</Text>:<View/>}
    </View>
  );
}

export default AddProduct;

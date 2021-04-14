import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Image } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

function AddCustom(props) {
  const [imageProductChoose, setImageProductChoose] = useState("");
  const [name, setName] = useState("")


  function chooseImage() {
    ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
       setImageProductChoose(image.path);
      });
    }
  return (
    <View style={{ flex: 1}}>
      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontSize: 20, alignSelf: "center", marginTop: 20 }}>
          Thêm Khách Hàng
        </Text>
        <TextInput
          placeholder="Họ tên"
          style={{
            paddingLeft:10,
            width: "90%",
            height: 50,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            alignSelf: "center",
            marginTop: 10,
          }}
        />
        <TextInput
         keyboardType ='number-pad'
          placeholder="số điện thoại"
          style={{
            paddingLeft:10,
            width: "90%",
            height: 50,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            alignSelf: "center",
            marginTop: 10,
          }}
        />
        <TextInput
          placeholder="địa chỉ"
          style={{
            paddingLeft:10,
            width: "90%",
            height: 50,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            alignSelf: "center",
            marginTop: 10,
          }}
        />
        <View
          style={{
            width: "90%",
            height: 100,
            alignSelf: "center",
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style ={{justifyContent :"center", alignItems:"center",width:"50%"}} onPress = {chooseImage}>
            <Text>Chọn ảnh</Text>
          </TouchableOpacity>
          {imageProductChoose ? (
            <Image
              style={{ height: 100, width: 100 }}
              source={{ uri: imageProductChoose }}
            />
          ) : (
            <Image
              style={{ height: 100, width: 100 }}
              source={require("../../assets/avatar.jpg")}
            />
          )}
        </View>
        <TextInput
        placeholder = "ghi chú"
          style={{
            paddingLeft:10,
            width: "90%",
            height: 50,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            alignSelf: "center",
            marginTop: 10,
          }}
        />
      </View>
      <View
          style={{
            width: "90%",
            height: 50,
            alignSelf: "center",
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}>
              <TouchableOpacity style={{justifyContent:"center", alignItems:"center",width:"20%", backgroundColor:"gray", borderRadius:5, marginRight: 30}}>
                  <Text>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:"center", alignItems:"center",width:"20%", backgroundColor:"gray", borderRadius:5}}>
                  <Text>Ok</Text>
              </TouchableOpacity>
          </View>
    </View>
  );
}

export default AddCustom;

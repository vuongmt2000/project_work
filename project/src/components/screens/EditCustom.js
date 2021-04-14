import React, { useState } from "react";
import { TouchableOpacity, View, Text, Image, TextInput } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import ImagePicker from "react-native-image-crop-picker";
function EditCustom(props) {
  const { item } = props.route.params;
  const [fullName, setFullName] = useState(item.name);
  const [phone, setPhone] = useState(item.phone);
  const [image, setImage] = useState(item.image);
  const [address, setAddress] = useState(item.address);
  const [note, setNote] = useState(item.note);
  console.log("props", props);

  function onBack() {}

  function editImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      setImage(image.path)
    });
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          width: "100%",
          height: 60,
          backgroundColor: "#34a4eb",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={onBack}>
          <Feather name="arrow-left" color="white" size={26} />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 18, marginLeft: 50 }}>
          Sửa thông tin khách hàng
        </Text>
      </View>
      <View
        style={{ justifyContent: "center", alignItems: "center", height: 200 }}
      >
        <TouchableOpacity onPress={editImage}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{ uri: image }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: "90%", alignSelf: "center" }}>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          style={{
            height: 50,
            width: "100%",
            alignSelf: "center",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            marginTop: 10,
          }}
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={{
            height: 50,
            width: "100%",
            alignSelf: "center",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            marginTop: 10,
          }}
        />
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={{
            height: 50,
            width: "100%",
            alignSelf: "center",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            marginTop: 10,
          }}
        />
        <TextInput
          value={note}
          onChangeText={setNote}
          style={{
            height: 50,
            width: "100%",
            alignSelf: "center",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            marginTop: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            width: 120,
            borderRadius: 5,
            backgroundColor: "#ed422f",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Text style={{ color: "white" }}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 50,
            width: 120,
            borderRadius: 5,
            backgroundColor: "#0641cc",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default EditCustom;

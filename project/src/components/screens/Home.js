import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../customs/Styles";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlaceAction,
  fetchPlaceFailedAction,
  fetchPlaceSuccessAction,
} from "../../actions/index";
import ImagePicker from "react-native-image-crop-picker";

function Home(props) {
  const dispatch = useDispatch();
  const [dataPlace, setDataPlace] = useState([]);
  const [imageProductChoose, setImageProductChoose] = useState("");
  const data = useSelector(state =>state.homeReducer.dataPlace);
  useEffect(() => {
    dispatch(fetchPlaceAction());
  }, [dispatch]);

  // chon anh
  function onPickImage() {
    // ImagePicker.openPicker({
    //     width: 300,
    //     height: 400,
    //     cropping: true
    //   }).then(image => {
    //     console.log(image);
    //   });
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      setImageProductChoose(image.path);
    });
  }
  const RenderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ alignSelf: "center" }}>{item.nameProduct}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt_logo}>Quản lý đơn hàng</Text>
      <TouchableOpacity
        style={{ width: 100, height: 100, borderRadius: 25 }}
        onPress={onPickImage}
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../../assets/add.png")}
        />
      </TouchableOpacity>
      {imageProductChoose ? (
        <Image
          style={{ height: 100, width: 100 }}
          source={{ uri: imageProductChoose }}
        />
      ) : (
        <View style={{ height: 100, width: 100, backgroundColor: "gray" }} />
      )}
      {data.map((item, index) => (
        <RenderItem item={item} key={index} />
      ))}
    </View>
  );
}

export default Home;

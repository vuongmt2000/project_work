import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  RefreshControl
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { addPlaceAction, fetchPlaceAction } from "../../actions/index";
import { Input } from "react-native-elements";


// const dataProduct =[
//   {"id": 1, "imageProduct": "asdfasdf", "nameProduct": "iphone 6", "noteProdcut": "hangf moiw vef", "valueProduct": 30000000}
// ]
function AddPlace(props) {
  const itemCustom = props.route.params?.itemCustom;
  const itemProduct = props.route.params?.itemProduct;
  const [dataProduct, setDataProduct] = useState([]);
  const [notePlace, setNotePlace] = useState("")
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    if (itemProduct) {
      let check = true;
      for (let i = 0; i < dataProduct.length; i++) {
        if (itemProduct.id === dataProduct[i].id) {
          setDataProduct((x) => {
            let index = x.findIndex((y) => y.id === itemProduct.id);
            if (index !== -1) {
              x[index].quantity += 1;
            }
            return [...x];
          });
          check = false;
        }
      }
      if (check) {
        let obj = {
          id: itemProduct.id,
          nameProduct: itemProduct.nameProduct,
          valueProduct: itemProduct.valueProduct,
          noteProdcut: itemProduct.noteProdcut,
          imageProduct: itemProduct.imageProduct,
          discount: 0,
          quantity: 1,
        };
        setDataProduct((x) => [...x, obj]);
      } else {
        check = true;
      }
    }
  }, [itemProduct]);

  function changeDiscount(text, item){
    if(text){
      setDataProduct(x=>{
        let index = x.findIndex((y)=> y.id === item.id);
        if(index !== -1){
          x[index].discount = parseInt(text);
        }
        return [...x];
      })
    }
    else {
      setDataProduct(x=>{
        let index = x.findIndex((y)=> y.id === item.id);
        if(index !== -1){
          x[index].discount = 0;
        }
        return [...x];
      })
    }
  }
  const dispatch = useDispatch();

  function onBack() {
    props.navigation.goBack();
  }

  // price 
  function price(item) {
    let priceProduct = Math.floor(
      (1 - item.discount / 100) * item.valueProduct 
    );
    return priceProduct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  function sumPrice(){
    let tong = 0;
    for(let k =0; k < dataProduct.length; k ++){
      tong += Math.floor(
        (1 - dataProduct[k].discount / 100) * dataProduct[k].valueProduct * dataProduct[k].quantity)
    }
    return tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  

  const RenderItemProduct = ({ item }) => {
    return (
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: "#20e012",
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
              style={{ marginLeft: 10, justifyContent: "center", width: "58%" }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                T??n Sp: {item.nameProduct}
              </Text>
              <Text style={{ marginTop: 5 }}>
                Gi?? g???c:{" "}
                {item.valueProduct
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                ??
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ alignItems: "center" }}>Gi???m gi??: </Text>
                <TextInput
                  value={item.discount.toString()}
                  style={{
                    height: 40,
                    borderWidth: 1,
                    width: 60,
                    borderRadius: 10,
                    paddingLeft: 5,
                  }}
                
                  keyboardType="numeric"
                  onChangeText = {text => changeDiscount(text, item)}
                />
                <Text style={{ alignItems: "center" }}> %</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "80%",
                  marginTop: 10
                }}
              >
                {item.quantity > 1 ? (
                  <TouchableOpacity onPress={() => minusQuantity(item)}>
                    <Feather name="minus-circle" size={20} />
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
                <Text> SL: {item.quantity}</Text>
                <TouchableOpacity onPress={() => plusQuantity(item)}>
                  <Feather name="plus-circle" size={20} />
                </TouchableOpacity>
              </View>
              <Text style={{ marginTop: 5 }}>Gi?? : {price(item)} ??</Text>
              <Text style={{ marginTop: 5, fontStyle: "italic" , marginBottom:5}}>
                Ghi ch??: {item.noteProdcut}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => deleteItem(item)}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Feather name="trash-2" size={20} />
            </TouchableOpacity>
          </View>
      </View>
    );
  };

  function changeToListCustom() {
    props.navigation.navigate("ListCustomNoBottom", { code: 2 });
  }
  function changeToListProduct() {
    props.navigation.navigate("ListProductNoBottom", { code: 1 });
  }

  function plusQuantity(item) {
    setDataProduct((x) => {
      let index = x.findIndex((y) => y.id === item.id);
      if (index !== -1) {
        x[index].quantity += 1;
      }
      return [...x];
    });
  }

  function minusQuantity(item) {
    setDataProduct((x) => {
      let index = x.findIndex((y) => y.id === item.id);
      if (index !== -1) {
        x[index].quantity -= 1;
      }
      return [...x];
    });
  }

  function deleteItem(item) {
    setDataProduct((x) => {
      let index = x.findIndex((y) => y.id === item.id);
      if (index !== -1) {
        let arr = [...dataProduct];
        arr.splice(index, 1);
        return arr;
      }
    });
  }


  useEffect (()=>{
    dispatch(fetchPlaceAction());
  }, [dispatch]);
  function onAddPlace(dataProduct, notePlace, itemCustom ){
    let date = new Date();
    let statePlace = "New";
    let newPlace = {dataListProduct: dataProduct, itemCustom : itemCustom, notePlace: notePlace, timePlace :date.toISOString(), statePlace : statePlace};
    if(dataProduct.length > 0 && itemCustom){
      dispatch(addPlaceAction(newPlace));  
      setRefreshing(true)
      setTimeout(() => {
        props.navigation.navigate("Home");
        setRefreshing(false)
      }, 2000)
       
     
    }
    else{
      alert("l???i")
    }
  }
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ width: "100%", backgroundColor: "#34a4eb" }}>
        <View
          style={{
            width: "90%",
            height: 60,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity onPress={onBack}>
            <Feather name="arrow-left" color="white" size={26} />
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 18 }}>Th??m ????n h??ng</Text>
          <TouchableOpacity
            onPress={() => onAddPlace(dataProduct, notePlace, itemCustom)}
          >
            <Feather name="check" color="white" size={26} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
        />
      }
      >
        <View
          style={{ width: "90%", alignSelf: "center", flexDirection: "row" }}
        >
          <Text style={{ fontSize: 16, marginTop: 20 }}>Kh??ch h??ng</Text>
          {itemCustom ? (
            <View />
          ) : (
            <TouchableOpacity onPress={changeToListCustom}>
              <Feather
                name="plus-circle"
                size={20}
                style={{ marginTop: 20, marginLeft: 10 }}
              />
            </TouchableOpacity>
          )}
        </View>
        {itemCustom ? (
          <TouchableOpacity style={{}} onPress={() => changeToListCustom()}>
            <View
              style={{
                width: "90%",
                alignSelf: "center",
                flexDirection: "row",
                backgroundColor: "#dbde14",
                marginTop: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  width: "30%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Image
                  style={{ height: 80, width: 80, borderRadius: 40 }}
                  source={{ uri: itemCustom.image }}
                />
              </View>
              <View style={{ marginLeft: 10, justifyContent: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {itemCustom.name}
                </Text>
                <Text style={{ marginTop: 5 }}>S??T: {itemCustom.phone}</Text>
                <Text style={{ marginTop: 5, fontStyle: "italic" }}>
                  ?????a ch???: {itemCustom.address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <View
          style={{ width: "90%", alignSelf: "center", flexDirection: "row" }}
        >
          <Text style={{ fontSize: 16, marginTop: 20 }}>S???n ph???m</Text>

          <TouchableOpacity onPress={changeToListProduct}>
            <Feather
              name="plus-circle"
              size={20}
              style={{ marginTop: 20, marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
        {dataProduct?.map((item, index) => (
          <RenderItemProduct item={item} key={index} />
        ))}
        <View style={{ width: "90%", alignSelf: "center" , flexDirection :"row",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            marginTop: 10,}}>
        <View style ={{width:"10%", justifyContent:"center",alignItems:"center"}}> 
          <Feather name = "file-text" color="blue" size={24}/>
        </View>
        <TextInput
        placeholder ="Ghi ch??"
          value={notePlace}
          onChangeText={setNotePlace}
          style={{
            height: 50,
            width: "100%",
            
          }}
        />
         </View>
         <View style = {{ flexDirection: "row", width:"90%", alignSelf: "center", marginTop: 10}}>
          <Text style ={{fontWeight: "bold", fontSize: 20, color: "red"}}>T???ng ti???n : {sumPrice()} ??</Text>
      </View>
      </ScrollView>
      
    </View>
  );
}

export default AddPlace;

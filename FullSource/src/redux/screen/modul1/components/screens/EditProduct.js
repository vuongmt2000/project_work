import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import {
  updateProductAction,
  deleteProductAction,
} from '../../../../actions/index';
function EditProduct(props) {
  const {item} = props.route.params;
  const [nameProduct, setNameProduct] = useState(item.nameProduct);
  const [valueProduct, setValueProduct] = useState(
    item.valueProduct.toString(),
  );
  const [imageProduct, setImageProduct] = useState(item.imageProduct);
  const [noteProduct, setNoteProduct] = useState(item.noteProdcut);
  const dispatch = useDispatch();
  function onBack() {
    props.navigation.goBack();
  }

  function onDelete(id) {
    dispatch(deleteProductAction(id));
    setTimeout(() => {
      props.navigation.navigate('ListProduct');
    }, 1000);
  }

  function editImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImageProduct(image.path);
      })
      .catch(err => {
        return console.log(err);
      });
  }

  function updateProduct(
    nameProduct,
    valueProduct,
    imageProduct,
    noteProduct,
    id,
  ) {
    console.log('run update Product');
    let obj = {id, nameProduct, valueProduct, imageProduct, noteProduct};
    dispatch(updateProductAction(obj));
    setTimeout(() => {
      props.navigation.navigate('ListProduct');
    }, 1000);
  }

  return (
    <ScrollView style={{flex: 1}}>
      {/* Header */}
      <View style={{width: '100%', backgroundColor: '#34a4eb'}}>
        <View
          style={{
            width: '90%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={onBack}>
            <Feather name="arrow-left" color="white" size={26} />
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 18}}>
            Sửa thông tin sản phẩm
          </Text>
          <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Feather name="trash-2" color="white" size={26} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{width: '90%', height: 230, marginTop: 10, alignSelf: 'center'}}>
        <TouchableOpacity onPress={editImage}>
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 0,
              alignSelf: 'center',
            }}
            source={{uri: imageProduct}}
          />
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Feather name="edit-3" color="black" size={24} />
            <Text style={{alignItems: 'flex-end', marginLeft: 5}}>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'gray',
          marginTop: 10,
        }}>
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Feather name="user" color="blue" size={24} />
        </View>
        <TextInput
          value={nameProduct}
          onChangeText={setNameProduct}
          style={{
            height: 50,
            width: '100%',
          }}
        />
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'gray',
          marginTop: 10,
        }}>
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Feather name="phone" color="blue" size={24} />
        </View>
        <TextInput
          keyboardType="numeric"
          value={valueProduct}
          onChangeText={setValueProduct}
          style={{
            height: 50,
            width: '100%',
          }}
        />
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'gray',
          marginTop: 10,
        }}>
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Feather name="map-pin" color="blue" size={24} />
        </View>
        <TextInput
          value={noteProduct}
          onChangeText={setNoteProduct}
          style={{
            height: 50,
            width: '100%',
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          width: '90%',
          justifyContent: 'flex-end',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 120,
            borderRadius: 5,
            backgroundColor: '#ed422f',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Text style={{color: 'white'}}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            updateProduct(
              nameProduct,
              parseInt(valueProduct),
              imageProduct,
              noteProduct,
              item.id,
            )
          }
          style={{
            height: 50,
            width: 120,
            borderRadius: 5,
            backgroundColor: '#0641cc',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default EditProduct;

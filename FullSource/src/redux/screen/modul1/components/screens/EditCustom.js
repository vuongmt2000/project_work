import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, Image, TextInput, ScrollView, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import {
  updateCustomAction,
  deleteCustomAction,
} from '../../../../actions/index';
function EditCustom(props) {
  const item = props.route.params?.item;
  const [fullName, setFullName] = useState(item.name);
  const [phone, setPhone] = useState(item.phone);
  const [image, setImage] = useState(item.image);
  const [address, setAddress] = useState(item.address);
  const [note, setNote] = useState(item.note);
  const [refreshing, setRefreshing] = useState(false); 
  const dispatch = useDispatch();
  const len = useSelector(state => state.listCustomReducer.len);
  function onBack() {
    props.navigation.goBack();
  }

  useEffect(() => {
    console.log(`item editCustom: `, item)
    if(!item){
      props.navigation.goBack();
    }    
  }, [item])

  function onDelete(id) {
    dispatch(deleteCustomAction(id));
    setRefreshing(true)
    setTimeout(() => {
      props.navigation.navigate('Khách hàng');
      setRefreshing(false)
    }, 1000);
  }

  function editImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  }

  function updateCustomer(name, phone, address, image, note, id) {
    console.log('run update');
    let obj = {id, name, phone, address, image, note};
    dispatch(updateCustomAction(obj));
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
      props.navigation.goBack();
    }, 1000);
  }

  return (
    <View style={{flex: 1}}>
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
            Sửa thông tin khách hàng
          </Text>
          <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Feather name="trash-2" color="white" size={26} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} />}
      >
      <View
        style={{width: '90%', height: 230, marginTop: 10, alignSelf: 'center'}}>
        <TouchableOpacity onPress={editImage}>
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 200,
              alignSelf: 'center',
            }}
            source={{uri: image}}
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
          value={fullName}
          onChangeText={setFullName}
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
          value={phone}
          onChangeText={setPhone}
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
          value={address}
          onChangeText={setAddress}
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
          <Feather name="file-text" color="blue" size={24} />
        </View>
        <TextInput
          value={note}
          onChangeText={setNote}
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
            updateCustomer(fullName, phone, address, image, note, item.id)
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
    </View>
  );
}

export default EditCustom;

import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {addCustomAction} from '../../../../actions/index';
function AddCustom(props) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(
    'https://st.quantrimang.com/photos/image/072015/22/avatar.jpg',
  );
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [check, setCheck] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  function onBack() {
    props.navigation.goBack();
  }

  function onAdd(name, phone, address, image, note) {
    if (name.length > 0 && phone.match( /(84|0[3|5|7|8|9])+([0-9]{8})\b/g) && address.length > 0) {
      setCheck(false);
      let newCustom = {name, phone, address, image, note, stateCustomer:1};
      dispatch(addCustomAction(newCustom));
      setRefreshing(true);
      setTimeout(() => {
        setFullName('');
        setImage(
          'https://st.quantrimang.com/photos/image/072015/22/avatar.jpg',
        );
        setNote('');
        setAddress('');
        setPhone('');
        setRefreshing(false);
        props.navigation.goBack();
      }, 1000);
    } else {
      setCheck(true);
    }
  }

  function editImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(err => {
        return console.log(err);
      });
  }

  return (
    <ScrollView
      style={{flex: 1}}
      refreshControl={<RefreshControl refreshing={refreshing} />}>
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
          <Text style={{color: 'white', fontSize: 18}}>Thêm khách hàng</Text>
          <TouchableOpacity
            onPress={() => onAdd(fullName, phone, address, image, note)}>
            <Feather name="check" color="white" size={26} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{width: '90%', height: 230, marginTop: 10, alignSelf: 'center'}}>
        <TouchableOpacity onPress={editImage}>
        <View style={{position:"absolute", marginLeft:"68%"}}>
            <Feather name="edit-3" color="black" size={24} />
          </View>
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 200,
              alignSelf: 'center',
            }}
            source={{uri: image}}
          />
         
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
          <Feather name="user" color="gray" size={24} />
        </View>
        <TextInput
          placeholder="Họ tên"
          value={fullName}
          onChangeText={setFullName}
          style={{
            height: 50,
            width: '100%',
            fontSize : 18
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
          <Feather name="phone" color="gray" size={24} />
        </View>
        <TextInput
          placeholder="Số điện thoại"
          value={phone}
          keyboardType="numeric"
          onChangeText={setPhone}
          style={{
            height: 50,
            width: '100%',
            fontSize : 18
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
          <Feather name="map-pin" color="gray" size={24} />
        </View>
        <TextInput
          placeholder="Địa chỉ"
          value={address}
          onChangeText={setAddress}
          style={{
            height: 50,
            width: '100%',
            fontSize : 18
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
          <Feather name="file-text" color="gray" size={24} />
        </View>
        <TextInput
          placeholder="Ghi chú"
          value={note}
          onChangeText={setNote}
          style={{
            height: 50,
            width: '100%',
            fontSize : 18
          }}
        />
      </View>
      {check ? (
        <Text style={{color: 'red', marginTop: 20, alignSelf: 'center'}}>
          Kiểm tra thông tin họ tên, số điện thoại và địa chỉ :v
        </Text>
      ) : (
        <View />
      )}
    </ScrollView>
  );
}

export default AddCustom;

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {fetchListCustomAction} from '../../../../actions/index';
import Feather from 'react-native-vector-icons/Feather';
import {Input} from 'react-native-elements';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

function ListCustom(props, {navigation}) {
  const code = props.route.params?.code;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [nameCustom, setNameCustom] = useState('Danh sách khác hàng');
  const [checkInput, setCheckInput] = useState(false);
  const [input_name, setInput_name] = useState('');
  const [dataCustom, setDataCustom] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const dataListCustom = useSelector(
    state => state.listCustomReducer.dataListCustom,
  );
  useEffect(() => {
    setDataCustom(dataListCustom);
    console.log(`dataListCustom : `, dataListCustom)
  }, [dataListCustom]);

  useEffect(() => {
    dispatch(fetchListCustomAction());
  }, []);

  function onChangeScreenEdit(item) {
    if (code != 2) {
      props.navigation.navigate('EditCustom', {item: item});
    } else {
      props.navigation.navigate('AddPlace', {itemCustom: item});
    }
  }

  function changeAddCustom(navigation) {
    props.navigation.navigate('AddCustom');
  }

  function setName_Custom() {
    if (input_name) {
      setNameCustom(input_name);
      setCheckInput(false);
    } else {
      setNameCustom('Danh sách khách hàng');
    }
  }

  const RenderItemListCustom = ({item}) => {
    return (
      <TouchableOpacity
        Style={{flex: 1}}
        onPress={() => onChangeScreenEdit(item)}>
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            backgroundColor: '#919eb3',
            marginTop: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Image
              style={{height: 80, width: 80, borderRadius: 40}}
              source={{uri: item.image}}
            />
          </View>
          <View style={{marginLeft: 10, justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color:"white"}}>{item.name}</Text>
            <Text style={{marginTop: 5, color:"white"}}>SĐT: {item.phone}</Text>
            <Text style={{marginTop: 5, fontStyle: 'italic', color:"white"}}>
              Địa chỉ: {item.address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  function searchListCustom() {
    setCheckInput(!checkInput);
  }

  function onChange(text) {
    console.log('dataListCustom', dataListCustom);
    console.log('text', text);
    setInput_name(text);
    if (text) {
      setDataCustom([
        ...(dataListCustom ?? []).filter(
          y =>
            y.name.toLowerCase().includes(text.toLowerCase()) ||
            y.phone.includes(text) ||
            y.address.toLowerCase().includes(text.toLowerCase()),
        ),
      ]);
    } else {
      setDataCustom(dataListCustom);
    }
  }
  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View style={{backgroundColor: '#34a4eb'}}>
        <View
          style={{
            height: 60,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%',
            alignSelf: 'center',
          }}>
          <View style={{width: 30, height: 20}} />
          <Text style={{color: 'white', fontSize: 18}}>{nameCustom}</Text>
          <TouchableOpacity onPress={searchListCustom}>
            <Feather name="search" size={26} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {checkInput ? (
          <Input
            autoFocus
            placeholder="nhập tên, số điện thoại, địa chỉ"
            value={input_name}
            onChangeText={text => onChange(text)}
            onSubmitEditing={setName_Custom}
          />
        ) : (
          <View />
        )}
        {dataCustom?.map((item, index) => (
          <RenderItemListCustom item={item} key={index} />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => changeAddCustom(navigation)}
        style={{position: 'absolute', marginTop: '143%', marginLeft: '77%'}}>
        <Image
          source={require('../../assets/add.png')}
          style={{width: 80, height: 80}}
        />
      </TouchableOpacity>
    </View>
  );
}

export default ListCustom;

import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchListProductAction} from '../../../../actions/index';
import Feather from 'react-native-vector-icons/Feather';
import {Input} from 'react-native-elements';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
function ListProduct(props) {
  const code = props.route.params?.code;
  const dispatch = useDispatch();
  const dataListProduct = useSelector(
    state => state.listProductReducer.dataListProduct,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [nameProduct, setNameProduct] = useState('Danh sách sản phẩm');
  const [checkInput, setCheckInput] = useState(false);
  const [input_name, setInput_name] = useState('');
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    dispatch(fetchListProductAction());
  }, [dispatch]);
  useEffect(() => {
    setDataProduct(dataListProduct);
  }, [dataListProduct]);

  function onChange(text) {
    console.log('text', text);
    setInput_name(text);
    if (text) {
      setDataProduct([
        ...(dataListProduct ?? []).filter(
          y =>
            y.nameProduct.toLowerCase().includes(text.toLowerCase()) ||
            y.valueProduct.toString().includes(text) ||
            y.noteProdcut.toLowerCase().includes(text.toLowerCase()),
        ),
      ]);
    } else {
      setDataProduct(dataListProduct);
    }
  }
  function onChangeScreenEdit(item) {
    if (code != 1) {
      props.navigation.navigate('EditProduct', {item: item});
    } else {
      props.navigation.navigate('AddPlace', {itemProduct: item});
    }
  }

  function setName_Product() {
    setNameProduct(input_name);
    setCheckInput(false);
  }

  function searchListProduct() {
    setCheckInput(!checkInput);
  }

  function changeAddProduct() {
    props.navigation.navigate('AddProduct');
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const RenderItemListProduct = ({item}) => {
    return (
      <TouchableOpacity
        Style={{flex: 1}}
        onPress={() => onChangeScreenEdit(item)}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            backgroundColor: '#20e012',
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
              style={{height: 80, width: 80, borderRadius: 1}}
              source={{uri: item.imageProduct}}
            />
          </View>
          <View
            style={{marginLeft: 10, justifyContent: 'center', width: '60%'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Tên Sp: {item.nameProduct}
            </Text>
            <Text style={{marginTop: 5}}>
              Giá:{' '}
              {item.valueProduct
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
              đ
            </Text>
            <Text style={{marginTop: 5, fontStyle: 'italic'}}>
              Ghi chú: {item.noteProdcut}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
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
          <Text style={{color: 'white', fontSize: 18}}>{nameProduct}</Text>
          <TouchableOpacity onPress={searchListProduct}>
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
            placeholder="nhập tên, giá, ghi chú"
            value={input_name}
            onChangeText={text => onChange(text)}
            onSubmitEditing={setName_Product}
          />
        ) : (
          <View />
        )}
        {dataProduct?.map((item, index) => (
          <RenderItemListProduct item={item} key={index} />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => changeAddProduct()}
        style={{position: 'absolute', marginTop: '143%', marginLeft: '77%'}}>
        <Image
          source={require('../../assets/add.png')}
          style={{width: 80, height: 80}}
        />
      </TouchableOpacity>
    </View>
  );
}

export default ListProduct;

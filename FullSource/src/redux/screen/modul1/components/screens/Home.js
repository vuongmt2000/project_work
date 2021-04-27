import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import styles from '../customs/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPlaceAction} from '../../../../actions/index';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import {ScreenStackHeaderBackButtonImage} from 'react-native-screens';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function Home(props) {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [imageProductChoose, setImageProductChoose] = useState('');
  const [checkInput, setCheckInput] = useState(false);
  const [show, setShow] = useState(false);
  const [input_search, setInput_search] = useState('');

  const [date, setDate] = useState(new Date());
  const data = useSelector(state => state.HomeReducer.dataPlace);
  const [dataPlace, setDataPlace] = useState([]);
  console.log(`dataHome: `, data);

  useEffect(() => {
    dispatch(fetchPlaceAction());
  }, []);

  useEffect(() =>{
    setDataPlace(data)
  }, [data])

  function onAddPlace() {
    props.navigation.navigate('AddPlace');
  }

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // price
  function price(item) {
    let priceProduct = Math.floor(
      (1 - item.discount / 100) * item.valueProduct,
    );
    return priceProduct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setDataPlace([
      ...(data ?? []).filter(y =>
        y.place.timeOrder.includes(Moment(currentDate).format('yyyy-MM-DD')),
      ),
    ]);
  };

  function searchText(text) {
    setInput_search(text);
    if (text) {
      setDataPlace([
        ...(data ?? []).filter(y =>
          y.custom.name.toLowerCase().includes(text.toLowerCase())|| y.custom.phone.includes(text)),
      ]);
    } else {
      setDataPlace(data);
    }
  }

  const RenderItemProduct = ({item}) => {
    return (
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          backgroundColor: 'white',
          marginTop: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 5,
          }}>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Image
              style={{height: 80, width: 80, borderRadius: 40}}
              source={{uri: item.imageProduct}}
            />
          </View>
          <View
            style={{marginLeft: 10, justifyContent: 'center', width: '65%'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Tên Sp: {item.nameProduct}
            </Text>
            <Text style={{marginTop: 5}}>
              Giá gốc:{' '}
              {item.valueProduct
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
              đ
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{alignItems: 'center'}}>Giảm giá: </Text>
              <Text>{item.discount.toString()}</Text>
              <Text style={{alignItems: 'center'}}> %</Text>
            </View>

            <Text> SL: {item.quantity}</Text>

            <Text style={{marginTop: 5}}>Giá : {price(item)} đ</Text>
            <Text
              style={{
                marginTop: 5,
                fontStyle: 'italic',
                marginBottom: 5,
                color: '#f57842',
              }}>
              Ghi chú: {item.noteProdcut}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  function sumPrice(item) {
    let tong = 0;
    for (let k = 0; k < item.length; k++) {
      tong += Math.floor(
        (1 - item[k].discount / 100) * item[k].valueProduct * item[k].quantity,
      );
    }
    return tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function ChangeEditPlace(item) {
    props.navigation.navigate('EditPlace', {item: item});
  }
  // const RenderItem = ({item}) => {
  //   console.log('item?.custom :>> ', item);
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: '#919eb3',
  //         marginBottom: 10,
  //         marginTop: 10,
  //         alignSelf: 'center',
  //         width: '95%',
  //         borderRadius: 5,
  //       }}>
  //       <TouchableOpacity onLongPress={() => ChangeEditPlace(item)}>
  //         <View style={{marginTop: 10, marginBottom: 10, borderRadius: 5}}>
  //           <View style={{flexDirection: 'row'}}>
  //              <Text style={{fontSize: 18, marginLeft: 20, color: 'white'}}>
  //               {Moment(item?.place.timeOrder).format('DD-MM-yyyy')}
  //             </Text>
  //              <Text
  //               style={{
  //                 alignSelf: 'center',
  //                 marginLeft: 40,
  //                 fontSize: 18,
  //                 fontWeight: 'bold',
  //                 color: 'white',
  //                 width:"50%"
  //               }}>
  //               {item?.custom?.name}
  //             </Text>
  //           </View>
  //           <Text
  //             style={{
  //               marginTop: 10,
  //               fontSize: 18,
  //               fontWeight: 'bold',
  //               marginLeft: 20,
  //               color: 'white',
  //             }}>
  //             Sản Phẩm:{' '}
  //           </Text>
  //           {item?.Place_Product?.map((item, index) => (
  //             <RenderItemProduct
  //               item={item}
  //               key={index + ' ' + item.id + Math.random() * 100}
  //             />
  //           ))}
  //         </View>
  //       </TouchableOpacity>
  //       <View>
  //         {item?.place.noteOrder ? (
  //           <Text style={{marginLeft: 20, color: 'white', fontStyle: 'italic'}}>
  //             Ghi chú: {item.place.noteOrder}
  //           </Text>
  //         ) : (
  //           <View />
  //         )}

  //         <View style={{flexDirection: 'row', marginLeft: '5%', marginTop: 20}}>
  //           <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
  //             Tổng tiền : {sumPrice(item.Place_Product)} đ
  //           </Text>
  //         </View>
  //         <View style={{width: '95%', alignSelf: 'center'}}>
  //           <TouchableOpacity
  //             style={{
  //               height: 40,
  //               alignSelf: 'flex-end',
  //               marginTop: 10,
  //               width: 80,
  //               backgroundColor: '#30d90d',
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               marginBottom: 10,
  //               borderRadius: 5,
  //             }}>
  //             <Text style={{color: 'white', fontWeight: 'bold'}}>
  //               {item.place.statusOrder}
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View> 
  //     </View>
  //   );
  // };
  function colorStatus(status){
    switch (status){
      case "New" : return "#40bc8d"; 
      case "Done": return "#39403a";
      case "Cancel": return "#fe95a9";
      default:
        return "black";
    }
  }

  const RenderItem = ({item}) => {
    return(
      <TouchableOpacity onPress={() => ChangeEditPlace(item)}
      style ={{width:"95%", alignSelf:"center", justifyContent:"space-between", flexDirection:"row", marginTop: 10, borderBottomWidth:0.3, borderBottomColor:"gray"}}>
        <View style ={{marginBottom:10}}> 
            <Text style ={{fontSize: 20}}>{item?.custom?.name}</Text>
            <Text  style ={{color :"gray", marginTop:5}}>{item?.custom?.note}</Text>
            <Text  style ={{color :"gray", marginTop:5}}>{Moment(item?.place.timeOrder).format('DD-MM')}</Text>
        </View>
        <View >
          <Text style ={{fontSize:18}}>{sumPrice(item.Place_Product)}</Text>
          <Text style ={{color:colorStatus(item.place.statusOrder), marginTop:10, fontSize:16, alignSelf:"center"}}>{item.place.statusOrder}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  function onSearch() {
    setCheckInput(!checkInput);
    setDataPlace(data);
  }

  function chooseDate() {
    setShow(true);
  }

  return (
    <View style={styles.container}>
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
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Feather name="menu" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 18}}>Quản lý đơn hàng</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={onAddPlace}>
              <Feather name="plus-square" size={26} color="white" />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={onSearch} style={{marginLeft: 10}}>
              <Feather name="search" size={26} color="white" />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View
            style={{
              flexDirection: 'row',
              height: 10,
              width: '95%',
              alignSelf: 'center',
              marginTop: 5,
            }}>
            {/* <TouchableOpacity
              onPress={chooseDate}
              style={{
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: 'gray',
              }}>
              <Text>{Moment(date).format('DD-MM-yyyy')}</Text>
            </TouchableOpacity> */}
            {/* <View style={{width: '60%'}}>
              <Input
                value={input_search}
                onChangeText={text => searchText(text)}
              />
            </View> */}
          </View>
          <View style={{height: 50,width: '90%', alignSelf:"center", borderColor:"gray", backgroundColor:"#e1e3e1", borderRadius:20}}>
              <Input
              placeholder = "Nhập tên, số điện thoại"
             leftIcon={
              <Icon
                name='search'
                size={16}
                color='gray'
              />
            }
              inputContainerStyle = {{borderBottomWidth: 0}}
               style ={{ paddingLeft: 15}}
                value={input_search}
                onChangeText={text => searchText(text)}
              />
            </View>
        {dataPlace?.map((item, index) => (
          <RenderItem
            item={item}
            key={
              index +
              ' ' +
              item.id +
              ' ' +
              Math.random() * 100
            }
          />
        ))}
      </ScrollView>
      {show && (
        <DateTimePicker
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

export default Home;

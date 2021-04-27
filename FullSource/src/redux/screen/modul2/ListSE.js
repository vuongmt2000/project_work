import React, {useState, useEffect} from 'react';
import * as Action from '../../actions/index';
import {openDatabase} from 'react-native-sqlite-storage';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Picker,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import IconA from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

const getImage = nameImg => {
  switch (nameImg) {
    case 'orange-juice':
      return (
        <Image
          source={require('../assets/orange-juice.png')}
          style={styles.image2}
        />
      );
      break;
    case 'car':
      return (
        <Image source={require('../assets/car.png')} style={styles.image2} />
      );
      break;
    case 'game-console':
      return (
        <Image
          source={require('../assets/game-console.png')}
          style={styles.image2}
        />
      );
      break;
    case 'house':
      return (
        <Image source={require('../assets/house.png')} style={styles.image2} />
      );
      break;
    case 'insurance':
      return (
        <Image
          source={require('../assets/insurance.png')}
          style={styles.image2}
        />
      );
      break;
    case 'gift-box':
      return (
        <Image
          source={require('../assets/gift-box.png')}
          style={styles.image2}
        />
      );
      break;
    case 'university':
      return (
        <Image
          source={require('../assets/university.png')}
          style={styles.image2}
        />
      );
      break;
    case 'heartbeat':
      return (
        <Image
          source={require('../assets/heartbeat.png')}
          style={styles.image2}
        />
      );
      break;
    case 'invoice':
      return (
        <Image
          source={require('../assets/invoice.png')}
          style={styles.image2}
        />
      );
      break;
    case 'like':
      return (
        <Image source={require('../assets/like.png')} style={styles.image2} />
      );
      break;
    case 'shop':
      return (
        <Image source={require('../assets/shop.png')} style={styles.image2} />
      );
      break;
    case 'analytics':
      return (
        <Image
          source={require('../assets/analytics.png')}
          style={styles.image2}
        />
      );
      break;
    case 'present-box':
      return (
        <Image
          source={require('../assets/present-box.png')}
          style={styles.image2}
        />
      );
      break;
    case 'sale':
      return (
        <Image source={require('../assets/sale.png')} style={styles.image2} />
      );
      break;
    case 'money':
      return (
        <Image source={require('../assets/money.png')} style={styles.image2} />
      );
      break;
    case 'trophy':
      return (
        <Image source={require('../assets/trophy.png')} style={styles.image2} />
      );
      break;
    case 'salary':
      return (
        <Image source={require('../assets/salary.png')} style={styles.image2} />
      );
      break;
    case 'discount':
      return (
        <Image
          source={require('../assets/discount.png')}
          style={styles.image2}
        />
      );
      break;
    default:
      return (
        <View
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            backgroundColor: '#b5bab9',
          }}>
          <FontAwesome name="question" size={30} color="#737a78" />
        </View>
      );
  }
};

var db = openDatabase({
  name: 'mydbase.db',
  createFromLocation: '~sqlite.db',
});

const caculateTotalS = data => {
  let sumS = 0;
  for (let i = 0; i < data.length; i++) {
    sumS += data[i].cost_S;
  }
  return sumS;
};

const caculateTotalE = data => {
  let sumE = 0;
  for (let i = 0; i < data.length; i++) {
    sumE += data[i].cost_E;
  }
  return sumE;
};

const fomatDate = str => {
  let arr = str.split('-');
  return `${arr[2]}/${arr[1]}/${arr[0]}`;
};

const filterStatus = (data, status) => {
  switch (status) {
    case 'All':
      return data;
      break;
    case 'Pending':
      return data.filter(item => item.status == 'pending');
    default:
      return data.filter(item => item.status == 'done');
      break;
  }
};

const filterStatusPlace = (data, status) => {
  switch (status) {
    case 'All':
      return data;
      break;
    case 'Pending':
      return data.filter(item => item.place.statusOrder == 'pending');
    default:
      return data.filter(item => item.place.statusOrder == 'done');
      break;
  }
};

const caculateTotalP = data => {
  let sumP = 0;

  for (let i = 0; i < data?.length; i++) {
    let tp1 = parseFloat(data[i].quantity * data[i].valueProduct);

    let tp2 =
      parseFloat(data[i].quantity * data[i].valueProduct) *
      (parseFloat(data[i].discount) / 100);

    sumP += tp1 - tp2;
  }

  return sumP;
};

const ListSE = ({navigation}) => {
  const [selectPicker, setSelectPicker] = useState('All');
  const [showSpending, setShowSpending] = useState(true);
  const [showSale, setShowSale] = useState(false);
  const disPatch = useDispatch();
  const dataAll = useSelector(state => state.eaReducer.dataCustom);

  const DeleteRowDBActionS = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM  spending where id=?', [id], (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Deleted successfully',
            [
              {
                text: 'Ok',
                onPress: () => disPatch(Action.fetchSpending()),
              },
            ],
            {cancelable: false},
          );
        } else {
          alert('Please insert a valid Id');
        }
      });
    });
  };

  const DeleteRowDBActionE = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM  earning where id=?', [id], (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Deleted successfully',
            [
              {
                text: 'Ok',
                onPress: () => disPatch(Action.fetchEarning()),
              },
            ],
            {cancelable: false},
          );
        } else {
          alert('Please insert a valid Id');
        }
      });
    });
  };

  console.log(dataAll);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 2}}>
          <View style={styles.logo}>
            <IconI name="ios-wallet-sharp" size={60} color="#b50000" />
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={styles.rowButtonTop}>
            <TouchableOpacity
              style={styles.buttonTop}
              onPress={() => {
                setShowSpending(true);
                setShowSale(false);
              }}>
              <View>
                {showSpending ? (
                  showSale === true ? (
                    <Text style={[styles.txtButton]}>DS chi</Text>
                  ) : (
                    <Text style={[styles.txtButton, {color: 'red'}]}>
                      DS chi
                    </Text>
                  )
                ) : (
                  <Text style={[styles.txtButton]}>DS chi</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTop}
              onPress={() => {
                setShowSpending(false);
                setShowSale(false);
              }}>
              <View>
                {showSpending === false ? (
                  showSale === true ? (
                    <Text style={[styles.txtButton]}>DS thu</Text>
                  ) : (
                    <Text style={[styles.txtButton, {color: 'blue'}]}>
                      DS thu
                    </Text>
                  )
                ) : (
                  <Text style={[styles.txtButton]}>DS thu</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTop}
              onPress={() => {
                setShowSale(!showSale);
              }}>
              <View>
                {showSale === true ? (
                  <Text style={[styles.txtButton, {color: '#db146a'}]}>
                    DS xuất
                  </Text>
                ) : (
                  <Text style={styles.txtButton}>DS xuất</Text>
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.buttonTop}>
              <Picker
                selectedValue={selectPicker}
                style={{height: 20, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectPicker(itemValue)
                }
                itemStyle={{fontSize: 12, padding: 0}}>
                <Picker.Item label="Pending" value="Pending" />
                <Picker.Item label="Done" value="Done" />
                <Picker.Item label="All" value="All" />
              </Picker>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 50,
                padding: 2,
              }}
              onPress={() => navigation.navigate('AddBill')}>
              <IconA name="plus" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {showSale === true
            ? dataAll.map(it => {
                let earnMoney = 0;
                let data = it.dataItem[2];
                let dataP = filterStatusPlace(data, selectPicker);
                for (let i = 0; i < it.dataItem[2].length; i++)
                  if (it.dataItem[2][i].place.statusOrder === 'Done')
                    earnMoney += caculateTotalP(
                      it.dataItem[2][i].Place_Product,
                    );
                if (dataP.length > 0)
                  return (
                    <View
                      style={styles.childrenFlat}
                      key={it.title + Math.random() * 100}>
                      <View style={styles.bodyChildrenHeader}>
                        <Text style={styles.title}>{fomatDate(it.title)}</Text>
                        <Text style={[styles.total, {color: 'blue'}]}>
                          +
                          {earnMoney
                            ?.toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                        </Text>
                      </View>
                      {dataP?.map(item => {
                        let product = item.Place_Product;
                        console.log(product);
                        return product?.map(e => {
                          console.log('e :>> ', e);
                          return (
                            <TouchableOpacity
                              style={styles.row}
                              key={Math.random() * 100 + 'a'}
                              onPress={() =>
                                navigation.navigate('Sale', {
                                  screen: 'EditPlace',
                                  params: {
                                    item: item,
                                  },
                                })
                              }>
                              <View style={styles.bodyChildrenContent}>
                                <Image
                                  source={require('../assets/box-outline-filled.png')}
                                  style={{width: 50, height: 50}}
                                />
                                <View
                                  style={{marginLeft: 10}}
                                  key={Math.random() * 100 + 'b'}>
                                  <Text
                                    style={[
                                      styles.txtContent,
                                      {color: 'black', fontSize: 20},
                                    ]}>
                                    {e.nameProduct} (<Text>x{e.quantity}</Text>)
                                  </Text>
                                  <Text style={styles.txtContent}>
                                    {item.custom?.name}
                                  </Text>
                                  <Text style={styles.txtContent}>
                                    Trạng thái:{' '}
                                    {item.place.statusOrder === 'New' ? (
                                      <Text style={{color: '#e3e30e'}}>
                                        Pending
                                      </Text>
                                    ) : (
                                      <Text style={{color: 'green'}}>
                                        {item.place.statusOrder}
                                      </Text>
                                    )}
                                  </Text>
                                </View>
                              </View>
                              <Text>
                                {caculateTotalP(product)
                                  ?.toString()
                                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                              </Text>
                            </TouchableOpacity>
                          );
                        });
                      })}
                    </View>
                  );
              })
            : showSpending === true
            ? dataAll?.map(item => {
                let data = item.dataItem[0];
                let dataS = filterStatus(data, selectPicker);
                let totalS = caculateTotalS(dataS);
                if (totalS !== 0)
                  return (
                    <View
                      style={styles.childrenFlat}
                      key={item.title + Math.random()}>
                      <View style={styles.bodyChildrenHeader}>
                        <Text style={styles.title}>
                          {fomatDate(item.title)}
                        </Text>
                        <Text style={[styles.total, {color: 'red'}]}>
                          -
                          {totalS
                            ?.toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                        </Text>
                      </View>
                      {dataS?.map(e => {
                        return (
                          <TouchableOpacity
                            style={styles.row}
                            key={Math.random() * 10}
                            onLongPress={() => {
                              Alert.alert(
                                'Cảnh báo',
                                'Bạn có chắc chắn muốn xóa',
                                [
                                  {text: 'cancel'},
                                  {
                                    text: 'OK',
                                    onPress: () => {
                                      DeleteRowDBActionS(e.id);
                                    },
                                  },
                                ],
                              );
                            }}
                            onPress={() =>
                              navigation.navigate('EditS', {
                                editS: true,
                                data: e,
                              })
                            }>
                            <View style={styles.bodyChildrenContent}>
                              {getImage(e.img_S)}
                              <View style={{marginLeft: 10}}>
                                <Text
                                  style={[
                                    styles.txtContent,
                                    {color: 'black', fontSize: 20},
                                  ]}>
                                  {e.name_S}
                                </Text>
                                <Text style={styles.txtContent}>
                                  Ghi chú: {e.note_S}
                                </Text>
                                <Text style={styles.txtContent}>
                                  Trạng thái:{' '}
                                  {
                                    <Text style={{color: 'green'}}>
                                      {e.status}
                                    </Text>
                                  }
                                </Text>
                              </View>
                            </View>
                            <Text>
                              {e.cost_S
                                .toString()
                                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
              })
            : dataAll?.map(item => {
                let data = item.dataItem[1];
                let dataE = filterStatus(data, selectPicker);
                let totalE = caculateTotalE(dataE);
                if (totalE !== 0)
                  return (
                    <View
                      style={styles.childrenFlat}
                      key={item.title + Math.random()}>
                      <View style={styles.bodyChildrenHeader}>
                        <Text style={styles.title}>
                          {fomatDate(item.title)}
                        </Text>
                        <Text style={[styles.total, {color: 'blue'}]}>
                          +
                          {totalE
                            ?.toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                        </Text>
                      </View>
                      {dataE?.map(e => {
                        return (
                          <TouchableOpacity
                            style={styles.row}
                            key={Math.random() * 10}
                            onLongPress={() => {
                              Alert.alert(
                                'Cảnh báo',
                                'Bạn có chắc chắn muốn xóa',
                                [
                                  {text: 'cancel'},
                                  {
                                    text: 'OK',
                                    onPress: () => {
                                      DeleteRowDBActionE(e.id);
                                    },
                                  },
                                ],
                              );
                            }}
                            onPress={() =>
                              navigation.navigate('EditS', {
                                editS: false,
                                data: e,
                              })
                            }>
                            <View style={styles.bodyChildrenContent}>
                              {getImage(e.img_E)}
                              <View style={{marginLeft: 10}}>
                                <Text
                                  style={[
                                    styles.txtContent,
                                    {color: 'black', fontSize: 20},
                                  ]}>
                                  {e.name_E}
                                </Text>
                                <Text style={styles.txtContent}>
                                  Ghi chú: {e.note_E}
                                </Text>
                                <Text style={styles.txtContent}>
                                  Trạng thái:{' '}
                                  {
                                    <Text style={{color: 'green'}}>
                                      {e.status}
                                    </Text>
                                  }
                                </Text>
                              </View>
                            </View>
                            <Text>
                              {e.cost_E
                                .toString()
                                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
              })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ListSE;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: '#b50000',
    padding: 6,
  },
  body: {
    flex: 2,
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowButtonTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    padding: 10,
  },
  buttonTop: {
    padding: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  txtButton: {
    color: 'black',
    textAlign: 'center',
  },
  childrenFlat: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
  },
  total: {
    fontSize: 20,
  },
  imgChildren: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  bodyChildrenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  bodyChildrenContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  content: {
    marginLeft: 20,
  },
  txtContent: {
    color: 'gray',
  },
  image2: {
    width: 50,
    height: 50,
  },
});

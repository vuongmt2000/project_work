import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, ScrollView, TextInput, StyleSheet} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
var newDate = new Date();
var datetime =
  '' +
  newDate.getDate() +
  '/' +
  (newDate.getMonth() + 1) +
  '/' +
  newDate.getFullYear();

const Recipe = {
  1: {price: 1678},
  2: {price: 1734},
  3: {price: 2014},
  4: {price: 2536},
  5: {price: 2834},
  6: {price: 2927},
};

var cost = 0;
var cost2 = 0;
var cost3 = 0;
var cost4 = 0;

const fotmatMoney = costBill => {
  return Number(costBill)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const genCost = numberBill => {
  let mapJsx = [];
  const tableHead = ['Bậc', 'Số kWh', 'Đơn giá (vnđ)', 'Thành tiền (vnđ)'];
  if (numberBill <= 50) {
    let rowJsx = [];
    cost = numberBill * Recipe[1].price;

    for (let i = 1; i <= 4; i++) {
      if (i == 1) {
        rowJsx.push(1);
      } else if (i == 2) {
        rowJsx.push(numberBill);
      } else if (i == 3) {
        rowJsx.push(Recipe[1].price);
      } else {
        rowJsx.push(Recipe[1].price * numberBill);
      }
    }
    mapJsx.push(rowJsx);
    return (
      <View>
        <Table>
          <Row
            data={tableHead}
            flexArr={[1, 2, 3, 4]}
            textStyle={{textAlign: 'center', fontWeight: 'bold'}}></Row>
          <Rows
            data={mapJsx}
            flexArr={[1, 2, 3, 4]}
            textStyle={{textAlign: 'center'}}></Rows>
        </Table>
      </View>
    );
  } else if (numberBill <= 100) {
    for (let i = 0; i < 2; i++) {
      mapJsx.push([]);
      for (let j = 0; j < 4; j++) {
        if (i == 0) {
          if (j == 0) {
            mapJsx[i].push(1);
          } else if (j == 1) {
            mapJsx[i].push(50);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[1].price);
          } else {
            mapJsx[i].push(Recipe[1].price * 50);
          }
        } else if (i == 1) {
          if (j == 0) {
            mapJsx[i].push(2);
          } else if (j == 1) {
            mapJsx[i].push(numberBill - 50);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[2].price);
          } else {
            mapJsx[i].push(Recipe[2].price * (numberBill - 50));
          }
        }
      }
    }
    cost = 50 * Recipe[1].price + (numberBill - 50) * Recipe[2].price;
    return (
      <View>
        <Table>
          <Row
            data={tableHead}
            flexArr={[1, 2, 3, 4]}
            textStyle={{textAlign: 'center', fontWeight: 'bold'}}></Row>
          <Rows
            data={mapJsx}
            flexArr={[1, 2, 3, 4]}
            textStyle={{textAlign: 'center'}}></Rows>
        </Table>
      </View>
    );
  } else if (numberBill <= 200) {
    for (let i = 0; i < 3; i++) {
      mapJsx.push([]);
      for (let j = 0; j < 4; j++) {
        if (i == 0) {
          if (j == 0) {
            mapJsx[i].push(1);
          } else if (j == 1) {
            mapJsx[i].push(50);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[1].price);
          } else {
            mapJsx[i].push(Recipe[1].price * 50);
          }
        } else if (i == 1) {
          if (j == 0) {
            mapJsx[i].push(2);
          } else if (j == 1) {
            mapJsx[i].push(50);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[2].price);
          } else {
            mapJsx[i].push(Recipe[2].price * 50);
          }
        } else if (i == 2) {
          if (j == 0) {
            mapJsx[i].push(3);
          } else if (j == 1) {
            mapJsx[i].push(numberBill - 100);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[3].price);
          } else {
            mapJsx[i].push(Recipe[3].price * (numberBill - 100));
          }
        }
      }
    }
    cost =
      50 * Recipe[1].price +
      50 * Recipe[2].price +
      (numberBill - 100) * Recipe[3].price;
    return (
      <View>
        <Table>
          <Row
            data={tableHead}
            flexArr={[1, 2, 3, 4]}
            textStyle={{textAlign: 'center', fontWeight: 'bold'}}></Row>
          <Rows
            data={mapJsx}
            flexArr={[1, 2, 3, 4]}
            textStyle={{textAlign: 'center'}}></Rows>
        </Table>
      </View>
    );
  } else if (numberBill <= 300) {
    for (let i = 0; i < 4; i++) {
      mapJsx.push([]);
      for (let j = 0; j < 4; j++) {
        if (i == 0) {
          if (j == 0) {
            mapJsx[i].push(1);
          } else if (j == 1) {
            mapJsx[i].push(50);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[1].price);
          } else {
            mapJsx[i].push(Recipe[1].price * 50);
          }
        } else if (i == 1) {
          if (j == 0) {
            mapJsx[i].push(2);
          } else if (j == 1) {
            mapJsx[i].push(50);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[2].price);
          } else {
            mapJsx[i].push(Recipe[2].price * 50);
          }
        } else if (i == 2) {
          if (j == 0) {
            mapJsx[i].push(3);
          } else if (j == 1) {
            mapJsx[i].push(100);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[3].price);
          } else {
            mapJsx[i].push(Recipe[3].price * 100);
          }
        } else if (i == 3) {
          if (j == 0) {
            mapJsx[i].push(4);
          } else if (j == 1) {
            mapJsx[i].push(numberBill - 200);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[4].price);
          } else {
            mapJsx[i].push(Recipe[4].price * (numberBill - 200));
          }
        }
      }
    }
    cost =
      50 * Recipe[1].price +
      50 * Recipe[2].price +
      100 * Recipe[3].price +
      (numberBill - 200) * Recipe[4].price;
    return (
      <View>
        <Table>
          <Row
            data={tableHead}
            flexArr={[1, 2, 3, 4]}
            textStyle={{textAlign: 'center', fontWeight: 'bold'}}></Row>
          <Rows
            data={mapJsx}
            flexArr={[1, 2, 3, 4]}
            textStyle={{textAlign: 'center'}}></Rows>
        </Table>
      </View>
    );
  } else if (numberBill <= 400) {
    for (let i = 0; i < 5; i++) {
      mapJsx.push([]);
      for (let j = 0; j < 4; j++) {
        if (i == 0) {
          if (j == 0) {
            mapJsx[i].push(1);
          } else if (j == 1) {
            mapJsx[i].push(50);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[1].price);
          } else {
            mapJsx[i].push(Recipe[1].price * 50);
          }
        } else if (i == 1) {
          if (j == 0) {
            mapJsx[i].push(2);
          } else if (j == 1) {
            mapJsx[i].push(50);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[2].price);
          } else {
            mapJsx[i].push(Recipe[2].price * 50);
          }
        } else if (i == 2) {
          if (j == 0) {
            mapJsx[i].push(3);
          } else if (j == 1) {
            mapJsx[i].push(100);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[3].price);
          } else {
            mapJsx[i].push(Recipe[3].price * 100);
          }
        } else if (i == 3) {
          if (j == 0) {
            mapJsx[i].push(4);
          } else if (j == 1) {
            mapJsx[i].push(100);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[4].price);
          } else {
            mapJsx[i].push(Recipe[4].price * 100);
          }
        } else if (i == 4) {
          if (j == 0) {
            mapJsx[i].push(5);
          } else if (j == 1) {
            mapJsx[i].push(numberBill - 300);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[5].price);
          } else {
            mapJsx[i].push(Recipe[5].price * (numberBill - 300));
          }
        }
      }
    }
    cost =
      50 * Recipe[1].price +
      50 * Recipe[2].price +
      100 * Recipe[3].price +
      100 * Recipe[4].price +
      (numberBill - 300) * Recipe[5].price;
    return (
      <View>
        <Table>
          <Row
            data={tableHead}
            flexArr={[1, 2, 3, 4]}
            textStyle={{textAlign: 'center', fontWeight: 'bold'}}></Row>
          <Rows
            data={mapJsx}
            flexArr={[1, 2, 3, 4]}
            textStyle={{textAlign: 'center'}}></Rows>
        </Table>
      </View>
    );
  } else if (numberBill > 400) {
    for (let i = 0; i < 6; i++) {
      mapJsx.push([]);
      for (let j = 0; j < 4; j++) {
        if (i == 0) {
          if (j == 0) {
            mapJsx[i].push(1);
          } else if (j == 1) {
            mapJsx[i].push(50);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[1].price);
          } else {
            mapJsx[i].push(Recipe[1].price * 50);
          }
        } else if (i == 1) {
          if (j == 0) {
            mapJsx[i].push(2);
          } else if (j == 1) {
            mapJsx[i].push(50);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[2].price);
          } else {
            mapJsx[i].push(Recipe[2].price * 50);
          }
        } else if (i == 2) {
          if (j == 0) {
            mapJsx[i].push(3);
          } else if (j == 1) {
            mapJsx[i].push(100);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[3].price);
          } else {
            mapJsx[i].push(Recipe[3].price * 100);
          }
        } else if (i == 3) {
          if (j == 0) {
            mapJsx[i].push(4);
          } else if (j == 1) {
            mapJsx[i].push(100);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[4].price);
          } else {
            mapJsx[i].push(Recipe[4].price * 100);
          }
        } else if (i == 4) {
          if (j == 0) {
            mapJsx[i].push(5);
          } else if (j == 1) {
            mapJsx[i].push(100);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[5].price);
          } else {
            mapJsx[i].push(Recipe[5].price * 100);
          }
        } else if (i == 5) {
          if (j == 0) {
            mapJsx[i].push(6);
          } else if (j == 1) {
            mapJsx[i].push(numberBill - 400);
          } else if (j == 2) {
            mapJsx[i].push(Recipe[6].price);
          } else {
            mapJsx[i].push(Recipe[6].price * (numberBill - 400));
          }
        }
      }
    }
    cost =
      50 * Recipe[1].price +
      50 * Recipe[2].price +
      100 * Recipe[3].price +
      100 * Recipe[4].price +
      100 * Recipe[5].price +
      (numberBill - 400) * Recipe[6].price;
    return (
      <View>
        <Table>
          <Row
            data={tableHead}
            flexArr={[1, 2, 3, 4]}
            textStyle={{textAlign: 'center', fontWeight: 'bold'}}></Row>
          <Rows
            data={mapJsx}
            flexArr={[1, 2, 3, 4]}
            textStyle={{textAlign: 'center'}}></Rows>
        </Table>
      </View>
    );
  }
  return mapJsx;
};

const genCost2 = numberBill => {
  let mapJsx = [];
  const tableHead = ['Số kWh', 'Đơn giá (vnđ)', 'Thành tiền (vnđ)'];
  let rowJsx = [];
  cost2 = numberBill * 2666;
  for (let i = 1; i <= 3; i++) {
    if (i == 1) {
      rowJsx.push(numberBill);
    } else if (i == 2) {
      rowJsx.push(2666);
    } else {
      rowJsx.push(numberBill * 2666);
    }
  }
  mapJsx.push(rowJsx);
  return (
    <View>
      <Table>
        <Row
          data={tableHead}
          flexArr={[2, 2, 3]}
          textStyle={{textAlign: 'center', fontWeight: 'bold'}}></Row>
        <Rows
          data={mapJsx}
          flexArr={[2, 2, 3]}
          textStyle={{textAlign: 'center'}}></Rows>
      </Table>
    </View>
  );
};
const genCost3 = numberBill => {
  let mapJsx = [];
  const tableHead = ['Số kWh', 'Đơn giá (vnđ)', 'Thành tiền (vnđ)'];
  let rowJsx = [];
  cost3 = numberBill * 1685;
  for (let i = 1; i <= 3; i++) {
    if (i == 1) {
      rowJsx.push(numberBill);
    } else if (i == 2) {
      rowJsx.push(1685);
    } else {
      rowJsx.push(numberBill * 1685);
    }
  }
  mapJsx.push(rowJsx);
  return (
    <View>
      <Table>
        <Row
          data={tableHead}
          flexArr={[2, 2, 3]}
          textStyle={{textAlign: 'center', fontWeight: 'bold'}}></Row>
        <Rows
          data={mapJsx}
          flexArr={[2, 2, 3]}
          textStyle={{textAlign: 'center'}}></Rows>
      </Table>
    </View>
  );
};
const genCost4 = numberBill => {
  let mapJsx = [];
  const tableHead = ['Số kWh', 'Đơn giá (vnđ)', 'Thành tiền (vnđ)'];
  let rowJsx = [];
  cost4 = numberBill * 1902;
  for (let i = 1; i <= 3; i++) {
    if (i == 1) {
      rowJsx.push(numberBill);
    } else if (i == 2) {
      rowJsx.push(1902);
    } else {
      rowJsx.push(numberBill * 1902);
    }
  }
  mapJsx.push(rowJsx);
  return (
    <View>
      <Table>
        <Row
          data={tableHead}
          flexArr={[2, 2, 3]}
          textStyle={{textAlign: 'center', fontWeight: 'bold'}}></Row>
        <Rows
          data={mapJsx}
          flexArr={[2, 2, 3]}
          textStyle={{textAlign: 'center'}}></Rows>
      </Table>
    </View>
  );
};
const ElectricBill = () => {
  const [numberBill, setNumberBill] = useState(0);
  const [beforeNumber, setBeforeNumber] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(0);
  useEffect(() => {
    if (currentNumber > beforeNumber) {
      setNumberBill(currentNumber - beforeNumber);
    }
  },[]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.Container1}>
        <Text style={styles.header}>NHẬP SỐ ĐIỆN SỬ DỤNG</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>Nhập chỉ số cũ: </Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            onChangeText={val => setBeforeNumber(val)}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Nhập chỉ số mới: </Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            onChangeText={val => setCurrentNumber(val)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <Text style={{color: 'gray'}}>hoặc</Text>
          <View
            style={{
              flexGrow: 1,
              height: 1,
              borderWidth: 0.5,
              borderColor: '#E4E6E8',
            }}></View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Nhập số điện sử dụng: </Text>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            onChangeText={val => setNumberBill(val)}
            autoFocus={true}
          />
        </View>
      </View>
      {numberBill !== 0 && (
        <View style={styles.Container2}>
          <View>
            <Text style={styles.header}>TIỀN ĐIỆN SINH HOẠT - HỘ GIA ĐÌNH</Text>
            <View style={styles.ContainerBill}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: 'bold'}}>
                  Tổng số kWh sử dụng: {fotmatMoney(numberBill)}
                </Text>
                <Text style={{color: 'gray'}}>Ngày lập bảng: {datetime}</Text>
              </View>
              <View>
                <View
                  style={{
                    marginTop: 5,
                    borderColor: '#cccccc',
                    width: '100%',
                    height: 1,
                    borderWidth: 0.5,
                  }}></View>
                {genCost(numberBill, cost)}
                <View
                  style={{
                    marginTop: 5,
                    borderColor: '#cccccc',
                    width: '100%',
                    height: 1,
                    borderWidth: 0.5,
                  }}></View>

                <View
                  style={{
                    margin: 10,
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Tổng cộng: </Text>
                    <Text>{fotmatMoney(cost)}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Thuế VAT 10% : </Text>
                    <Text>{fotmatMoney(cost / 10)}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontWeight: 'bold'}}>Thành tiền : </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {fotmatMoney(cost + cost / 10)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {numberBill !== 0 && (
        <View style={styles.Container2}>
          <View>
            <Text style={styles.header}>TIỀN ĐIỆN KINH DOANH DỊCH VỤ</Text>
            <View style={styles.ContainerBill}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: 'bold'}}>
                  Tổng số kWh sử dụng: {fotmatMoney(numberBill)}
                </Text>
                <Text style={{color: 'gray'}}>Ngày lập bảng: {datetime}</Text>
              </View>
              <View>
                <View
                  style={{
                    marginTop: 5,
                    borderColor: '#cccccc',
                    width: '100%',
                    height: 1,
                    borderWidth: 0.5,
                  }}></View>
                {genCost2(numberBill)}
                <View
                  style={{
                    marginTop: 5,
                    borderColor: '#cccccc',
                    width: '100%',
                    height: 1,
                    borderWidth: 0.5,
                  }}></View>
                <View
                  style={{
                    margin: 10,
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Tổng cộng: </Text>
                    <Text>{fotmatMoney(cost2)}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Thuế VAT 10% : </Text>
                    <Text>{fotmatMoney(cost2 / 10)}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontWeight: 'bold'}}>Thành tiền : </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {fotmatMoney(cost2 + cost2 / 10)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {numberBill !== 0 && (
        <View style={styles.Container2}>
          <View>
            <Text style={styles.header}>TIỀN ĐIỆN SẢN XUẤT</Text>
            <View style={styles.ContainerBill}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: 'bold'}}>
                  Tổng số kWh sử dụng: {fotmatMoney(numberBill)}
                </Text>
                <Text style={{color: 'gray'}}>Ngày lập bảng: {datetime}</Text>
              </View>
              <View>
                <View
                  style={{
                    marginTop: 5,
                    borderColor: '#cccccc',
                    width: '100%',
                    height: 1,
                    borderWidth: 0.5,
                  }}></View>
                {genCost3(numberBill)}
                <View
                  style={{
                    marginTop: 5,
                    borderColor: '#cccccc',
                    width: '100%',
                    height: 1,
                    borderWidth: 0.5,
                  }}></View>
                <View
                  style={{
                    margin: 10,
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Tổng cộng: </Text>
                    <Text>{fotmatMoney(cost3)}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Thuế VAT 10% : </Text>
                    <Text>{fotmatMoney(cost3 / 10)}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontWeight: 'bold'}}>Thành tiền : </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {fotmatMoney(cost3 + cost3 / 10)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {numberBill !== 0 && (
        <View style={styles.Container2}>
          <View>
            <Text style={styles.header}>TIỀN ĐIỆN NHÀ NƯỚC</Text>
            <View style={styles.ContainerBill}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: 'bold'}}>
                  Tổng số kWh sử dụng: {fotmatMoney(numberBill)}
                </Text>
                <Text style={{color: 'gray'}}>Ngày lập bảng: {datetime}</Text>
              </View>
              <View>
                <View
                  style={{
                    marginTop: 5,
                    borderColor: '#cccccc',
                    width: '100%',
                    height: 1,
                    borderWidth: 0.5,
                  }}></View>

                {genCost4(numberBill)}
                <View
                  style={{
                    marginTop: 5,
                    borderColor: '#cccccc',
                    width: '100%',
                    height: 1,
                    borderWidth: 0.5,
                  }}></View>
                <View
                  style={{
                    margin: 10,
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Tổng cộng: </Text>
                    <Text>{fotmatMoney(cost4)}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text>Thuế VAT 10% : </Text>
                    <Text>{fotmatMoney(cost4 / 10)}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontWeight: 'bold'}}>Thành tiền : </Text>
                    <Text style={{fontWeight: 'bold'}}>
                      {fotmatMoney(cost4 + cost4 / 10)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container1: {
    flex: 1,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    color: '#b50000',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomColor: '#E6E6E7',
    borderWidth: 0.5,
    fontSize: 25,
  },
  Container2: {
    flex: 1,
    width: '100%',
    padding: 10,
    marginBottom: 25,
    borderRadius: 10,
  },
  ContainerBill: {
    borderWidth: 0.5,
    borderColor: '#cccccc',
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },
  styleText1: {
    flex: 1,
    textAlign: 'center',
  },
  styleText1: {
    flex: 2,
    textAlign: 'center',
  },
  styleText1: {
    flex: 3,
    textAlign: 'center',
  },
  styleText1: {
    flex: 4,
    textAlign: 'center',
  },
});

export default ElectricBill;

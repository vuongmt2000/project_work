import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ElectricBill from './ElectricBill';
import Price from './Price';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Tính Tiền Điện"
      tabBarOptions={{
        activeTintColor: '#b50000',
        activeBackgroundColor: '#fff0f0',
      }}>
      <Tab.Screen
        name="Tính Tiền Điện"
        component={ElectricBill}
        options={{
          tabBarLabel: 'Tính Tiền Điện',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Đơn Giá"
        component={Price}
        options={{
          tabBarLabel: 'Đơn Giá',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="menu" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabNavigation = () => {
  return <MyTabs />;
};

export default TabNavigation;

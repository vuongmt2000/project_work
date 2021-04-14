import React from 'react';
import { View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import {  Provider,
    createStoreHook,
    createDispatchHook,
    createSelectorHook} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootSaga from './saga/rootSaga'
import creatSagaMiddleware from 'redux-saga';
import allReducer from './reducers/index'
 
// import screens
import Home from './components/screens/Home'
import ListCustom from './components/screens/ListCustom'
import ListProduct from './components/screens/ListProduct'
import OverView from './components/screens/OverView'
import AddCustom from './components/screens/AddCustom'
import EditCustom from './components/screens/EditCustom'

const MyContext = React.createContext()
const sagaMiddleware = creatSagaMiddleware();
export const useStore = createStoreHook(MyContext)
export const useDispatch = createDispatchHook(MyContext)
export const useSelector = createSelectorHook(MyContext)
let store = createStore(allReducer,applyMiddleware(sagaMiddleware));

const App=()=> {

    
    const Tab = createBottomTabNavigator();
    const TabScreen = createStackNavigator();


    function BottomTab(){
        return(
        <Tab.Navigator 
        initialRouteName = "Khách hàng"
        tabBarOptions={{
            activeTintColor: '#e91e63',
          }}>
            <Tab.Screen  name = "Trang chủ" component ={Home} options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={26} />
          ),
        }}/>
            <Tab.Screen  name = "Khách hàng" component ={ListCustom}  options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" color={color} size={26} />
          ),
        }}
            />
            <Tab.Screen  name = "Sản phẩm" component ={ListProduct}  options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="server" color={color} size={26} />
          ),
        }}/>
            <Tab.Screen  name = "Tổng quan" component ={OverView}  options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="package" color={color} size={26} />
          ),
        }}/>
        </Tab.Navigator>
        )
    }
        function StackTab(){
            return (
        <TabScreen.Navigator
        initialRouteName ="Custom" screenOptions={{
            headerShown: false}} > 
            <TabScreen.Screen name = "Custom" component ={BottomTab} />
            <TabScreen.Screen name = "AddCustom" component ={AddCustom} />
            <TabScreen.Screen name = "EditCustom" component ={EditCustom} />
        </TabScreen.Navigator>
    )
    }

    return (
        <Provider store={store}  >
            <NavigationContainer>
                <StackTab/>
            </NavigationContainer>
        </Provider>
    );
}
sagaMiddleware.run(rootSaga);

export default App;
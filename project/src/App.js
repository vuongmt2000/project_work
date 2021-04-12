import React from 'react';
import { View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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

const MyContext = React.createContext()
const sagaMiddleware = creatSagaMiddleware();
export const useStore = createStoreHook(MyContext)
export const useDispatch = createDispatchHook(MyContext)
export const useSelector = createSelectorHook(MyContext)
let store = createStore(allReducer,applyMiddleware(sagaMiddleware));

const App=()=> {

    
    const Tab = createBottomTabNavigator();
    function BottomTab(){
        return(
        <Tab.Navigator >
            <Tab.Screen  name = "Trang chủ" component ={Home}/>
            <Tab.Screen  name = "Khách hàng" component ={ListCustom}/>
            <Tab.Screen  name = "Sản phẩm" component ={ListProduct}/>
            <Tab.Screen  name = "Tổng quan" component ={OverView}/>
        </Tab.Navigator>
        )
    }
    return (
        <Provider store={store}  >
            <NavigationContainer>
                <BottomTab/>
            </NavigationContainer>
        </Provider>
    );
}
sagaMiddleware.run(rootSaga);

export default App;
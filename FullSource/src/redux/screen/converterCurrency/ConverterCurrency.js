import {SafeAreaView, StatusBar} from 'react-native';
import Home from './Home';
import React from 'react';
const ConverterCurrency = () => {
  return (
    <>
      <SafeAreaView>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Home />
      </SafeAreaView>
    </>
  );
};

export default ConverterCurrency;

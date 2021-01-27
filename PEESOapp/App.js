/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as AntProvider } from '@ant-design/react-native';
import Navigator from './src/Navigator.js';
import enUS from '@ant-design/react-native/lib/locale-provider/en_US';
import SplashScreen from "react-native-splash-screen"
import { StatusBar, View } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    const { persistor, store } = configureStore();
    this.persistor = persistor;
    this.store = store;
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={this.store}>
        <PersistGate loading={null} persistor={this.persistor}>
          <StatusBar />
          <AntProvider locale={enUS}>
            <Navigator {...this.props} />
          </AntProvider>
        </PersistGate>
      </Provider>
    );
  }
}

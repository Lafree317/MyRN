/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import MainNavigator from './js/page/MainNavigator';

export default class MyRN extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <MainNavigator />
    )
  }
}
AppRegistry.registerComponent('MyRN', () => MyRN);

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  View
} from 'react-native';

import HomePage from './HomePage';

export default class MainNavigator extends Component {
  render() {
           let defaultName = 'HomePage';
           let defaultComponent = HomePage;
           return (
           <Navigator
             initialRoute={{ name: defaultName, component: defaultComponent }}
             
             renderScene={(route, navigator) => {
               let Component = route.component;
               return <Component {...route.params} navigator={navigator} />
             }} />
           )
         }

}

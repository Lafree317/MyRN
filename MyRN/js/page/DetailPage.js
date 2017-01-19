import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import NavigationBar from '../component/SimpleNavigationBar';

export default class DetailPage extends Component {

  render (){
    return (
      <View>
        <NavigationBar title={this.props.rowData.title}/>
        <Image
          source={{uri: this.props.rowData.url}}
          style={styles.imageStyle}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  imageStyle: {
    resizeMode :Image.resizeMode.contain,
  // 尺寸
  width:375,
  height:667-64,
  },
});


import React,{Component,PropTypes} from 'react';
import {StyleSheet,View,Text,Platform} from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';

export default class SimpleNavigationBar extends Component {
  static PropTypes = {
    title:PropTypes.string.isRequired,
    backOnPress:PropTypes.func.isRequired
  };
  render(){
    return(
      <View style={styles.toolbar}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    toolbar: {
        height: theme.actionBar.height,
        width: theme.screenWidth,
        backgroundColor: theme.actionBar.backgroundColor,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
    },
    imgBtn: {
        width: px2dp(49),
        height: px2dp(49)
    },
    title:{
        color: theme.actionBar.fontColor,
        fontSize: theme.actionBar.fontSize,
        alignItems: 'center',
        fontWeight: 'bold',
        justifyContent: 'center',
    }
});

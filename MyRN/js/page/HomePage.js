/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Text,
  Image,
  Navigator,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import NavigationBar from '../component/SimpleNavigationBar';
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
import DetailPage from './DetailPage'
var PIXIV_PIC_DATA = [
  {illust_id:"0001",title:'图片名',width:100,height:100,data:"1992年3月17日",tags:["花冠","穿越"],url:"http://www.baidu.com"}
];
var REQUEST_PIXIV_URL = 'http://www.pixiv.net/ranking.php?mode=daily&p=1&format=json';



export default class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1,row2) => row1 !== row2,
      }),
      loaded:false,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }
  render(){
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View>
        <NavigationBar title='首页'/>
        <ListView
          renderScrollComponent={(props) => <PullRefreshScrollView onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} useLoadMore={1}{...props}     />}
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          contentContainerStyle={styles.contentViewStyle}
        />
      </View>
    )
  }
  onRefresh(PullRefresh){
      PullRefresh.onRefreshEnd();
  }
  onLoadMore(PullRefresh) {
      PullRefresh.onLoadMoreEnd();
  }
  fetchData(){
    fetch(REQUEST_PIXIV_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(responseData.contents),
          loaded:true,
        });
      })
      .done();
  }

  renderLoadingView(){
    return(
      <View style={styles.container}>
        <NavigationBar title='首页'/>
        <Text>
          正在抓取数据...
        </Text>
      </View>
    )
  }
  _itemClickCallback(rowData){
    console.log(rowData)
    const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'DetailPage',
                component: DetailPage,
                params:{
                  rowData:rowData,
                }
            })
        }

  }
  _renderItem(rowData, sectionID, rowID, highlightRow){
    // return this._renderMovie(rowData)
    return (<TouchableOpacity style={styles.itemStyle}
                    onPress={this._itemClickCallback.bind(this, rowData)}
                    >
                    {this._renderMovie(rowData)}
                </TouchableOpacity>)
  }
  _renderMovie(rowData) {
    return (
      <View style={styles.itemStyle}>
        <Image
          source={{uri: rowData.url}}
          style={styles.itemImageStyle}
        />
        <Text>{rowData.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  touchable: {
    width:150,
    height:250,
  },
  itemStyle: {
    // 对齐方式

    flexDirection: 'column',
    alignItems: 'center',
      backgroundColor: '#fff',
      paddingLeft: 15,
      paddingRight: 17,
    // 尺寸
    width:175,
    height:250,
    // 左边距
    marginLeft:8

  },
  itemImageStyle: {
    // 尺寸
    width:170,
    height:200,
    // 间距
    marginBottom:5,
    resizeMode :Image.resizeMode.contain,
  },

  contentViewStyle:{
    paddingTop:10,
    flexWrap:'wrap',
    // // 主轴方向
    flexDirection:'row',
    // // // 换行

    backgroundColor:'#F5FCFF',
  },
  rightContainer:{
    flex:1,
  },
});

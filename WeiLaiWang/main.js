/**
 * Created by sunzhimin on 16/6/16.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Navigator,
  Text,
  Image,
  View
} from 'react-native';

import Header from './header';
import BdHd from './bd-hd';
import Ad from './ad';
import Search from './search';


// scroll 和高度需要手动调整,不然底部的内容没办法展示...

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      isRefreshing: false
    }
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired
  };

  render() {
    // 45 是头部导航栏的高度
    var {height} = Dimensions.get('window')-45;
    var _scrollView = ScrollView;
    return (
      <View style={styles.container}>
        <Header/>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          style={[styles.scrollView, {height: height }]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#f00"
              title="Loading..."
              titleColor="#8f8f8f"
            />
          }
        >
          <BdHd/>
          <Ad />
          <Search placeholder="输入关键词..."/>
        </ScrollView>
        <TouchableOpacity
          style={styles.goTop}
          onPress={() => { _scrollView.scrollTo({x: 0,y: 0, animated: true}); }}
        >
          <Image
            source={require('./img/icon_top.png')}
            style={styles.goTopImg}
          >
          </Image>
        </TouchableOpacity>
      </View>
    );
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 2000);
  }
}


const styles = StyleSheet.create({
  container: {
    margin: 0,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  scrollView: {
    flex:1,
    backgroundColor: '#fff',
  },
  goTop: {
    position: 'absolute',
    top: 10,
    right: 60,
  },
  goTopImg: {
    width: 24,
    height: 24,
  },
});

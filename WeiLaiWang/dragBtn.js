/**
 * Created by sunny on 16/6/28.
 *
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  PanResponder,
  Dimensions,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import Main from './main';

let SortableListView = require('./SortableListView');

let dataTabOrders;

// 获取全部数据的顺序
global.storage.load({
  key: 'dataTabOrders',
  autoSync: true,
  syncInBackground: false
}).then(ret => {
  dataTabOrders = ret;
  console.log(dataTabOrders);
}).catch(err => {
  console.info(err, '错误');
});


class RowComponent extends Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor='transparent'
        {...this.props.sortHandlers}
      >
        <Image
          source={this.props.data.url}
          style={[this.props.imgLayout]}
          resizeMode='contain'
        />
      </TouchableHighlight>
    )
  }
}

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    let {order, data, navigator} = this.props;
    this.imgLayout = this.props.deviceLayout.imgLayout;
    this.data = data;
    this.order = order;
    this.navigator = navigator;
  }

  _returnMain() {
    // -- noRefresh 记录由编辑页返回到主页,是否需要刷新,跳转(在Indicator中记录相应的位置 contentOffset.y的位置)
    this.navigator && this.navigator.replace({
      name: 'Main',
      component: Main,
      params: {
        noRefresh: true,
      }
    });
  }

  _keepData() {
    if(!dataTabOrders) {
      return false;
    }
     //更改当前页的数据
    //let index = this.props.index;
    //let activePage = this.props.activePage;
    //let data = dataTabOrders.slice();
    //console.log( this.order, dataTabOrders, data, data=== dataTabOrders, 'this.order, dataTabOrders, data');
    //dataTabOrders && global.storage.save({
    //  key: 'dataTabOrders',
    //  rawData: dataTabOrders,
    //  expires: 1000 * 2  // 2s
    //});
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={[styles.navBarRow]}>
          <TouchableOpacity
            onPress={this._returnMain.bind(this)}
            style={styles.navButton}>
            <Text style={styles.text}>
              {'<'}
            </Text>
          </TouchableOpacity>
          <Text
            style={[styles.title, {textAlign: 'center'}]}
            numberOfLines={1}
          >
            拖动排序
          </Text>
          <TouchableOpacity
            onPress={this._keepData.bind(this)}
          >
            <Text style={styles.text}>
              保存
            </Text>
          </TouchableOpacity>
        </View>
        <SortableListView
          styles={{flex: 1,flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'space-between'}}
          data={this.data}
          order={this.order}
          imgLayout={this.imgLayout}
          onRowMoved={e => {
                this.order.splice(e.to, 0, this.order.splice(e.from, 1)[0]);
                this.forceUpdate();
              }}
          renderRow={row => <RowComponent data={row} imgLayout={this.imgLayout} />}
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  navBarRow: {
    height: 45,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff5248',
  },
  text: {
    color: 'white',
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  title: {
    color: 'white',
    fontSize: 13,
  },
  returnImg: {
    width: 40,
    height: 20,
  }
});
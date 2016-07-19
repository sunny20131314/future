/**
 * Created by sunny on 16/6/28.
 *
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  PanResponder,
  Platform,
  Dimensions,
  Animated,
  TouchableHighlight,
  ToastAndroid,
  AlertIOS,
  AsyncStorage,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';
import Main from './main';

let isIos = Platform.OS === 'ios';
let SortableListView = require('./SortableListView');

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
    let {appDataOrders, data, navigator, index, activePage} = this.props;
    this.imgLayout = this.props.deviceLayout.imgLayout;
    this.data = data;
    this.order = appDataOrders[index][activePage];
    this.navigator = navigator;
    this.appDataOrders = appDataOrders;
  }

  _returnMain() {
    this.navigator && this.navigator.replace({
      name: 'Main',
      component: Main,
    });
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  async _keepData() {
    try {
      let data = JSON.stringify(this.appDataOrders);
      await AsyncStorage.setItem('appDataOrders', data);
    } catch (error) {
      !isIos ? ToastAndroid.show('保存数据失败,请稍后再试!', ToastAndroid.SHORT)
              : AlertIOS.alert(
                  '提示: ',
                  '保存数据失败,请稍后再试!'
                );
    }
    this._returnMain();
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
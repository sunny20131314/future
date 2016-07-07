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
  Image,
  Text,
  View
} from 'react-native';

console.log(global.storage);
let SortableListView = require('./SortableListView');


let data = {
  hello: {text: 'world'},
  how: {text: 'are you'},
  test: {text: 123},
  this: {text: 'is'},
  a: {text: 'a'},
  real: {text: 'real'},
  drag: {text: 'drag and drop'},
  bb: {text: 'bb'},
  cc: {text: 'cc'},
  dd: {text: 'dd'},
  ee: {text: 'ee'},
  ff: {text: 'ff'},
  gg: {text: 'gg'},
  hh: {text: 'hh'},
  ii: {text: 'ii'},
  kk: {text: 'kk'}
};

let WIDTH = Dimensions.get('window').width;
let tabWidth = WIDTH/3;
let order = Object.keys(data); //Array of keys
let tabHeight = 100;

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    //let {deviceLayout, index, order, show, alter, data, navigator} = this.props;
    let {order, data, navigator} = this.props;
    this.imgLayout = this.props.deviceLayout.imgLayout;
    this.order = order;
    this.data = data;
    this.navigator = navigator;
  }

  render() {
    console.log(this.order, this.data, this.imgLayout);
    return <SortableListView
      styles={{flex: 1,flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'space-between'}}
      data={this.data}
      order={this.order}
      tabHeight={this.imgLayout.tabHeight}
      onRowMoved={e => {
              this.order.splice(e.to, 0, this.order.splice(e.from, 1)[0]);
              this.forceUpdate();
            }}
      renderRow={row => {
        console.log(this.imgLayout);
        return <TouchableHighlight
            underlayColor={'#eee'}
            //style={{width: tabWidth, height: tabHeight, padding: 25, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}}
            style={this.imgLayout}
            {...this.props.sortHandlers}>
            <Text>{row.text}</Text>
          </TouchableHighlight>
        }
      }
    />
  }
}

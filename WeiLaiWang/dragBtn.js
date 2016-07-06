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
  jj: {text: 'jj'},
  kk: {text: 'kk'}
}

let WIDTH = Dimensions.get('window').width;
let tabWidth = WIDTH/3;
let order = Object.keys(data); //Array of keys

let RowComponent = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{width: tabWidth, height: 100, padding: 25, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}}
        {...this.props.sortHandlers}>
        <Text>{this.props.data.text}</Text>
      </TouchableHighlight>
    )
  }
});

let MyComponent = React.createClass({
  render: function() {
    return <SortableListView
      style={{flex: 1,flexDirection: 'row',
    flexWrap: 'wrap',}}
      data={data}
      order={order}
      onRowMoved={e => {
            order.splice(e.to, 0, order.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
      renderRow={row => <RowComponent data={row} />}
    />
  }
});

module.exports = MyComponent;

/**
 * 导航栏
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

//import InitialRouter from './initialRouter';
import DragBtn from './dragBtn-nospace';
//import DragReg from './dragReg';

let MyComponent = require('./dragBtn');

class TestMore extends Component {
  render() {
    return (
      <View>
        <DragBtn />
      </View>
    )
  }

}

AppRegistry.registerComponent('WeiLaiWang', () => TestMore);

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
import DragBtnContainer from './dragBtn';
import DragReg from './dragReg';


class TestMore extends Component {
  render() {
    return (
      <DragBtnContainer />
    )
  }

}

AppRegistry.registerComponent('WeiLaiWang', () => TestMore);

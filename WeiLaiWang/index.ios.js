/**
 * 导航栏
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

//import InitialRouter from './initialRouter';
//AppRegistry.registerComponent('WeiLaiWang', () => InitialRouter);

let MyComponent = require('./dragBtn');
AppRegistry.registerComponent('WeiLaiWang', () => MyComponent);

/**
 * 导航栏
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  Navigator,
  Text,
  Image,
  View
} from 'react-native';

import Storage from './storage';
console.log(Storage);
//import InitialRouter from './initialRouter';
import DragBtn1 from './dragBtn.expert';
//import DragBtn3 from './dragBtn.expert.animate';

//let MyComponent = require('./dragBtn');


// 动画效果
//let {Animate, Animate1, FadeInExample} = require('./AnimatedExample');
//

// aimate (scale)
//Animate1,    三个动态效果(transition, rorate)
// FadeInExample
//         <AnExApp /> 恩, 无数个圆球,没反应, 貌似是app
//         <AnExBobble />  恩,点击有四个圆球冒出来那货..
//         <AnExChained />  两个跟随图标移动的动画啊~~~
//         <AnExSet /> 这货随机换颜色啊..

//import AnExApp from './AnimatedGratuitousApp/AnExApp';
//import AnExBobble from './AnimatedGratuitousApp/AnExBobble';
//import AnExChained from './AnimatedGratuitousApp/AnExChained';
//import AnExSet from './AnimatedGratuitousApp/AnExSet';

class TestMore extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
        <DragBtn1 />
    )
  }

}


AppRegistry.registerComponent('WeiLaiWang', () => TestMore);

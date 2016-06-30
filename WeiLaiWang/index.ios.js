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

//import InitialRouter from './initialRouter';
//import DragBtn from './dragBtn';
import DragBtn1 from './dragBtn.expert';
import DragBtn3 from './dragBtn.expert.animate';
//import DragBtn2 from './dragBtn.margin';
//import DragReg from './dragReg';

let MyComponent = require('./dragBtn');


// 动画效果
let {Animate, Animate1, FadeInExample} = require('./AnimatedExample');

import AnExApp from './AnimatedGratuitousApp/AnExApp';
import AnExBobble from './AnimatedGratuitousApp/AnExBobble';
import AnExChained from './AnimatedGratuitousApp/AnExChained';
import AnExSet from './AnimatedGratuitousApp/AnExSet';


var Order = require('react-native-order-children');
console.log(Order);
var dragDate = {
  ele: {
    url: require( './img/elema490.png' ),
    href: 'https://m.ele.me/home'
  },
  meituan: {
    url: require( './img/meituan490.png' ),
    href: 'http://i.meituan.com/'
  },
  nuomi: {
    url: require( './img/baidunuomi490.png' ),
    href: 'http://m.nuomi.com/'
  },
  dameile: {
    url: require( './img/dameile490.png' ),
    href: 'http://www.dominos.com.cn/'
  },
  kfc: {
    url: require( './img/kendeji490.png' ),
    href: 'http://m.kfc.com.cn/'
  },
  mcdonalds: {
    url: require( './img/maidanglao490.png' ),
    href: 'http://www.mcdonalds.com.cn/'
  },
  jiyejia: {
    url: require( './img/jiyejia490.png' ),
    href: 'http://ne.4008-197-197.com/mobile/theme/dbjyj/home/index.html?sysSelect=1'
  },
  bishengke: {
    url: require( './img/bishengke490.png' ),
    href: 'http://m.4008123123.com/PHHSMWOS/index.htm?utm_source=orderingsite'
  }

  ,ele1: {
    url: require( './img/elema490.png' ),
    href: 'https://m.ele.me/home'
  },
  meituan1: {
    url: require( './img/meituan490.png' ),
    href: 'http://i.meituan.com/'
  },
  nuomi1: {
    url: require( './img/baidunuomi490.png' ),
    href: 'http://m.nuomi.com/'
  },
  dameile1: {
    url: require( './img/dameile490.png' ),
    href: 'http://www.dominos.com.cn/'
  },
  kfc1: {
    url: require( './img/kendeji490.png' ),
    href: 'http://m.kfc.com.cn/'
  },
  mcdonalds1: {
    url: require( './img/maidanglao490.png' ),
    href: 'http://www.mcdonalds.com.cn/'
  },
  jiyejia1: {
    url: require( './img/jiyejia490.png' ),
    href: 'http://ne.4008-197-197.com/mobile/theme/dbjyj/home/index.html?sysSelect=1'
  },
  bishengke1: {
    url: require( './img/bishengke490.png' ),
    href: 'http://m.4008123123.com/PHHSMWOS/index.htm?utm_source=orderingsite'
  }
}; // 全部数据
var order = Object.keys(dragDate); //Array of keys


class TestMore extends Component {

  constructor(props) {
    super(props);

    this.state = {
      order: -1
    };

  }

  render() {

    if(0){
      return (
        <View>
          <MyComponent />

        </View>
      )
    }
    if(1){
      return (
        <View style={{flex:1}}>
          <DragBtn1 />
        </View>
      )
    }
    if(1){
      return (
        <View style={{flex:1}}>
          <DragBtn3 />
        </View>
      )
    }
    if(1) {
      return (
        <View style={{flex:1}}>
          <Animate />
          <AnExChained />
          <DragBtn3 />
        </View>
      )
    }
    return (
      <View style={{flex:1}}>
        <DragBtn1 />
        <MyComponent />
        <Animate />
        <AnExChained />

      </View>
    )
  }

}
//         <AnExApp /> 恩, 无数个圆球,没反应, 貌似是app
//<AnExBobble />  恩,点击有四个圆球冒出来那货..
//        <AnExChained />

//<AnExSet /> 这货随机换颜色啊..



AppRegistry.registerComponent('WeiLaiWang', () => TestMore);

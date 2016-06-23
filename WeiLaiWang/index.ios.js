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

import Main from './main';
import DragBtn from './dragBtn';

export default class RouteComponent extends React.Component {
  render() {
    let ROUTE_STACK = [
      //{name: 'main', component: Main, index: 0},
      {name: 'DragBtn', component: DragBtn, index: 1}
    ];
    let INIT_ROUTE_INDEX = 1;
    return (
      <Navigator
        style={{
          paddingTop: 20
          }}
        initialRouteStack={
          // initialRouteStack:
          // 提供一个路由集合用来初始化。如果没有设置初始路由的话则必须设置该属性。
          // 如果没有提供该属性，它将被默认设置成一个只含有initialRoute的数组。
          ROUTE_STACK
        }
        initialRoute={ROUTE_STACK[INIT_ROUTE_INDEX]}
        configureScene={(route) => {
                return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
              }}
        renderScene={(route, navigator) => {
                let Component = route.component;

                return (
                  <Component
                    {...route.params}
                    name={route.name}
                    navigator={navigator}
                    />)
              }} />
    );
  }
}

AppRegistry.registerComponent('WeiLaiWang', () => RouteComponent);

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
export default class RouteComponent extends React.Component {
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Main', component: Main}}
        //configureScene={(route) => {
        //        return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
        //      }}
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

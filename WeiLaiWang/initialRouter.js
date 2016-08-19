/**
 * 导航栏
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  BackAndroid,
  Text,
  View
} from 'react-native';

import Main from './main';
import MapViewExample from './mapView';

export default class RouteComponent extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'MapViewExample', component: MapViewExample}}
        //configureScene={(route) => {
        //        return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
        //      }}
        renderScene={(route, navigator) => {
          let Components = route.component;
          if ( Component ) {
            return (
            <Components
              {...route.params}
              handleBack={route.handleBack}
              name={route.name}
              navigator={navigator}
              />)
          }
        }} />
    );
  }
}


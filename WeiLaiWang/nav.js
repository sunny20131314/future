/**
 * Created by sunzhimin on 16/6/16.
 *  -- 待删,目前无用
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }


  render() {
    return (
      <View style={[styles.navBarRow]}>
        <TouchableOpacity
          onPress={this.goBack.bind(this)}
          style={styles.navButton}>
          <Text style={styles.text}>
            {'<'}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.title]} numberOfLines={1}>{this.props.title}</Text>
        <TouchableOpacity
          onPress={this.returnMain.bind(this)}
        >
          <Image
            source={require('../img/logo.jpg')}
            style={styles.returnImg}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navBarRow: {
    height: 45,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff5248',
  },
  text: {
    color: 'white',
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  title: {
    color: 'white',
    fontSize: 13,
  },
  returnImg: {
    width: 40,
    height: 20,
  },
});

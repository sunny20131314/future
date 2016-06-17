/**
 * Created by sunzhimin on 16/6/16.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Navigator,
  Image,
  Text,
  View
} from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }


  render() {
    return (
      <View style={styles.header}>
        <TouchableHighlight
          activeOpacity={.8}
          onPress={() => console.log('press')}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <Image
            source={require('./img/icon_user.png')}
            style={styles.user}
          />
        </TouchableHighlight>
        <Image
          source={require('./img/logo.jpg')}
          style={styles.logo}
        >
        </Image>
        <Image
          source={require('./img/icon_info.png')}
          style={styles.info}
        >
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    //flex: 1,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff5248'
  },
  user: {
    width: 24,
    height: 24,
    marginLeft: 10
  },
  logo: {
    width: 75,
    height: 34
  },
  info: {
    width: 24,
    height: 24,
    marginRight: 10
  }
});

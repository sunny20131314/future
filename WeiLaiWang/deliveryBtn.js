/**
 * Created by sunzhimin on 16/6/20.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  TouchableHighlight,
  TextInput,
  Text,
  Image,
  View
} from 'react-native';

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBtn: this.props.activeBtn
    }
  }

  render() {
    return (
      <View style={styles.btnItem}>
        <TouchableHighlight
          activeOpacity={.8}
          onPress={this._onClick.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.6)"
          style={styles.btn}
        >
          <Text style={this.props.activeBtn=== this.props.id
                    ? [styles.inactiveBtn, styles.activeBtn]
                    : styles.inactiveBtn }
          >
            {this.props.val}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onClick() {
    let id = this.props.id;
    if ( id === this.props.activeBtn ){
      return false;
    }
    console.log(id);
    this.props.setType( id );
  }
}


const styles = StyleSheet.create({
  btnItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  activeBtn: {
    backgroundColor: '#ff5248',
    color: '#fff',
  },
  inactiveBtn: {
    width: 80,
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 2,
    textAlign: 'center',
  },
});


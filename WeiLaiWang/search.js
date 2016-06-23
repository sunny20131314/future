/**
 * Created by sunzhimin on 16/6/17.
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
      text: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={this.props.placeholder}
            value={this.state.text}
            keyboardType={this.props.keyboardType}
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={this._submit.bind(this)}
          />
        </View>
        <TouchableHighlight
          activeOpacity={.8}
          onPress={this._submit.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.6)"
          style={styles.searchBtn}
        >
          <Image
            source={require('./img/search.gif')}
            style={styles.searchPic}
            resizeMode='contain'
          />
        </TouchableHighlight>
      </View>
    );
  }

  _submit() {
    console.log(this.state.text);
    this.state.text
      ? this.props.onSearch( this.state.text)
      : Alert.alert(
          '提示: ',
          '请输入相关内容!'
        );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#afafaf',
    borderRadius: 6,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    borderWidth: 0,
  },
  searchBtn: {
    width: 65,
    height: 36,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5248',
    borderRadius: 6,
  },
  searchPic: {
    height: 36,
  },
});


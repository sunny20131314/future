/**
 * Created by sunzhimin on 16/6/17.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TextInput,
  Text,
  Image,
  View
} from 'react-native';

export default class searchBaiDu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isRefreshing: false
    }
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired
  };

  render() {
    var _scrollView = ScrollView;
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={this.props.placeholder}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          onSubmitEditing={this.submit.bind(this)}
        />
        <TouchableHighlight
          activeOpacity={.8}
          onPress={() => console.log('press')}
          underlayColor="rgba(255, 255, 255, 0.6)"
          style={styles.hdBottomItem}
        >
          <Text>
            星座
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  submit() {
    console.log(this.state.text, 'http://www.baidu.com/s?wd=' + this.state.text);
  }
}


const styles = StyleSheet.create({
  container: {
    margin: 0,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  scrollView: {
    flex:1,
    backgroundColor: '#fff',
  },
  goTop: {
    position: 'absolute',
    top: 10,
    right: 60,
  },
  goTopImg: {
    width: 24,
    height: 24,
  },
});


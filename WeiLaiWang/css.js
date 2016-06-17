/**
 * Created by sunzhimin on 16/6/16.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Image,
  Text,
  View,
  ScrollView,
} from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    }
  }

  render() {
    return (
      <View>
        <Text style={[styles.text, styles.header]}>
          嵌套的网格
        </Text>
        <View style={{flexDirection: 'row', height: 200, backgroundColor:"#fefefe", padding: 20}}>
          <View style={{flex: 1, flexDirection:'column', padding: 15, backgroundColor:"#eeeeee"}}>
            <View style={{flex: 1, backgroundColor:"#bbaaaa"}}>
            </View>
            <View style={{flex: 1, backgroundColor:"#aabbaa"}}>
            </View>
          </View>
          <View style={{flex: 1, padding: 15, flexDirection:'row', backgroundColor:"#eeeeee"}}>
            <View style={{flex: 1, backgroundColor:"#aaaabb"}}>
              <View style={{flex: 1, flexDirection:'row', backgroundColor:"#eeaaaa"}}>
                <View style={{flex: 1, backgroundColor:"red"}}>
                </View>
                <View style={{flex: 1, backgroundColor:"orange"}}>
                </View>
              </View>
              <View style={{flex: 1, backgroundColor:"yellow"}}>
              </View>
            </View>
            <View style={{flex: 1, backgroundColor:"#aaccaa"}}>
              <ScrollView style={{flex: 1, backgroundColor:"#bbccdd", padding: 5}}>
                <View style={{flexDirection: 'row', height: 50, backgroundColor:"#fefefe"}}>
                  <View style={{flex: 1, flexDirection:'column', backgroundColor:"#eeeeee"}}>
                    <View style={{flex: 1, backgroundColor:"red"}}>
                    </View>
                    <View style={{flex: 1, backgroundColor:"orange"}}>
                    </View>
                  </View>
                  <View style={{flex: 1, flexDirection:'row', backgroundColor:"#eeeeee"}}>
                    <View style={{flex: 1, backgroundColor:"#aaaabb"}}>
                      <View style={{flex: 1, flexDirection:'row', backgroundColor:"#eeaaaa"}}>
                        <View style={{flex: 1, backgroundColor:"#eebbaa"}}>
                        </View>
                        <View style={{flex: 1, backgroundColor:"#bbccee"}}>
                        </View>
                      </View>
                      <View style={{flex: 1, backgroundColor:"#eebbdd"}}>
                      </View>
                    </View>
                    <View style={{flex: 1, backgroundColor:"red"}}>
                    </View>
                  </View>
                </View>
                <Text style={[styles.text, styles.header, {color: '#ffffff', fontSize: 12}]}>
                  {(function(){
                    var str = '';
                    var n = 100;
                    while(n--) {
                      str += '嵌套的网格' + '\n';
                    }
                    return str;
                  })()}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={styles.flexContainer}>
          <View style={styles.cellfixed}>
            <Text style={styles.welcome}>

            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.welcome}>
              flex
            </Text>
          </View>
          <View style={styles.cellfixed}>
            <Text style={styles.welcome}>

            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.welcome}>
            fixed
          </Text>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  flexContainer: {
    // 容器需要添加direction才能变成让子元素flex
    flexDirection: 'row'
  },
  cell: {
    flex: 1,
    height: 50,
    backgroundColor: '#aaaaaa'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 2
  },
  cellfixed: {
    height: 50,
    width: 80,
    backgroundColor: '#fefefe'
  }
});

/**
 * Created by sunzhimin on 16/6/17.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Picker,
  Image,
  Text,
  View
} from 'react-native';

const Item = Picker.Item;
class Pick extends Component {
  render() {
    return (
      <Picker
        selectedValue={this.state.location}
        style={styles.picker}
        enabled={true}
        prompt="请选择城市:"
        onValueChange={(location) => this.setState({language: location})}
      >
        <Item label="北京" value="北京" />
        <Item label="JavaScript" value="js" />
        <Item label="php" value="php" />
        <Item label="asp" value="asp" />
        <Item label="c" value="c" />
        <Item label="c++" value="c++" />
        <Item label="Object-c" value="Object-c" />
      </Picker>
    )
  }
}

class Ball extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redBall: '',
      blueBall: ''
    };

    // 获得六合彩信息 如何知道有了新的数据!!! 总不能一直获取吧... 何时再获取数据,而不是用缓存???
    global.storage.load({
      key: 'lottery',
      autoSync: true,
      syncInBackground: true
    }).then(ret => {
      console.log(ret, 'lottery');
      let str = ret.opencode;
      let arr = str.split('+');
      let redBall = arr[0].split(',');
      let blueBall = arr[1];
      this.setState({
        redBall: redBall,
        blueBall: blueBall,
      })
    }).catch(err => {
      console.info(err, '错误');
    });
  }

  render() {
    let redBall = this.state.redBall;
    let blueBall = this.state.blueBall;
    console.log(redBall, blueBall, 'redBall, blueBall');
    return(
      <View style={styles.ball}>
        {
          redBall !== '' && redBall.map((number, i) => (
            <Image
              style={styles.ballImg}
              source={require('./img/redball.png')}
              key={'redBall' + i}
            >
              <Text style={styles.ballText} numberOfLines={1}> {number}</Text>
            </Image>
          ))
        }
        {
          blueBall !== '' && <Image
            style={styles.ballImg}
            source={require('./img/blueball.png')}
            key={'blueBall'}
          >
            <Text style={[styles.ballText, styles.ballText]} numberOfLines={1}> {blueBall}</Text>
          </Image>
        }
      </View>
    );
  }
}

export default class Mess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '北京'
    }
  }

  render() {
    return (
      <View style={styles.hd}>
        <View style={styles.hdLeft}>
          <TouchableHighlight
            activeOpacity={.8}
            onPress={() => console.log('press')}
            underlayColor="rgba(255, 255, 255, 0.6)"
          >
            <View style={styles.hdTop}>
              <Image
                source={require('./img/tq_11.png')}
                style={styles.weatherPic}
              />
              <Text style={styles.textLarge}>
                30° ~ 15°
              </Text>
            </View>
          </TouchableHighlight>
          <View style={styles.hdMedium}>
            <Text style={styles.textMedium}>
              今日限行: 3和8
            </Text>
          </View>
          <View style={styles.hdBottom}>
            <Text style={styles.hdBottomItem}>
              北京
            </Text>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => this.props.onJump('http://3g.d1xz.net/astro/')}
              underlayColor="rgba(255, 255, 255, 0.6)"
              style={styles.hdBottomItem}
            >
              <Text>
                星座
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.hdCenter}>
          <TouchableHighlight
            activeOpacity={.8}
            onPress={() => console.log('press')}
            underlayColor="rgba(255, 255, 255, 0.6)"
          >
            <View style={styles.flexColumn}>
              <View style={styles.hdTop}>
                <Text style={styles.textLarge}>
                  07月07日
                </Text>
              </View>
              <View style={styles.hdMedium}>
                <Text style={styles.textMedium}>
                  星期四
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.hdBottom}>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => this.props.onJump('http://m.edu.k618.cn/camp/')}
              underlayColor="rgba(255, 255, 255, 0.6)"
              style={styles.hdBottomItem}
            >
              <Text>
                图片
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => this.props.onJump('http://m.ziroom.com/')}
              underlayColor="rgba(255, 255, 255, 0.6)"
              style={styles.hdBottomItem}
            >
              <Text>
                租房
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.hdRight}>
          <TouchableHighlight
            activeOpacity={.8}
            style={styles.date}

            onPress={() => console.log('press')}
            underlayColor="rgba(255, 255, 255, 0.6)"
          >
            <View style={styles.flexColumn}>
              <View style={styles.hdTop}>
                <Text style={styles.textLarge}>
                  PM 2.5
                </Text>
              </View>
              <View style={styles.hdMedium}>
                <Text style={styles.textMedium}>
                  145
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.hdBottom}>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => this.props.onJump('http://m.zhcw.com/')}
              underlayColor="rgba(255, 255, 255, 0.6)"
            >
              <View>
                <Ball />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hd: {
    flex: 1,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textLarge: {
    fontSize: 16,
  },
  textMedium: {
    fontSize: 14,
  },
  flexColumn: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
  },
  hdLeft: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  hdTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  hdMedium: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  hdBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderTopColor: '#ededed',
    borderTopWidth: 1,
    //borderStyle: 'dotted',
  },
  hdBottomItem: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  weatherPic: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  hdCenter: {
    flex: 1,
    flexDirection: 'column',
    borderLeftColor: '#ededed',
    borderLeftWidth: 1,
    borderRightColor: '#ededed',
    borderRightWidth: 1,
    //borderStyle: 'dotted',
  },
  ball: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 6,
    paddingRight: 6,
  },
  ballText: {
    color: '#fff',
    fontSize: 8,
    lineHeight: 12,
    textAlign: 'center'
  },
  ballImg: {
    width: 14,
    height: 14,
  }
});

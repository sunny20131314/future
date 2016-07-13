/**
 * Created by sunzhimin on 16/6/20.
 * 在合适返回主页???
 */

'use strict';

import React, {Component} from 'react';
import ReactNative, {
  AppRegistry,
  BackAndroid,
  Dimensions,
  View,
  WebView,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
let WIDTH = Dimensions.get('window').width;

//  嵌套网站, 有返回前进, 搜索!
export default class WebViewCom extends Component {
  constructor(props) {
    super(props);

    this.navigator = this.props.navigator;

    this.state = {
      url: this.props.url,
      title: 'No Page Loaded',
      backButtonEnabled: false,
      loading: true,
      titleNow: '',
    }
  }


  static propTypes = {
    navigator: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <View style={[styles.container]}>
        {!this.props.noTitle && (
          <View style={[styles.navBarRow]}>
            <TouchableOpacity
              onPress={this.goBack.bind(this)}
              style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
              <Text style={styles.text}>
                {'<'}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.title]} numberOfLines={1}>{this.state.title}</Text>
            <TouchableOpacity
              onPress={this.returnMain.bind(this)}
            >
              <Image
                source={require('./img/logo.jpg')}
                style={styles.returnImg}
              />
            </TouchableOpacity>
          </View>
        )}
        <WebView
          ref={'webview'}
          automaticallyAdjustContentInsets={true}
          style={styles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
          startInLoadingState={true}
          scalesPageToFit={true}
          onError={this.onError.bind(this)}
        />
      </View>
    );
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', function() {
      return this.goBack();
    });
  }

  onError() {
    Alert.alert(
      '提示: ',
      '请检查你输入的内容是否正确!'
    );
  }

  returnMain() {
    let WebViewNews = this.props.WebViewNews;
    WebViewNews && WebViewNews.goBack();    // 回到初始页面
    this.navigator.popToTop();  // 回到最顶层的路由
  }

  goBack() {
    let len = this.navigator.getCurrentRoutes().length;
    console.log(len, 'length');
    this.refs['webview'].goBack();
    //if ( len > 1 ) {
    //  let WebViewNews = this.props.WebViewNews;
    //  WebViewNews && WebViewNews.goBack();    // 回到初始页面
    //  this.navigator.pop();
    //}
  }

  onShouldStartLoadWithRequest(event) {
    this.setState({
      titleOri: event.title
    });
    return true;
  }

  onNavigationStateChange(navState) {
    console.log(navState,this.state.url);

    // TODO 为了解决 webview 中地址搜索的两个链接的不停跳转(重定向)
    // 每次跳转页面的时候,会触发两次: 第一次: navigationType: click, other(push);
    // 第二次: 拿到页面的相关数据  米有 navigationType
    !navState.navigationType && this.setState({
      loading: navState.loading,
      title: navState.title,
      backButtonEnabled: navState.canGoBack,
      url: navState.url,
    });
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ff5248',
  },
  navBarRow: {
    height: 45,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 350,
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  title: {
    color: 'white',
    fontSize: 13,
    width: WIDTH - 80,
    textAlign: 'center'
  },
  returnImg: {
    width: 40,
    height: 20,
  }
});

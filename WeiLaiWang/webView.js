/**
 * Created by sunzhimin on 16/6/20.
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
            <Text style={[styles.title, {width: WIDTH - 80, textAlign: 'center'}]} numberOfLines={1}>{this.state.title}</Text>
            <TouchableOpacity
              onPress={this.pressReturn.bind(this)}
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
  pressReturn() {
    this.returnMain();
  }

  goBack() {
    let len = this.navigator.getCurrentRoutes().length;
    console.log(len, 'length');
    // HACK 新闻那块 webview, push了两次, 会一直都是3??? why?
    //len = this.props.WebViewNews ? len - 1 : len;
    if ( len > 2 ){
      this.refs['webview'].goBack();
      return true;
    }
    if (len === 2){
      this.returnMain();
    }
    return false;
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
    if( this.state.url !== this.props.url ) {
      this.setState({
        title: navState.title
      });
      console.info('~~~~', this.state.AllUrl);
      return false;
    }
    this.setState({
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
  },
  returnImg: {
    width: 40,
    height: 20,
  }
});

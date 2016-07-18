/**
 * Created by sunzhimin on 16/6/16.
 * tab页全部数据: tab页数据(地址,链接), tab页数据的相关顺序(展示)
 * 关闭退出程序(系统会弹出 停止运行!!!)
 */
import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  RefreshControl,
  AsyncStorage,
  BackAndroid,
  ToastAndroid,
  TouchableOpacity,
  TouchableHighlight,
  WebView,
  Text,
  Image,
  View,
  Animated,
} from 'react-native';

import WebViewCom from './webView';
import BdHd from './bd-hd';
import Calendar from './calendar/calendar';
import WeatherPage from './weatherPage';
import Ad from './ad';
import SearchComponent from './search';
//import Tab from './tab';
import DeliveryBtnCon from './deliveryBtn';
import BdBtm from './bd-btm';
let appData = require('./appData');

import ViewPager from './viewpager';

// 计算每个image的大小,高宽和图等比例!
let WIDTH = Dimensions.get('window').width;
let HEIGHT = Dimensions.get('window').height;
let isIos = Platform.OS === 'ios';
var baseHeight = isIos ?  0 : 24;  // 手机自带导航栏的高度, ios为0, 安卓暂时不确定
let scrollHeight = HEIGHT - 45 - baseHeight;   // scrollView 的高度(-顶部导航)

global.isIos = isIos;
let webViewH = WIDTH / 980 * 290;
let tabWidth ;
function imgLayout(num =2, margin = 4) { // margin 为元素之间的边距
  tabWidth = (WIDTH-margin * (num - 1))/num;
}
imgLayout();
let tabHeight = tabWidth / 490 * 245;
let tabHeights = ( tabHeight + 4 ) * 4 + 48;  // 48 是 indicator的高度

let keyboardDismissMode = isIos ? 'interactive' : 'on-drag';
export default class Main extends Component {
  constructor(props) {
    super(props);

    let dates = new Date();
    let year = dates.getFullYear();
    let month = dates.getMonth();
    let date = dates.getDate();
    this.state = {
      date: {  // bdhd,  calendar
        year: year,
        month: month,
        date: date,
        day: dates.getDay()
      },
      fadeAnim: new Animated.Value(0),
      isToTop: false,
      isRefreshing: true,
      appDataOrders: '',      //所有tab页数据
    };

    this.deviceLayout={
      imgLayout: {
        width: tabWidth,
        height: tabHeight,
        marginBottom: 4,
      },
      baseHeight: baseHeight,
      WIDTH: WIDTH,
      HEIGHT: HEIGHT,
    };

    this.navigator = this.props.navigator;
    console.log( this.navigator );

  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired
  };

  url = 'http://m.k618.cn/dhy_news/';  //新闻页面的地址

  async _loadInitialState() {
    try {
      var value = await AsyncStorage.getItem('appDataOrders');
      value = JSON.parse(value);
      console.log(value, 'value');
      if (value !== null){
        this.setState({appDataOrders: value});
      } else {
        // tab页数据的排列顺序
        let appDataOrders = [];
        for(let m = 0, len = appData.length; m !== len; m++ ){
          let tab = appData[m].data;   // 每个tab页的数据
          let tabIndex = appDataOrders[m] = []; // 传递每一个tab的数据
          console.log(tab, 'tab');
          let indexLen = tab.length;
          for(let n = 0; n !== indexLen; n++){ //每个tab的每页: 生成相关数据!
            tabIndex[n] = Object.keys(tab[n]);   // 保存全部数据的顺序
          }
        }
        this.setState({appDataOrders: appDataOrders});
        await AsyncStorage.setItem('appData', JSON.stringify(appDataOrders));
      }
    } catch (error) {
      console.warn(error);
    }
  }


// 获得tab页的数据
  componentWillMount() {
    this._loadInitialState();
    this.listenBack = BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
  }

  onBackAndroid() {
    // 天气, 日历 —— 返回上一页面,即默认! done
    // 编辑 —— replace    done
    // webview —— goBack!!!
    let nav = this.navigator;
    let routers = nav.getCurrentRoutes();
    let len = routers.length;

    const top = routers[routers.length - 1];
    console.log(nav, routers, len, top, 'nav, routers, len, top');

    if (top.ignoreBack || top.component.ignoreBack){
      // 路由或组件上决定这个界面忽略back键
      return true;
    }

    const handleBack = top.handleBack || top.component.handleBack;
    if ( handleBack ) {
      console.log(top.handleBack, top.component.handleBack, 'top.component.handleBack');
      //路由或组件上决定这个界面自行处理back键
      return handleBack();
    }

    //return true;

    //// 如果没有handleBack事件, pop or exit

    // 多于两个navigator,则pop,
    if (len > 1) {
      this.navigator.pop();
      return true;
    }

    console.log(this.lastBackPressed, 'lastBackPressed');
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      console.warn(this.lastBackPressed, 'exit~~~');
      //最近2秒内按过back键，可以退出应用。
      BackAndroid.exitApp();
      return false;  // 测试无反应!!!
    }

    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用',  ToastAndroid.SHORT);
    return true;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 800);
  }

  componentWillUnmount() {
    if ( !isIos ) {

      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
      //BackAndroid.removeEventListener('hardwareBackPress', this.listenBack);
    }
  }

  componentDidUpdate() {
    this.state.isToTop && Animated.timing(       // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: 1,        // Target
        duration: 400,    // Configuration
      }
    ).start();
  }

  _setType(id) {
    this.setState({
      activeBtn: id
    });
  }

  _onScroll(e) {
    let offsetY = Math.abs(e.nativeEvent.contentOffset.y);
    this.setState({
      isToTop: offsetY > 200,
    });

  }

  _renderError() {
    // -- 当前webview, 和组件添加加载出错提示语.
    return(
      <Text>加载出错,请稍后再试!</Text>
    )

  }

  _onJumpCalendar() {
    console.log('calendar');
    let navigator = this.navigator;
    if(navigator) {
      navigator.push({
        name: 'Calendar',
        component: Calendar,
        params: {
          date: this.state.date,
        }
      })
    }
  }

  _onJumpWeatherPage(data) {
    console.log('calendar');
    let navigator = this.navigator;
    if(navigator) {
      navigator.push({
        name: 'WeatherPage',
        component: WeatherPage,
        params: {
          data,
          scrollHeight,
        }
      })
    }
  }

  _onJump(url) {// 跳转到url
    // 新开一个 webview...
    let navigator = this.navigator;
    if(navigator) {
      navigator.push({
        name: 'webView',
        component: WebViewCom,
        params: {
          url,
        },
        handleBack: function() {
          console.log('handleBack');
        }
      })
    }
  }

  _onSearchBaiDu(val) {
    this._onJump( 'http://www.baidu.com/s?wd=' + val );
  }

  _onRefresh() {
    this.setState({isRefreshing: true});
    // 加载数据-刷新 -- 双色球, 天气, pm, 重新获取!(or 页面重新渲染)

    // 加载相关数据 : 天气,广告, 新闻!
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 800);
  }

  _onNavigationStateChange(nav) {
    let url = nav.url;
    //console.info(nav, 'nav');

    // ios: nav.navigationType = other/ click
    // android: nav.loading = true (2) false
    let len = this.navigator.getCurrentRoutes().length;
    if( url === this.url || !this.navigator || len > 1) {
      return false;
    }

    if ( isIos && nav.navigationType || !isIos && !nav.canGoBack && nav.loading ) {
      this.refs.webview.setNativeProps({style: {opacity: 0}});
      console.info('jump');
      this._onJump( url );
      this.WebViewNews.goBack();

      // 解决webview跳转过程中的页面显示
      setTimeout( () => {
        console.log(111);
        this.refs.webview.setNativeProps({style: {opacity: 1}});
      }, 1000)
    }
  }

  render() {
    let appDataOrders = this.state.appDataOrders;
    console.log(appDataOrders);
    return (
      <View style={styles.container}>
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
        <ScrollView
          ref={(scrollView) => { this._scrollView = scrollView; }}
          style={[styles.scrollView, { height: scrollHeight}]}
          alwaysBounceHorizontal={false}
          keyboardShouldPersistTaps={false}
          keyboardDismissMode={keyboardDismissMode}
          scrollEventThrottle={200}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#f00"
              title="Loading..."
              titleColor="#8f8f8f"
            />
          }
          onMomentumScrollEnd={this._onScroll.bind(this)}
        >
          <BdHd onJump={this._onJump.bind(this)}
                date={this.state.date}
                onJumpCalendar={this._onJumpCalendar.bind(this)}
                onJumpWeatherPage={this._onJumpWeatherPage.bind(this)}
                //onAlreadyGetData={this._onAlreadyGetData.bind(this)}
                height={HEIGHT}
                width={WIDTH}
          />
          <Ad style={{marginTop: 12,marginBottom: 12,}}/>
          <View style={styles.searchBaiDu}>
            <SearchComponent placeholder="输入关键词..." onSearch={this._onSearchBaiDu.bind(this)}/>
          </View>
          <View style={styles.tabCon}>
            { // 第一个轮播图,解决拿数据的过程中,后面的先渲染出来,然后页面闪动渲染数据
              // 保存在state, 加载好了之后, state数据 渲染

              appDataOrders !== '' && <ViewPager
                style={styles.viewpager}
                navigator={this.navigator}
                data={appData[0]}
                onJump={this._onJump.bind(this)}
                appDataOrders={appDataOrders}
                index={0}
                isLoop={true}
                key={'tab' + 0}
                deviceLayout={this.deviceLayout}
              />
            }
          </View>

          {  // 轮播图
            appDataOrders !== '' && appDataOrders.map((dataTab, i) => {
              if( !i ) {
                return <View
                  style={{flex:1, width: WIDTH, height: webViewH, backgroundColor: '#fff',}}
                  key={'webViewNews'}
                  ref="webview"
                >
                  {
                      <WebView
                        ref={(webView) => this.WebViewNews = webView}
                        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                        bounces={false}
                        //renderLoading={}
                        renderError={this._renderError.bind(this)}
                        scrollEnabled={false}
                        source={{uri: this.url}}
                        scalesPageToFit={true}
                      />
                  }

                </View>
              }
              return (
                <ViewPager
                  style={styles.viewpager}
                  navigator={this.navigator}
                  onJump={this._onJump.bind(this)}
                  data={appData[i]}
                  appDataOrders={appDataOrders}
                  index={i}
                  isLoop={true}
                  key={'tab' + i}
                  deviceLayout={this.deviceLayout}
                />
              )})
          }
          {
            // 快递页面
          }
          <View style={styles.indicator}>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => console.log('press')}
              underlayColor="rgba(255, 255, 255, 0.6)"
              style={{
                width: 60,
                marginLeft: 16,
                paddingTop: 6,
                paddingBottom: 6,
                borderWidth: 1,
                borderColor: '#ededed',
                borderRadius: 4,
             }}
            >
              <Text style={{fontSize: 18, color: '#ff5248', textAlign: 'center'}}>
                快递
              </Text>
            </TouchableHighlight>
          </View>
          <DeliveryBtnCon
            onSearch={this._onJump.bind(this)}
            //scrollView={this._scrollView}
            //scrollLayout={this.scrollLayout}
          />
          <Ad />
          <BdBtm />
        </ScrollView>
        {
          // 向上滚动~~~
          this.state.isToTop && <TouchableOpacity
            style={[styles.goTop, {opacity: this.state.fadeAnim,}]}
            onPress={() => {

              setTimeout( () => {
                console.log('top~~~');
                this._scrollView.scrollTo({x: 0,y: 0, animated: true});
              }, 1);
              this.setState({
                isToTop: false
              });
            }}
          >
            <Image
              source={require('./img/icon_top.png')}
              style={styles.goTopImg}
            >
            </Image>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
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
  },
  scrollView: {
    flex:1,
    backgroundColor: '#fff',
  },
  searchBaiDu: {
    borderTopColor: '#d8d8d8',
    borderTopWidth: 1,
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1,
  },
  tabCon: {
    height: tabHeights,
  },
  indicator: {
    //height: 48,
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 15,
    marginBottom: 15,
  },
  goTop: {
    position: 'absolute',
    bottom: 40,
    right: 40,
  },
  goTopImg: {
    width: 48,
    height: 48,
  },
});
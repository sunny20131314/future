/**
 * Created by sunzhimin on 16/6/16.
 * tab页全部数据: tab页数据(地址,链接), tab页数据的相关顺序(展示)
 */
import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  WebView,
  Text,
  Image,
  View,
  Animated,
} from 'react-native';

import storage from './storage';
//import nav from './header';
import WebViewCom from './webView';
import BdHd from './bd-hd';
import Ad from './ad';
import SearchComponent from './search';
import Tab from './tab';
import Calendar from './calendar/calendar';
import DeliveryBtnCon from './deliveryBtn';
import BdBtm from './bd-btm';

global.storage = storage;

// 计算每个image的大小,高宽和图等比例!
let WIDTH = Dimensions.get('window').width;
let HEIGHT = Dimensions.get('window').height;
var baseHeight = Platform.OS === 'ios' ?  0 : 10;  // 手机自带导航栏的高度, ios为0, 安卓暂时不确定
let scrollHeight = HEIGHT - 45 - baseHeight;   // scrollView 的高度(-顶部导航)

let webViewH = WIDTH / 980 * 290;
let tabWidth ;
function imgLayout(num =2, margin = 4) { // margin 为元素之间的边距
  tabWidth = (WIDTH-margin * (num - 1))/num;
}
imgLayout();
let tabHeight = tabWidth / 490 * 245;
let tabHeights = ( tabHeight + 4 ) * 4 +48;

export default class Main extends Component {
  constructor(props) {
    super(props);

    let dates = new Date();
    let weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let year = dates.getFullYear();
    let month = dates.getMonth();
    let date = dates.getDate();
    this.state = {
      date: {
        year: year,
        month: month,
        date: date,
        weekday: weekday[dates.getDay()]
      },
      fadeAnim: new Animated.Value(0),
      isToTop: false,
    isRefreshing: true,
      dataTabs: '',      //所有tab页数据
      dataTabOrders: '', //所有tab页数据的相关顺序
      lottery: '',
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

    // 获得tab页的数据
    storage.load({
      key: 'dataTabs',
      autoSync: true,
      syncInBackground: true
    }).then(ret => {
      this.setState({
        dataTabs: ret
      });
    }).catch(err => {
      console.info(err, '拿不到相关数据');
    });

    // 获得tab页的相关顺序
    storage.load({
      key: 'dataTabOrders',
      //autoSync: true,
      //syncInBackground: true
    }).then(ret => {
      //console.log(ret,'dataTabOrders');
      this.setState({
        dataTabOrders: ret
      });
    }).catch(err => {
      console.info(err, '错误');
    });

    this.navigator = this.props.navigator;
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired
  };

  url = 'http://m.k618.cn/dhy_news/';  //新闻页面的地址

  render() {
    //console.log('render');
    let dataTabs = this.state.dataTabs;
    let dataTabOrders = this.state.dataTabOrders;
    let isGetData = dataTabs !== '' && dataTabOrders !== '';
    //console.log(dataTabs, dataTabOrders, 'dataTabs, dataTabOrders')
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
          keyboardDismissMode='on-drag'
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
          onScroll={this._onScroll.bind(this)}
        >
          <BdHd onJump={this._onJump.bind(this)}
                date={this.state.date}
                onJumpCalendar={this.onJumpCalendar.bind(this)}
          />
          <Ad style={{marginTop: 12,marginBottom: 12,}}/>
          <View style={styles.searchBaiDu}>
            <SearchComponent placeholder="输入关键词..." onSearch={this._onSearchBaiDu.bind(this)}/>
          </View>
          <View style={styles.tabCon}>
            { // 第一个轮播图,解决拿数据的过程中,后面的先渲染出来,然后页面闪动渲染数据
              // 保存在state, 加载好了之后, state数据 -- 渲染
              isGetData && <Tab
                  style={styles.viewpager}
                  navigator={this.navigator}
                  onJump={this._onJump.bind(this)}
                  data={dataTabs[0]}
                  order={dataTabOrders[0]}
                  index={0}
                  key={'tab' + 0}
                  deviceLayout={this.deviceLayout}
                />
            }
          </View>

          {  // 轮播图
            isGetData && dataTabs.map((dataTab, i) => {
              if( !i ) {
                return <WebView
                  key={'webView' + i}
                  ref={(webView) => this.WebViewNews = webView}
                  style={{flex:1, height: webViewH,}}
                  onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                  bounces={false}
                  scrollEnabled={false}
                  source={{uri: this.url}}
                  scalesPageToFit={true}
                />
              }
              return (
                <Tab
                  style={styles.viewpager}
                  navigator={this.navigator}
                  onJump={this._onJump.bind(this)}
                  data={dataTab}
                  order={dataTabOrders[i]}
                  index={i}
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
          <DeliveryBtnCon onSearch={this._onJump.bind(this)} />
          <Ad />
          <BdBtm />
        </ScrollView>
        {
          // 向上滚动~~~
          this.state.isToTop && <TouchableOpacity
            style={[styles.goTop, {opacity: this.state.fadeAnim,}]}
            onPress={() => {
              this._scrollView.scrollTo({x: 0,y: 0, animated: true});
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

  componentDidMount() {
    // 加载数据-刷新 -- 双色球, 天气, pm, 重新获取!(or 页面重新渲染)
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 1800);

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
    // 页面偏卡,
    clearTimeout(this.scrollId);
    let offsetY = Math.abs(e.nativeEvent.contentOffset.y);
    this.scrollId = setTimeout( () => {
      this.setState({
        isToTop: offsetY > 300,
      });
    }, 300);

  }

  onJumpCalendar() {
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
  _onJump(url) {// 跳转到url
    // 新开一个 webview...
    let navigator = this.navigator;
    if(navigator) {
      navigator.push({
        name: 'webView',
        component: WebViewCom,
        params: {
          url: url,
        }
      })
    }
  }

  _onSearchBaiDu(val) {
    this._onJump( 'http://www.baidu.com/s?wd=' + val );
  }

  _onSearchDelivery(val) {
    // 检测数据类型为 number --
    this._onJump( 'http://m.kuaidi100.com/index_all.html?type=' + this.state.activeBtn + '&postid='+ val );
  }

  _onRefresh() {
    this.setState({isRefreshing: true});

    // 加载相关数据 : 天气,广告, 新闻!
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 2000);
  }

  _onNavigationStateChange(nav) {
    let url = nav.url;
    if(nav.navigationType && url !== this.url && this.navigator) {
      this.navigator.push({
        name: 'webView',
        component: WebViewCom,
        params: {
          url: url,
          WebViewNews: this.WebViewNews
        }
      })
    }
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
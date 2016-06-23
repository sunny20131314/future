/**
 * Created by sunzhimin on 16/6/16.
 */

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Image,
  View
} from 'react-native';

import Header from './header';
import WebViewCom from './webView';
import BdHd from './bd-hd';
import Ad from './ad';
import SearchComponent from './search';
import DragBtnContainer from './dragBtn';
import DeliveryBtn from './deliveryBtn';
import BdBtm from './bd-btm';

var DeliveryArr = [
  {id: 'yuantong', val: '圆通'},
  {id: 'yunda', val: '韵达'},
  {id: 'shentong', val: '申通'},
  {id: 'zhongtong', val: '中通'},
  {id: 'shunfeng', val: '顺丰'},
  {id: 'ems', val: 'EMS'},
  {id: 'zhaijisong', val: '宅急送'},
  {id: 'quanfengkuaidi', val: '全峰'},
  {id: 'tiantian', val: '天天'},
  {id: 'youshuwuliu', val: '优速'},
  {id: 'rufengda', val: '如风达'},
  {id: 'youzhengguonei', val: '包裹'}
];

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: true,
      activeBtn: 'yuantong'
    }
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired
  };

  render() {
    // 45 是头部导航栏的高度
    let {height} = Dimensions.get('window');
    // ios, android 的头部宽度(即)
    var _scrollView = ScrollView;
    return (
      <View style={styles.container}>
        <Header/>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          style={[styles.scrollView, {height: height-72 }]}
          alwaysBounceHorizontal={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#f00"
              title="Loading..."
              titleColor="#8f8f8f"
            />
          }
        >
          <BdHd/>
          <Ad />
          <View style={styles.searchBaiDu}>
            <SearchComponent placeholder="输入关键词..." onSearch={this._onSearchBaiDu.bind(this)}/>
          </View>


          {
            // 跳转搜索
          }
          <TouchableHighlight
            activeOpacity={.8}
            onPress={this._onJumpDrag.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.6)"
            style={{
               width: 86,
               marginLeft: 16,
               paddingLeft: 24,
               paddingRight: 24,
               paddingTop: 6,
               paddingBottom: 6,
               borderWidth: 1,
               borderColor: '#ededed',
               borderRadius: 4,
              }}
          >
            <Text style={{fontSize: 18, color: '#ff5248',}}>
              点击跳转拖动页面
            </Text>
          </TouchableHighlight>

          {
            // 快递页面
          }
          <View>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => console.log('press')}
              underlayColor="rgba(255, 255, 255, 0.6)"
              style={{
               width: 86,
               marginLeft: 16,
               paddingLeft: 24,
               paddingRight: 24,
               paddingTop: 6,
               paddingBottom: 6,
               borderWidth: 1,
               borderColor: '#ededed',
               borderRadius: 4,
              }}
            >
              <Text style={{fontSize: 18, color: '#ff5248',}}>
                快递
              </Text>
            </TouchableHighlight>
            <SearchComponent placeholder="请输入快递单号..." keyboardType='numeric' onSearch={this._onSearchDelivery.bind(this)}/>
            <View style={styles.deliveryBtns}>
              {
                DeliveryArr.map((arr) => <DeliveryBtn
                  id={arr.id}
                  val={arr.val}
                  key={arr.id}
                  activeBtn={this.state.activeBtn}
                  setType={this._setType.bind(this)}
                />)
              }
            </View>
          </View>
          <Ad />
          <BdBtm />
        </ScrollView>
        <TouchableOpacity
          style={styles.goTop}
          onPress={() => { _scrollView.scrollTo({x: 0,y: 0, animated: true}); }}
        >
          <Image
            source={require('./img/icon_top.png')}
            style={styles.goTopImg}
          >
          </Image>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    // 加载数据-刷新
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 2000);
  }

  _onJumpDrag() {
    const { navigator } = this.props;
    navigator.replace({
      name: 'drag',
      component: DragBtnContainer,
      params: {
        url: ''
      }
    })
  }

  _setType(id) {
    this.setState({
      activeBtn: id
    });
  }

  _onSearch(url) {
    const { navigator } = this.props;

    // 新开一个 webview...
    if(navigator) {
      navigator.push({
        name: 'webView',
        component: WebViewCom,
        params: {
          url: url
        }
      })
    }
  }

  _onSearchBaiDu(val) {
    this._onSearch( 'http://www.baidu.com/s?wd=' + val );
  }

  _onSearchDelivery(val) {
    // 检测数据类型为 number --
    this._onSearch( 'http://m.kuaidi100.com/index_all.html?type=' + this.state.activeBtn + '&postid='+ val );
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
  searchBaiDu: {
    borderTopColor: '#d8d8d8',
    borderTopWidth: 1,
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1,
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
    top: 10,
    right: 60,
  },
  goTopImg: {
    width: 24,
    height: 24,
  },
});

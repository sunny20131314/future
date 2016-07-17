/**
 * Created by sunzhimin on 12/07/16.
 * 实验性的使用 每一页面的数据改动,测试结果,页面闪(数据转换的时候)
 *
 * 做不可循环,但可以往左往右滑!
 *
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions,
  Platform,
  Picker,
  ScrollView,
  StatusBar,
  StatusBarIOS,
  TouchableOpacity,
  PixelRatio,
  DatePickerIOS,
  TouchableHighlight,
  Image,
} from 'react-native';

import Indicator from './ViewPageIndicator';
import dragBtn from './dragBtn';

let {height, width} = Dimensions.get('window');

export default class ViewPager extends Component {
  constructor(props) {
    super(props);

    let index = this.index = this.props.index; // number: 记录是第几个tab
    let appDataOrders = this.appDataOrders = this.props.appDataOrders;

    let {data, title} = this.props.data;
    this.data = data;  // arr: 当前tab页的所有数据 []
    this.title = title; // 类目
    this.order = appDataOrders[index];  // arr: 记录显示顺序

    let len = this.len = title.length;
    this.WIDTH = this.props.deviceLayout.WIDTH;
    this.imgLayout = this.props.deviceLayout.imgLayout;
    this.scrollLeft = 0;  //记录滚动的距离

    this.isLoop = this.props.isLoop;

    let pager = [];          // 页面的全部数据 (包括新加的)
    for (let i = 0; i !== len; i++ ){
      pager[i] = i;
    }
    if ( this.isLoop ) {
      pager.push(len);
      pager.unshift(-1);
      this.scrollLeft = this.WIDTH;  //记录滚动的距离
    }

    this.pager = pager;

    this.state = {
      activePage: 0,   // 这个需要传递给编辑, 当前tab页的第几个
    };
  }

  next() {
    //console.log( this.scrollLeft, 'before this.scrollLeft, next');
    this.scrollLeft += this.WIDTH;
    //console.log( this.scrollLeft, 'now this.scrollLeft, next');
    this.setState({
      activePage: ++ this.state.activePage
    });

    //let currentPage = this.state.currentPage;
    //currentPage = currentPage + 1 === this.len ? 0 : currentPage + 1;
    //this.setState({
    //  currentPage: currentPage
    //});
    //console.log( 'next');
    //this.refs.trueScroll.scrollTo({x: width, y: 0, animated: false});
  }

  prev() {
    //console.log( this.scrollLeft, 'before this.scrollLeft, prev');
    this.scrollLeft -= this.WIDTH;
    //console.log( this.scrollLeft, 'now this.scrollLeft, prev');
    this.setState({
      activePage: -- this.state.activePage
    });
  }

  myScrollIos(event) {
    let len = this.len;
    let scrollX = event.nativeEvent.contentOffset.x;
    //console.log(scrollX, 'scrollX');

    // isLoop = true;
    let endX = width * (len + 1);
    if ( this.isLoop ) {
      if( scrollX === 0 ) { // 滚动到最左
        console.log( 'scroll to start');
        this.refs.trueScroll.scrollTo({x: width * len, y: 0, animated: false});
        this.scrollLeft = width * len;
        this.setState({
          activePage: len - 1
        });
        return false;
      }
      else if ( scrollX === endX ) { // 滚动到最右
        console.log( 'scroll to end');
        this.refs.trueScroll.scrollTo({x: width, y: 0, animated: false});
        this.scrollLeft = width;
        this.setState({
          activePage: 0
        });
        return false;
      }
    }

    // 当前滚动到的位置(相对于真正的view(不包括前后添加))
    // 这逻辑得改啊... scrollLeft
    if (scrollX > this.scrollLeft) {
      this.next();
    } else if (scrollX < this.scrollLeft) {
      this.prev();
    }
  }

  _goToPage(i) {

    console.log(i, '_goToPage');

    let scrollLeft = this.isLoop ? ( i + 1 ) * width : i * width;
    console.log(i, scrollLeft, '_goToPage, scrollLeft');
    this.refs.trueScroll.scrollTo({x: scrollLeft, y: 0, animated: false});
    this.scrollLeft = scrollLeft;
    this.setState({
      activePage: i
    });
  }

  _onJumpEdit() {
    const { navigator } = this.props;
    let activePage = this.state.activePage;
    navigator.replace({
      name: 'edit',
      component: dragBtn,
      params: {
        url: '',
        deviceLayout: this.props.deviceLayout,
        index: this.index,       //第几个tab
        activePage: activePage,   //page页
        appDataOrders: this.appDataOrders,    //显示的全部数据顺序
        data: this.data[activePage],    //该页面的全部数据
      }
    });
  }

  render() {
    //console.log(this.state.activePage, 'this.state.activePage');
    let addStartEl, addEndEl;
    let isLoop = this.props.isLoop;
    if ( isLoop && this.order ) {
      let end = this.len -1;
      let dataEnd = this.data[end];
      addStartEl = <View
        style={[styles.page, {width: this.WIDTH, height: 400}]}
        key={'pageStart'}
      >
        {
          this.order[end].map( (d, i) => {
          return (
          <TouchableHighlight
            key={'-1img' + i}
            onPress={() => {
              console.log('press');
            }}
            underlayColor="transparent"
          >
            <Image
              source={dataEnd[d].url}
              style={this.imgLayout}
              resizeMode='contain'
            />
          </TouchableHighlight>
          )
        })
        }
      </View>;
      let dataStart = this.data[0];
      addEndEl = <View
        style={[styles.page, {width: this.WIDTH, height: 400}]}
        key={'pageEnd'}
      >
        {
          this.order[0].map( (d, i) => {
            return (
              <TouchableHighlight
                key={'-1img' + i}
                onPress={() => {
              console.log('press');
            }}
                underlayColor="transparent"
              >
                <Image
                  source={dataStart[d].url}
                  style={this.imgLayout}
                  resizeMode='contain'
                />
              </TouchableHighlight>
            )
          })
        }
      </View>;
    }

    return (
      <View>
        <Indicator
          title={this.title}
          activePage={this.state.activePage}
          len={this.len}
          goToPage={this._goToPage.bind(this)}
          onJumpEdit={this._onJumpEdit.bind(this)}
        />
        <ScrollView
          style={{height: 400}}
          horizontal={true}
          contentOffset={{x: isLoop ? this.WIDTH : 0, y: 0}}
          alwaysBounceHorizontal={true}
          onMomentumScrollEnd={event=>this.myScrollIos(event)}
          ref="trueScroll"
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        >
          {
            isLoop && this.order && addStartEl
          }
          {
            this.order && this.order.map( (data, index) => {
              let data1 = '';
              let dataS = this.data[index];
              // page
              return (
                <View
                  style={[styles.page, {width: this.WIDTH}]}
                  key={'page' + index}
                >
                  {
                    data.slice(0, 8).map( (d, i) => {
                      return (
                        <TouchableHighlight
                          key={index + 'img' + i}
                          onPress={() => {
                          console.log('press');
                        }}
                          underlayColor="transparent"
                        >
                          <Image
                            source={dataS[d].url}
                            style={this.imgLayout}
                            resizeMode='contain'
                          />
                        </TouchableHighlight>
                      )
                    })
                  }
                </View>
              )
            })
          }
          {
            isLoop && this.order && addEndEl
          }
        </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    //height: 400,
    //backgroundColor: '#F5FCFF',
  },
});
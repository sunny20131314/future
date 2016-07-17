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
let {height, width} = Dimensions.get('window');
export default class ViewPager extends Component {
  constructor(props) {
    super(props);

    let index = this.index = this.props.index; // number: 记录是第几个tab
    let appDataOrders = this.appDataOrders = this.props.appDataOrders;
    this.imgLayout = this.props.deviceLayout.imgLayout;
    let {data, title} = this.props.data;
    this.data = data;  // arr: 当前tab页的所有数据 []
    this.title = title; // 类目
    this.len = title.length;    // 当前tab页有几个page
    this.order = appDataOrders[index];  // arr: 记录显示顺序

    this.WIDTH = this.props.deviceLayout.WIDTH;

    this.scrollLeft = this.WIDTH;  //记录滚动的距离
    this.currentPage = 0;     // 当前页
    this.pager = [];          // 页面的全部数据 (包括新加的)
    //this.isLoop =
    //let len = this.len;
    //for (let i = 0; i !== len; i++ ){
    //  this.pager[i] = i - 1;
    //}
    //this.pager[len] = len -1;
    //this.pager[len + 1] = len;

    this.state = {
      // -- 这两个...只用一个就可以了吧
      currentPage: 0,
      activePage: 0,   // 这个需要传递给编辑, 当前tab页的第几个
    };
  }

  next() {
    //let currentPage = this.state.currentPage;
    //currentPage = currentPage + 1 === this.len ? 0 : currentPage + 1;
    //this.setState({
    //  currentPage: currentPage
    //});
    console.log( 'next');
    //this.refs.trueScroll.scrollTo({x: width, y: 0, animated: false});
  }

  prev() {
    //let currentPage = this.state.currentPage;
    //currentPage = currentPage - 1 < 0 ? this.len -1 : currentPage - 1;
    //this.setState({
    //  currentPage: currentPage
    //});
    console.log( 'prev');
    // 滚动的距离是
    //(this.currentPage + 1) * width
    //this.refs.trueScroll.scrollTo({x: width, y: 0, animated: false});
  }

  myScrollIos(event) {
    let scrollX = event.nativeEvent.contentOffset.x;
    console.log(scrollX, 'scrollX');
    let endX = width * (this.len - 1);
    if( scrollX === 0 ) {
      console.log( 'scroll to end');
      this.refs.trueScroll.scrollTo({x: endX, y: 0, animated: false});
    }
    else if ( scrollX === endX ) {
      this.refs.trueScroll.scrollTo({x: 0, y: 0, animated: false});
    }
    // 这逻辑得改啊... scrollLeft
    //scrollX > this.scrollLeft ? this.next() : this.prev();
    if (scrollX > width) {
      this.next()
    } else if (scrollX < width) {
      this.prev()
    }
  }

  scrollRender() {

    return (
''
    )
  }

  render() {
    console.log('render');
    return (
      <ScrollView
        style={{height: 400}}
        horizontal={true}
        contentOffset={{x: 0, y: 0}}
        alwaysBounceHorizontal={true}
        onMomentumScrollEnd={event=>this.myScrollIos(event)}
        ref="trueScroll"
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      >
        {
          this.order && this.order.map( (data, index) => {
            let data1 = '';
            let dataS = this.data[index];
            // page
            return (
              <View
                style={[styles.page, {width: this.WIDTH, height: 400}]}
                key={'page' + index}
              >
                {
                  data.map( (d, i) => {
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
      </ScrollView>
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
    height: 400,
    //backgroundColor: '#F5FCFF',
  },
});
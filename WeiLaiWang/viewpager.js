/**
 * Created by sunzhimin on 12/07/16.
 * 实验性的使用 每一页面的数据改动,测试结果,页面闪(数据转换的时候)
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
    this.index = this.props.index; // number: 记录是第几个tab
    this.imgLayout = this.props.deviceLayout.imgLayout;
    this.data = [];
    this.title = [];
    this.order = [];
    this.show = [];
    this.alter = [];
    let order = this.props.order;  // arr: 记录显示顺序及tab [ order: Array[], show :Array[8], alter: Array[]], [show :Array[8]]
    let datas = this.props.data;  // arr: 所有数据 []
    this.len = order.length;
    this.scrollLeft = width;  //记录滚动的距离
    this.currentPage = 0;     // 当前页
    this.pager = [];          // 页面的全部数据
    let len = this.len;
    for (let i = 0; i !== len; i++ ){
      this.pager[i] = i - 1;
      this.data[i] = datas[i].data;
      this.title[i] = datas[i].name;
      this.order[i] = order[i].order;
      //this.show[i] = order[i].order.slice(0, 8);
      //this.alter[i] = order[i].alter;
    }
    this.pager[len] = len -1;
    this.pager[len + 1] = len;

    this.state = {
      currentPage: 0
    }
  }

  nextMonth() {
    //let currentPage = this.state.currentPage;
    //currentPage = currentPage + 1 === this.len ? 0 : currentPage + 1;
    //this.setState({
    //  currentPage: currentPage
    //});
    console.log( 'next');
    this.refs.trueScroll.scrollTo({x: width, y: 0, animated: false});
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
    this.refs.trueScroll.scrollTo({x: width, y: 0, animated: false});
  }

  myScrollIos(event) {
    let scrollX = event.nativeEvent.contentOffset.x;
    // 这逻辑得改啊... scrollLeft
    //scrollX > this.scrollLeft ? this.nextMonth() : this.prev();
    if (scrollX > width) {
      this.nextMonth()
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
        contentOffset={{x: width, y: 0}}
        bounces={false}
        onMomentumScrollEnd={event=>this.myScrollIos(event)}
        ref="trueScroll"
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      >
        <View style={{width: width}}>
          <View style={styles.page}>
            {this.order[prev] && this.order[prev].map((data, i) => {
              let prevData = this.data[prev];
              return (
              <TouchableHighlight
                key={'img' + i}
                onPress={() => {
                                       console.log('press');
                  }}
                underlayColor="transparent"
              >
                <Image
                  source={prevData[data].url}
                  style={this.imgLayout}
                  resizeMode='contain'
                />
              </TouchableHighlight>
            )})}
          </View>
        </View>
          <View style={styles.page}>
            {this.order[current] && this.order[current].map((data, i) => {
              let currentData = this.data[current];
              return (
                <TouchableHighlight
                  key={'img' + i}
                  onPress={() => {
                                       console.log('press');
                  }}
                  underlayColor="transparent"
                >
                  <Image
                    source={currentData[data].url}
                    style={this.imgLayout}
                    resizeMode='contain'
                  />
                </TouchableHighlight>
              )})}
          </View>
        <View style={{width: width}}>
          <View style={styles.page}>
            {this.order[prev] && this.order[next].map((data, i) => {
              let nextData = this.data[next];
              return (
                <TouchableHighlight
                  key={'img' + i}
                  onPress={() => {
                                       console.log('press');
                  }}
                  underlayColor="transparent"
                >
                  <Image
                    source={nextData[data].url}
                    style={this.imgLayout}
                    resizeMode='contain'
                  />
                </TouchableHighlight>
              )})}
          </View>
        </View>
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
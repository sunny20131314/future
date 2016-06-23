/**
 * Created by sunzhimin on 16/6/23.
 * 可以拖动排序的组件
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  PanResponder,
  Dimensions,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

// 计算每个image的大小,高宽和图等比例!
var {width} = Dimensions.get('window');
width = (width-4)/2;
var height = width/490*245;

var first = true;

var dragDate = [
  {
    url: require( './img/elema490.png' ),
    href: 'https://m.ele.me/home'
  },
  {
    url: require( './img/meituan490.png' ),
    href: 'http://i.meituan.com/'
  },
  {
    url: require( './img/baidunuomi490.png' ),
    href: 'http://m.nuomi.com/'
  },
  {
    url: require( './img/dameile490.png' ),
    href: 'http://www.dominos.com.cn/'
  },
  {
    url: require( './img/kendeji490.png' ),
    href: 'http://m.kfc.com.cn/'
  },
  {
    url: require( './img/maidanglao490.png' ),
    href: 'http://www.mcdonalds.com.cn/'
  },
  {
    url: require( './img/jiyejia490.png' ),
    href: 'http://ne.4008-197-197.com/mobile/theme/dbjyj/home/index.html?sysSelect=1'
  },
  {
    url: require( './img/bishengke490.png' ),
    href: 'http://m.4008123123.com/PHHSMWOS/index.htm?utm_source=orderingsite'
  }
]; // 全部数据
var dragingLeaveData; // 拖动后剩下的数据
var dragingData;      // 拖动中的数据
var dragingInstead = {url: ''};  //占位的数据

var baseHeight = 0;

// 相应的坐标值
var heightFst = baseHeight + height + 4;
var heightScd = baseHeight + (height+ 4) * 2 ;
var heightThird = baseHeight + (height+ 4) * 3;
//var heightForth = baseHeight + (height+ 4) * 4;
//var widthScd = width + 4;

var judgePosition = function(w, h) {

  // 判断当前位置,通过判断触摸点的位置!
  let index;

  //console.log(w, h);
  //console.log('judge', width, height);

  if( h < heightFst ) {
    index = w < width ? 0 : 1;
  }
  else if (h < heightScd ) {
    index = w < width ? 2 : 3;
  }
  else if (h < heightThird) {
    index = w < width ? 4 : 5;
  }
  else {
    index = w < width ? 6 : 7;
  }
  return index;
};

class DragBtn extends Component {
  constructor(props) {
    super(props);

    // top, left 改为当前所在的位置!
    this.state = {
      position: 'relative',
      top: 0,
      left: 0,
      index: '',
      oriIndex: '',
      first: true
    }
  }


  componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: ()=> true,
      onPanResponderGrant: ()=>{
        this._top = this.state.top;
        this._left = this.state.left;
      },
      onPanResponderMove: (evt,gs)=>{
        let nativeEvt = evt.nativeEvent;
        //console.log('location',nativeEvt.locationY, nativeEvt.locationX);
        //console.log(nativeEvt.pageX,nativeEvt.pageY );

        // 虚拟占位
        let index = judgePosition(nativeEvt.pageX,nativeEvt.pageY);

        if( first === true) {
          //第一次时, 记录数据
          dragingLeaveData = dragDate.slice(0);
          dragingData = dragingLeaveData.splice(index, 1);
          console.log(dragDate.length, dragDate);
          console.log(dragingLeaveData.length, dragingLeaveData);
          console.log(dragingData.length, dragingData);

          first = false;
          this.setState({
            oriIndex: index
          })
        }

        this.setState({
          position: 'absolute',
          top: this._top+gs.dy,
          left: this._left+gs.dx
        });

        // 设置当前index, 记录移动的位置!
        this.setState({index: index});

        if( this.state.index === index ){
          return false;
        }

        this.props.onDraging(index, dragingInstead);
      },
      onPanResponderRelease: (evt,gs)=>{
        this.props.onDragEnd(this.state.index, this.state.oriIndex);
      }
    })
  }

  render() {
    let borderWidth = this.props.url ? 0 : 1;
    return (
      <View
        {...this._panResponder.panHandlers}
        style={[styles.rect,{
            position: this.state.position,
            top: this.state.top,
            left: this.state.left,
          }]}>
        <Image
          source={this.props.url}
          style={{
            width: width,
            height: height,
            borderWidth: borderWidth,
            borderColor: '#e8e8e8',
          }}
          resizeMode='contain'
        />
      </View>
    );
  }
}

export default class DragBtnContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: dragDate
    }
  }


  _onDraging(index, data) {
    // 修改数据
    // 剩下的数据及加入空的数据!!! 注意: 不修改剩下的数据
    this.setState({
      data: index
    });

    // 能不能只改变数组中的某一个值? 如果数组重新赋值了,那么整个组件都会重新渲染的
    console.log( index, data );

  }

  _onDragEnd(index, data) {
    console.log( index, data );
  }

  render() {
    let dragDates = this.state.data;
    alert(dragDates);
    console.log(dragDates.length, dragDates);
    return (
      <View style={[styles.container]}>
        {
          dragDates.map( (data,i) => {
            return (
              <DragBtn
                url={data.url}
                key={'item' + i}
                data={this.state.date}
                onDraging={this._onDraging.bind(this)}
                onDragEnd={this._onDragEnd.bind(this)}/>
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rect: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
});

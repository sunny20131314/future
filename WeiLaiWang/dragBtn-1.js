/**
 * Created by sunzhimin on 16/6/23.
 * 可以拖动排序的组件
 * 可用,但是可以简化,比如位置啊, index
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
var dragDateLen = dragDate.length;
var dragingAllData; // 拖动后剩下的数据
var dragingInstead = {url: ''};  //占位的数据

var baseHeight = 0;  // 手机自带导航栏的高度

// 相应的坐标值
var siteArr = [];
var height1 = baseHeight + height + 4;
var height2 = baseHeight + (height+ 4) * 2 ;
var height3 = baseHeight + (height+ 4) * 3;
var height4 = baseHeight + (height+ 4) * 4;
var width2 = width + 4;

// 高度对应  --
for ( let i = 0; i !== dragDateLen; i++) {
  let res = i % 2;  // 0 or 1
  let multiple = Math.floor(i/2); //高度倍率
  //console.log( multiple, res );
  let h = baseHeight + (height + 4) * multiple ;
  let w = res ? width + 4 : 0 ;
  siteArr[i] = {
    width: w,
    height: h
  }
}
console.log( siteArr );


var judgePosition = function(w, h) {

  // 判断当前位置,通过判断触摸点的位置!
  let index;

  //console.log(w, h);
  //console.log('judge', width, height);

  if( h < height1 ) {
    index = w < width ? 0 : 1;
  }
  else if (h < height2 ) {
    index = w < width ? 2 : 3;
  }
  else if (h < height3) {
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
      top: 400,
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

        // 每一个拖动的数据!
        let index = this.props.index;
        console.warn(index);
        let top, left;
        switch (index) {
          case 0:
            top = baseHeight;
            left = 0;
            break;
          case 1:
            top = baseHeight;
            left = width2;
            break;
          case 2:
            top = height1;
            left = 0;
            break;
          case 3:
            top = height1;
            left = width2;
            break;
          case 4:
            top = height2;
            left = 0;
            break;
          case 5:
            top = height2;
            left = width2;
            break;
          case 6:
            top = height3;
            left = 0;
            break;
          case 7:
            top = height3;
            left = width2;
            break;
          default:
            alert('数据超过8啦,注意!!!')
        }


        this._top = this.state.top;
        this._left = this.state.left;
      },
      onPanResponderMove: (evt,gs)=>{
        let nativeEvt = evt.nativeEvent;
        //console.log('location',nativeEvt.locationY, nativeEvt.locationX);
        //console.log(nativeEvt.pageX,nativeEvt.pageY );

        // 虚拟占位
        let index = judgePosition(nativeEvt.pageX,nativeEvt.pageY);

        // 设置当前index, 记录移动的位置!
        this.setState({
          position: 'absolute',
          top: this._top+gs.dy,
          left: this._left+gs.dx,
          index: index
        });

        // 仅仅是第一次执行!  记录当前拖动中的数据
        if( this.state.first ) {
          console.log(this.state.first, 'true~~~~~~');

          this.setState({
            first: false,
            oriIndex: index
          })
        }

        console.log(this.state.first, 'false~~~~~~');

        if( this.state.index === index ){
          return false;
        }

        // 拖动过程中,总数据不变,当前拖动元素绝对定位,
        // 添加空数据,一个虚拟定位
        dragingAllData = dragDate.slice(0);
        dragingAllData.splice(index, 0, dragingInstead);
        //console.log(dragingAllData);
        this.props.onDraging(dragingAllData);
      },
      onPanResponderRelease: (evt,gs)=>{
        // 把拖动的数据,替换到当前位置
        let oriIndex = this.state.oriIndex;
        let dragingData = dragDate.splice(oriIndex, 1);  //得到数组!

        let index = this.state.index;
        dragDate.splice( index, 0, dragingData[0] );

        this.props.onDragEnd(dragDate);

        this.setState({
          position: 'relative'
        });

        // 储存 dragDate 数据 --
      }
    })
  }

  renderText(borderWidth) {
    console.log(this.props.url);

  }

  render() {
    let borderWidth = this.props.url ? 0 : 1;

    if( borderWidth ) {
      return (
        <View
          {...this._panResponder.panHandlers}
          style={[styles.rect, {alignItems: 'center', justifyContent: 'center'}]}>
          <Text
            style={{
            width: width,
            height: height,
            borderWidth: borderWidth,
            borderColor: '#e8e8e8'
          }}
          >
            试试松开手,可以切换位置哦~~
          </Text>
        </View>
      );
    }

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


  _onDrag(data) {
    this.setState({
      data: data
    });

    console.log( data );
  }


  render() {
    let dragDates = this.state.data;
    console.log('当前遍历的数据', dragDates);
    return (
      <View style={[styles.container]}>
        {
          dragDates.map( (data,i) => {
            return (
              <DragBtn
                url={data.url}
                key={'item' + i}
                index={i}
                onDraging={this._onDrag.bind(this)}
                onDragEnd={this._onDrag.bind(this)}/>
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

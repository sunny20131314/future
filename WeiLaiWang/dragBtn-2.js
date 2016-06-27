/**
 * Created by sunzhimin on 16/6/23.
 * 可以拖动排序的组件
 * 简化后,但是组件的相关还需修改
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
var dragingAllData; // 拖动后剩下的数据
var dragingInstead = {url: ''};  //占位的数据

var baseHeight = 0;  // 手机自带导航栏的高度

// 相应的坐标值
var siteArr = [];

// 高度对应
var dragDateLen = dragDate.length;
for ( let i = 0; i !== dragDateLen + 2; i++) {
  let res = i % 2;  // 0 or 1
  let multiple = Math.floor(i/2); //高度倍率
  //console.log( multiple, res );
  let h = baseHeight + (height + 4) * multiple ;
  let w = res ? width + 4 : 0 ;
  siteArr[i] = {
    left: w,
    top: h
  }
}
console.log( siteArr );

// 是判断触摸的范围
var judgeNum;    // -- 目前只能通过外部变量去保存当前触摸的位置,更好的方式~~~
function judgeIndex(w, h, i=0) {
  let numH = i+2;

  if(h < siteArr[numH].top){
    return judgeNum = w < siteArr[i+1].left ? i : i+1;
  }
  else if( h > siteArr[dragDateLen].top ){  // 当超出容器底部时
    return judgeNum = w < siteArr[dragDateLen+1].left ? dragDateLen-2 : dragDateLen-1;
  }
  judgeIndex( w, h, numH );
}

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

        this._top = siteArr[index].top;
        this._left = siteArr[index].left;
      },
      onPanResponderMove: (evt,gs)=>{
        let nativeEvt = evt.nativeEvent;

        // 虚拟占位
        judgeIndex(nativeEvt.pageX,nativeEvt.pageY);
        let index = judgeNum;
        console.log( index, '移动中的index' );

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

        if( this.state.index === index ){
          return false;
        }
        console.log( this.state.index, '移动到的位置');

        // 拖动过程中,总数据不变,当前拖动元素绝对定位,
        // 添加空数据,一个虚拟定位
        dragingAllData = dragDate.slice(0);
        dragingAllData.splice(index, 0, dragingInstead);
        this.props.onDraging(dragingAllData);
      },
      onPanResponderRelease: (evt,gs)=>{
        console.warn('松手啦~~~');
        // 把拖动的数据,替换到当前位置
        let oriIndex = this.state.oriIndex;
        let dragingData = dragDate.splice(oriIndex, 1);  //得到数组!

        let index = this.state.index;
        dragDate.splice( index, 0, dragingData[0] );

        this.props.onDragEnd(dragDate);

        this.setState({
          position: 'relative',
          top: 0,
          left: 0
        });

        // 储存 dragDate 数据 --
      }
    })
  }

  render() {
    let borderWidth = this.props.url ? 0 : 1;

    if( borderWidth ) {
      return (
        <View
          {...this._panResponder.panHandlers}
          style={[styles.textContainer, {borderWidth: borderWidth,}]}>
          <Text>
            试试放开手~~
          </Text>
        </View>
      );
    }

    return (
      <View
        {...this._panResponder.panHandlers}
        style={[styles.imgContainer,{
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

    console.log( '子组件传过来的数据', data );
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  imgContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  textContainer: {
    width: width,
    height: height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    borderColor: '#e8e8e8',
  }
});

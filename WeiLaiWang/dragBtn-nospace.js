/**
 * Created by sunzhimin on 16/6/23.
 * 可以拖动排序的组件
 * {...this._gestureHandlers} vs {...this._panResponder.panHandlers}
 * 当在当前的位置上时, 表现类似于 添加了一个空数据, 定位 relative
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
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

let data = {
  hello: {text: 'world'},
  how: {text: 'are you'},
  test: {text: 123},
  this: {text: 'is'},
  a: {text: 'a'},
  real: {text: 'real'},
  drag: {text: 'drag and drop'},
  bb: {text: 'bb'},
  cc: {text: 'cc'},
  dd: {text: 'dd'},
  ee: {text: 'ee'},
  ff: {text: 'ff'},
  gg: {text: 'gg'},
  hh: {text: 'hh'},
  ii: {text: 'ii'},
  jj: {text: 'jj'},
  kk: {text: 'kk'}
};

//let order = Object.keys(data); //Array of keys


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
    //href: 'http://ne.4008-197-197.com/mobile/theme/dbjyj/home/index.html?sysSelect=1'
    href: 'jiyejia'
  },
  {
    url: require( './img/bishengke490.png' ),
    //href: 'http://m.4008123123.com/PHHSMWOS/index.htm?utm_source=orderingsite'
    href: 'bishengke'
  }
]; // 全部数据
//dragDate.length = 4;
var dragDateLen = dragDate.length;

var dragingAllData; // 拖动后剩下的数据
var dragingInstead = {url: '', href: ''};  //占位的数据

//dragDate.push( dragingInstead );

var baseHeight = 0;  // 手机自带导航栏的高度

// 相应的坐标值
var siteArr = [];

// 高度对应
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

    this.state = {
      //position: 'relative',
      //top: 0,
      //left: 0,
      index: '',
      oriIndex: this.props.index,
      //first: true
    }
  }

  componentWillMount(){
    this._panResponder = PanResponder.create({
      //要求成为响应者：
      //类似 shouldComponentUpdate，监听手势开始按下的事件，返回一个boolean决定是否启用当前手势响应器
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),

      //监听手势移动的事件，返回一个boolean决定是否启用当前手势响应器
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),

      onResponderTerminationRequest: (evt) => false,

      onPanResponderMove: (evt,gs)=>{
        let nativeEvt = evt.nativeEvent;
        console.log(gs.dy, gs.x0,gs.y0, gs, 'gs');

        // 虚拟占位
        judgeIndex(nativeEvt.pageX,nativeEvt.pageY);
        let index = judgeNum;

        console.log(this.props.href, this.props.index, this.state.oriIndex);

        // 设置当前index, 记录移动的位置!
        this.setState({
          index: index
        });

        let oriIndex = this.state.oriIndex;
        let dragingData = dragDate.splice(oriIndex, 1)[0];  //得到数组!
        dragDate.splice( index, 0, dragingData );

        this.props.onDraging(dragDate, nativeEvt.pageY - height / 2, nativeEvt.pageX - width / 2, index);
      },
      onPanResponderRelease: (evt,gs)=>{
        console.info('松手啦~~~');
        //this._handlePanResponder();
      },
      //另一个组件成了手势响应器时（当前组件手势结束）的处理
      onPanResponderTerminate: (evt, gestureState) => {
        console.log( '另一个组件已经成为了新的响应者' );
        //this._handlePanResponder();
      }
    })
  }

  _handlePanResponder() {
    console.log('handle11111~~~~ end11111~~~');
    this.props.onDragEnd();
    // 储存 dragDate 数据 --

  }

  _handleStartShouldSetPanResponder(evt, gestureState) {
    //let nativeEvt = evt.nativeEvent;
    //console.log(nativeEvt, gestureState, 'Start');
    //返回一个boolean决定是否启用当前手势响应器
    return true;
  }
  _handleMoveShouldSetPanResponder(evt, gestureState) {
    //console.log(evt, gestureState, 'Move');
    return true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.top !== this.state.top
    || nextState.left !== this.state.left
    || nextState.position !== this.state.position
    || nextProps.url !== this.props.url;
  }


  render() {
    console.log( '子组件render~~~~' );

    return (
      <View
        {...this._panResponder.panHandlers}
        style={[styles.imgContainer]}>
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
      data: dragDate,
      expert: '',
      position: 'relative',
      top: 0,
      left: 0
    }
  }

  _updateData(data, top, left, expert){
    console.log( '子组件传过来的数据', data );

    this.setState({
      data: data
    });
    this._expert('absolute', top, left, expert);
  }

  _onDragEnd(data){
    this._expert();
  }

  _expert(position = 'relative', top = 0, left = 0, expert = '') {
    this.setState({
      expert: expert,
      position: position,
      top: top,
      left: left
    })
  }
  //shouldComponentUpdate(nextProps, nextState) {
  //  let data = this.state.data;
  //  let nextData = nextState.data;
  //  let isAlter = true;
  //  //for( var n = 0, len = data.length; n !== len; n++ ){
  //  //  console.log(1, data[n] !== nextData[n]);
  //  //  if( data[n] !== nextData[n] ){
  //  //    console.log(11);
  //  //    return isAlter = true;
  //  //  }
  //  //}
  //  return isAlter;
  //}

  render() {
    let dragDates = this.state.data;
    console.log('当前遍历的数据', dragDates);
    console.info( 'render' );


    let expert = this.state.expert;
    console.log(expert, expert !== '' ? 'view' : 'text');
    return (
      <View style={[styles.container]}>
        {
          dragDates.map( (data,i) => {
            return (
              <DragBtn
                url={data.url}
                href={data.href}
                key={'item' + i}
                ref={'btn'+i}
                index={i}
                onDraging={this._updateData.bind(this)}
                onDragEnd={this._onDragEnd.bind(this)}/>
            )
          })
        }
        {
          expert !== ''
            ? (
            <View
              style={[styles.imgContainer,{
                position: this.state.position,
                top: this.state.top,
                left: this.state.left
              }]}
              key={'expert'}
              ref={'expert'}
            >
              <Image
                source={dragDates[expert].url}
                style={{
                  width: width,
                  height: height,
                }}
                resizeMode='contain'
              />
            </View>
          )
            : <Text>nonono</Text>
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
  }
});

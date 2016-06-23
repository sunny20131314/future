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
];

var baseHeight = 0;

// 相应的坐标值
var heightFst = baseHeight + height + 4;
var heightScd = baseHeight + (height+ 4) * 2 ;
var heightThird = baseHeight + (height+ 4) * 3;
//var heightForth = baseHeight + (height+ 4) * 4;
var widthScd = width + 4;

var judgePosition = function(w, h) {
  // 判断当前位置,通过判断触摸点的位置!

  //console.log(w, h);
  //console.log('judge', width, height);
  if( h < heightFst ) {
    if( w < width ){
      console.log(0);
      return {
        index: 0,
        top: 0,
        left: 0
      };
    }
    return {
      index: 1,
      top: 0,
      left: widthScd
    };
  }
  else if (h < heightScd ) {
    if( w < width ){
      console.log(2);
      return {
        index: 2,
        top: heightFst,
        left: 0
      };
    }
    return {
      index: 3,
      top: heightFst,
      left: widthScd
    };
  }
  else if (h < heightThird) {
    if( w < width ){
      console.log(4);
      return {
        index: 4,
        top: heightScd,
        left: 0
      };
    }
    return {
      index: 5,
      top: heightScd,
      left: widthScd
    };
  }
  else {
    if( w < width ){
      console.log(6);
      return {
        index: 6,
        top: heightThird,
        left: 0
      };
    }
    return {
      index: 7,
      top: heightThird,
      left: widthScd
    };
  }
};

class DragBtn extends Component {
  constructor(props) {
    super(props);

    // top, left 改为当前所在的位置!
    this.state = {
      position: 'relative',
      top: 0,
      left: 0
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

        // 设置虚拟位置
        let { index, top, left } = judgePosition(nativeEvt.pageX,nativeEvt.pageY);

        //console.log(gs.dx,gs.dy);
        // 设置当前元素位置
        this.setState({
          position: 'absolute',
          top: this._top+gs.dy,
          left: this._left+gs.dx
        })
      },
      onPanResponderRelease: (evt,gs)=>{
        this.setState({
          top: this._top+gs.dy,
          left: this._left+gs.dx
        })}
    })
  }

  render() {
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
      bg: 'white',
      top: 0,
      left: 0
    }
  }


  render() {
    return (
      <View style={[styles.container]}>
        {
          dragDate.map( (data,i) => {
            return (
              <DragBtn url={data.url} key={'item' + i}/>
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

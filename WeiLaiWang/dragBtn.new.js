/**
 * Created by sunny on 16/6/28.
 * 逻辑:
 *      1, 添加一个额外的元素, 专门用来显示在hover/ touchmove 过程中的图标
 *      2, 在拖动过程中, 在一定时间内, 移动到某一元素下(设置一定时间, 做延迟处理)
 *      3, 拖动结束后, 额外元素恢复其位置.
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

// 用数组好,还是对象?
// 数组的话是整个数据的改变拖拽,而用对象的话,改变相应的 key 值,并保存,貌似占位少些, 处理的数据减少了~~~
var dragDate = {
  ele: {
    url: require( './img/elema490.png' ),
    href: 'https://m.ele.me/home'
  },
  meituan: {
    url: require( './img/meituan490.png' ),
    href: 'http://i.meituan.com/'
  },
  nuomi: {
    url: require( './img/baidunuomi490.png' ),
    href: 'http://m.nuomi.com/'
  },
  dameile: {
    url: require( './img/dameile490.png' ),
    href: 'http://www.dominos.com.cn/'
  },
  kfc: {
    url: require( './img/kendeji490.png' ),
    href: 'http://m.kfc.com.cn/'
  },
  mcdonalds: {
    url: require( './img/maidanglao490.png' ),
    href: 'http://www.mcdonalds.com.cn/'
  },
  jiyejia: {
    url: require( './img/jiyejia490.png' ),
    href: 'http://ne.4008-197-197.com/mobile/theme/dbjyj/home/index.html?sysSelect=1'
  },
  bishengke: {
    url: require( './img/bishengke490.png' ),
    href: 'http://m.4008123123.com/PHHSMWOS/index.htm?utm_source=orderingsite'
  }
}; // 全部数据
var order = Object.keys(dragDate); //Array of keys
console.log(order);

var dragDateLen = order.length;

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
      index: '',
      oriIndex: this.props.index,
    }
  }

  componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onResponderTerminationRequest: (evt) => false,
      onPanResponderMove: (evt,gs)=>{

      },
      onPanResponderRelease: (evt,gs)=>{
        console.info('松手啦~~~');
        //this._handlePanResponder();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log( '另一个组件已经成为了新的响应者' );
        //this._handlePanResponder();
      }
    })
  }

  //shouldComponentUpdate(nextProps, nextState) {
  //  return ;
  //}


  render() {
    console.log( '子组件在render~~~~' );
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
      order: order,
      expert: '',
      position: 'relative',
      top: 0,
      left: 0
    }
  }

  render() {
    let dragDates = this.state.data;
    console.log('当前遍历的数据', dragDates);
    console.info( 'render' );


    let expert = this.state.expert;
    console.log(expert, expert !== '' ? 'view' : 'text');

    let dataSource = this.state.ds.cloneWithRows(this.props.data, this.props.order);
    return (
      <View
        ref="wrapper"
        style={styles.container}
        onLayout={()=>{}}
      >
      <ListView
        enableEmptySections={true}
        ref="list"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
        dataSource={dataSource}
        onScroll={e => {
          console.log(e, 'e onscroll');
        }}
        onContentSizeChange={(width, height) => {
          console.log(width, height, 'width, height,')
        }}
        //onLayout={(e) => this.listLayout = e.nativeEvent.layout}
        //scrollEnabled={!this.state.active && this.props.scrollEnabled}
        renderRow={this.renderRow.bind(this)}
      />
    </View>
  );
  }
  renderRow(data, sectionID, rowID, highlightRow) {
    let expert = this.state.expert;
    if(expert !== ''){
      // 返回额外的元素!
      return (
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
            source={dragDate[expert].url}
            style={{
                width: width,
                height: height,
              }}
            resizeMode='contain'
          />
        </View>
      )
    }
    // 正常渲染
    return (
      <DragBtn
        url={dragDate[expert].url}
        href={dragDate[expert]}
        key={expert}
        index={rowID}
        onDraging={this._updateData.bind(this)}
        onDragEnd={this._onDragEnd.bind(this)}
      />
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





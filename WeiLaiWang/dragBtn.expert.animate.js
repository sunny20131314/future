/**
 * Created by sunny on 16/6/28.
 * 逻辑:
 *      1, 添加一个额外的元素, 专门用来显示在hover/ touchmove 过程中的图标
 *      2, 在拖动过程中, 在一定时间内, 移动到某一元素下(设置一定时间, 做延迟处理)
 *      3, 拖动结束后, 额外元素恢复其位置.
 *
 * 如果给每个元素上都绑定 一个 panReaponder 相应者, 那么我需要
 *   1, 判断其位置,
 *   2, 获取其位移,移动到的位置...
 *
 * 遇到的问题:
 *   1, 如何获取是在哪个位置移动...   --- 手动获取目前listView 的顶部位置, 再加上当前位置, 即为在listView中的全部位移
 *   2, 恩, 要判断是 listview 上的滑动 还是 单个元素的拖拽  --- onLongPress 触发其父元素上不可滑动...
 *   3, 可以获取到相关元素
 *
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  PanResponder,
  Dimensions,
  Animated,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';


// 计算每个image的大小,高宽和图等比例!
//var {width as WIDTH, height as HEIGHT} = Dimensions.get('window');
let WIDTH = Dimensions.get('window').width;
let HEIGHT = Dimensions.get('window').height;
console.log(WIDTH, HEIGHT);
let width = (WIDTH-4)/2;
var height = width/490*245;

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

  ,ele1: {
    url: require( './img/elema490.png' ),
    href: 'https://m.ele.me/home'
  },
  meituan1: {
    url: require( './img/meituan490.png' ),
    href: 'http://i.meituan.com/'
  },
  nuomi1: {
    url: require( './img/baidunuomi490.png' ),
    href: 'http://m.nuomi.com/'
  },
  dameile1: {
    url: require( './img/dameile490.png' ),
    href: 'http://www.dominos.com.cn/'
  },
  kfc1: {
    url: require( './img/kendeji490.png' ),
    href: 'http://m.kfc.com.cn/'
  },
  mcdonalds1: {
    url: require( './img/maidanglao490.png' ),
    href: 'http://www.mcdonalds.com.cn/'
  },
  jiyejia1: {
    url: require( './img/jiyejia490.png' ),
    href: 'http://ne.4008-197-197.com/mobile/theme/dbjyj/home/index.html?sysSelect=1'
  },
  bishengke1: {
    url: require( './img/bishengke490.png' ),
    href: 'http://m.4008123123.com/PHHSMWOS/index.htm?utm_source=orderingsite'
  }
}; // 全部数据
var order = Object.keys(dragDate); //Array of keys

var dragDateLen = order.length;

var listViewH = dragDateLen/2 * (height + 4) -2; // listView 高度
//console.log(listViewH, HEIGHT, 'listViewH H');

var scrollTop = 0; //listView 滚动的高度
var baseHeight = 0;  // 手机自带导航栏的高度   目前这个需要自己去发挥想象. layout只是针对渲染的样式
// 相应的坐标值

// 高度对应
var siteArr = [];
for ( let i = 0; i !== dragDateLen + 2; i++) {
  let res = i % 2;  // 0 or 1
  let multiple = Math.floor(i/2); //高度倍率
  //console.log( multiple, res );
  let h =  (height + 4) * multiple ;
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

function copyArrayStr(arr) {
  let len = arr.length;
  var newArr = [];
  for ( let i = 0; i !== len; i++) {
    newArr[i] = arr[i];
  }
  return newArr;
}
class DragBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: '', // 记录当前移动到的位置
      attr: this.props.attr,
      listen: false,
    };


  }
  //shouldComponentUpdate(nextProps, nextState) {
  //  return ;
  //}

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    //onStartShouldSetResponderCapture: (e, gs) => {
    //},
    onMoveShouldSetPanResponderCapture: (e, gs) => {
      let scroll = !this.state.listen;
      console.log(scroll, 'scroll , onMoveShouldSetPanResponderCapture');
      ////当在原处快速移动的时候,交给父元素处理 返回 true
      //let vy = Math.abs(gs.vy);
      //let vx = Math.abs(gs.vx);
      //return  vy >= 50 || vx >= 50 && !this.state.listen;

      scroll && this.id && clearTimeout(this.id);
      return scroll;
    },
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gs) => {
      let { pageX, pageY } = e.nativeEvent;
      console.log(pageX, pageY, 'onPanResponderGrant pageX, pageY');
      this.id = setTimeout( () => {
        this.props.onDragStart(false, this.props.attr, {top: pageY - height/2, left: pageX - width/2});
      }, 200);
    },
    onResponderTerminationRequest: (evt) => false,
    onPanResponderMove: (evt,gs)=>{
      // 当前额外元素的位置   相对于根目录,
      // 判断滚动到的位置呢   相对listView的总坐标和横坐标(的top, left)
      let { pageX, pageY } = evt.nativeEvent;
      let offsetY = pageY + scrollTop - baseHeight;

      // 虚拟占位
      judgeIndex(pageX, offsetY);
      let index = judgeNum;

      // 移动回原来的位置时 oriIndex, nowIndex
      let lastIndex = this.state.index;
      let oriIndex = this.props.index;
      if( index === lastIndex ){
        return false;
      }
      // 保存当前移动的元素
      this.setState({
        index: index
      });

      // 更新数组  做延迟处理, 快速移动到某位置时
      let {vx, vy, dy, dx} = gs;
      if( Math.abs(vx) <= 0.03 || Math.abs(vy) <= 0.03  ){
        return false;
      }

      console.log(dy,dx,'onDraging');
      this.props.onDraging({dy: dy, dx: dx});
    },
    onPanResponderRelease: (evt,gs)=>{
      console.info('松手啦~~~');
      this._onResponderend();
    },
    onPanResponderTerminate: (evt, gestureState) => {
      console.log( '另一个组件已经成为了新的响应者' );
      this._onResponderend();
    }
  });

  _onResponderend() {
    this.id && clearTimeout(this.id);
    this.setState({
      listen: false
    });

    let lastIndex = this.state.index;
    let oriIndex = this.props.index;

    this.props.onDragEnd();

    if(lastIndex === oriIndex){
      return false;
    }
    this.props.onUpdate( oriIndex, lastIndex);
  }

  render() {
    console.log( '子组件在render~~~~' );
    return (
      <View
        {...this._panResponder.panHandlers}
      >
        <TouchableHighlight
          onLongPress={() => {
            console.log('onLongPress');
            // 只有当长按后,才可以拖拽...
            this.setState({
              listen: true
            });
          }}
          onPress={() => console.log('press')}
          underlayColor="transparent"
        >
          <View
            style={styles.row}>
            <Image
              source={this.props.url}
              style={styles.thumb}
              resizeMode='contain'
            />
          </View>
        </TouchableHighlight>
      </View>

    );
  }
}


export default class DragBtnContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({
        //getSectionData: (dataBlob, sectionID) => {
        //  console.log(dataBlob);
        //  console.log(sectionID);
        //  return dataBlob[sectionID]
        //},
        //sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        rowHasChanged: (row1, row2) => {
          return row1 !== row2;
        }
      }),
      couldScroll: true,
      order: order,
      expert: '',
      top: 0,
      left: 0,
      stickers: new Animated.ValueXY(),                    // 可移动的图
    }
  }

  componentDidMount() {
    this.setState({
      ds: this.state.ds.cloneWithRows(this.state.order)
    });
  }


  _onResponderend() {
    console.info('expert       松手啦~~~~~~~ ');
  }

  render() {
    let dragDates = this.state.order;
    //console.log('当前遍历的数据', dragDates);
    console.info( 'listView render' );

    let expert = this.state.expert;
    let couldScroll = this.state.couldScroll;
    //console.log(dragDates, this.state.ds, 'before  && now');

    //this.anim = this.anim || new Animated.Value(0);

    return (
      <View
        ref="wrapper"
        style={styles.container}
        onLayout={()=>{}}
      >
        <ListView
          contentContainerStyle={styles.list}
          style={{height: HEIGHT}}
          enableEmptySections={true}
          ref="list"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          dataSource={this.state.ds}
          pageSize={2}
          onScroll={e => {
            // 偏移!!! 滚动过程中
            scrollTop = e.nativeEvent.contentOffset.y;
            //this.refs.list.scrollTo({x: 0,y: 100, animated: true});
          }}
          onContentSizeChange={(width, height) => {
            // 可视范围内 -- 横屏时...
            //console.log(width, height, 'width, height,')
          }}
          onLayout={(e,a) => {
            baseHeight = e.nativeEvent.layout.y;
            console.log( e.nativeEvent);
          }}
          scrollEnabled={ couldScroll && listViewH > HEIGHT}
          renderRow={this.renderRow.bind(this)}
        />
        <View
          style={[styles.row,{
            position: 'absolute',
            top: this.state.top,
            left: this.state.left
          }]}
          key={'expert'}
          ref={'expert'}
        >
          {      // 返回额外的元素!
            this.state.expert !== ''
              ? <Animated.Image
                  key={expert}
                  source={dragDate[expert].url}
                  style={[styles.thumb, styles.expert]}
                  resizeMode='contain'
                />
              : <Text />
          }

        </View>

    </View>
    );
  }

  _onDragStart(bool, attr, pos = {top: 0, left: 0}) {
    console.log('_onDragStart');
    let {top, left} = pos;
    console.log(top, left);
    this.setState({
      couldScroll: bool,
      expert: attr,
      top: top,
      left: left,
    });
    // 启动动画
    Animated.spring(this.state.stickers, {
      tension: 2,
      friction: 3,
      toValue: this.state.stickers             // Animated toValue's are tracked
  }).start();
  }

  _onDraging(pos = {dx: 0, dy: 0}) {
    let { dx, dy} = pos;
    console.log( dx, dy, ' dx, dy');

    // 相对位移
    Animated.event(
      [null, {dx: dx, dy: dy}] // map gesture to leader
    );
  }

  _onDragEnd() {
    this.setState({
      couldScroll: true,
      expert: '',
    });
  }
  _onUpdate(oriIndex, nowIndex) {
    let order = copyArrayStr(this.state.order);
    let oriData = order.splice( oriIndex, 1 )[0];
    order.splice( nowIndex, 0, oriData);

    console.log(order);

    this.setState({
      ds: this.state.ds.cloneWithRows(order),
      order: order,
    });
  }
  renderRow(data, sectionID, rowID, highlightRow) {
    return (
      <DragBtn
        onDragStart={this._onDragStart.bind(this)}
        onDraging={this._onDraging.bind(this)}
        onDragEnd={this._onDragEnd.bind(this)}
        onUpdate={this._onUpdate.bind(this)}
        url={dragDate[data].url}
        href={dragDate[data]}
        ref={'item' + rowID}
        attr={data}  // 对象的key,s
        key={data}
        index={rowID}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  list: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    marginBottom: 4,
    width: width,
    height: height,
    alignItems: 'center',
  },
  thumb: {
    width: width,
    height: height,
  },
  expert: {
    borderColor: '#e8e8e8',
    borderWidth: 2,
  }
});


class Expert extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gs) => {
      console.log('expert      onPanResponderGrant~~~~   expert');
    },
    onMoveShouldSetPanResponder: () => true,
    onResponderTerminationRequest: (evt) => false,
    onPanResponderMove: (evt,gs)=>{
      console.log('expert     onDraging~~~~~~~ expert');
    },
    onPanResponderRelease: (evt,gs)=>{
      this._onResponderend();
    },
    onPanResponderTerminate: (evt, gestureState) => {
      console.log( '另一个组件已经成为了新的响应者' );
      this._onResponderend();
    }
  });

  render() {
    return (
      <View
        style={[styles.row,{
                position: 'absolute',
                top: this.state.top,
                left: this.state.left
              }]}
        key={'expert'}
        ref={'expert'}
      >
        <Image
          source={dragDate[expert].url}
          style={[styles.thumb, styles.expert]}
          resizeMode='contain'
        />
      </View>
    );
  }
}





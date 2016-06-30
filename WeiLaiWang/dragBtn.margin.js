/**
 * Created by sunny on 16/6/28.
 * 逻辑:
 *      1, 通过添加 marginLeft or marginRight(width + 4) 实现 空位视觉, 停止拖拽之后再把数据修改
 *      2, 在拖动过程中, 当前元素绝对定位, top:pageY,
 *      3, 在一定时间内, 移动到某一元素i下(设置一定时间, 做延迟处理),
 *      4, 如果为最右边,  i-1 设置 marginRight,
 *      5, 其余情况,  i 设置  marginLeft,
 *      6, 拖动结束后, 修改数据
 *
 * 目的:
 *      1, 减少渲染页面(不在拖拽的过程中修改数据!!! 而是停止后渲染数据)
 *      2, 提升性能
 *
 * 问题:
 *      1, 我如何获取相应index 对应的 组件呢??
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

  //,ele1: {
  //  url: require( './img/elema490.png' ),
  //  href: 'https://m.ele.me/home'
  //},
  //meituan1: {
  //  url: require( './img/meituan490.png' ),
  //  href: 'http://i.meituan.com/'
  //},
  //nuomi1: {
  //  url: require( './img/baidunuomi490.png' ),
  //  href: 'http://m.nuomi.com/'
  //},
  //dameile1: {
  //  url: require( './img/dameile490.png' ),
  //  href: 'http://www.dominos.com.cn/'
  //},
  //kfc1: {
  //  url: require( './img/kendeji490.png' ),
  //  href: 'http://m.kfc.com.cn/'
  //},
  //mcdonalds1: {
  //  url: require( './img/maidanglao490.png' ),
  //  href: 'http://www.mcdonalds.com.cn/'
  //},
  //jiyejia1: {
  //  url: require( './img/jiyejia490.png' ),
  //  href: 'http://ne.4008-197-197.com/mobile/theme/dbjyj/home/index.html?sysSelect=1'
  //},
  //bishengke1: {
  //  url: require( './img/bishengke490.png' ),
  //  href: 'http://m.4008123123.com/PHHSMWOS/index.htm?utm_source=orderingsite'
  //}
}; // 全部数据
var order = Object.keys(dragDate); //Array of keys
//console.log(order);

var dragDateLen = order.length;

var listViewH = ''; // listView 高度
var scrollTop = 0; //listView 滚动的高度
var baseHeight = 0;  // 手机自带导航栏的高度
var marginSpace  = width + 4;  // 左右margin 实现空位视觉

let refItem = {};



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
    onPanResponderGrant: (e, gs) => {
      console.log('onPanResponderGrant');
      this.id = setTimeout( () => {
        this.props.onDraging(false, this.props.attr);
      }, 200);
    },
    onMoveShouldSetPanResponder: () => true,
    onResponderTerminationRequest: (evt) => false,
    onPanResponderMove: (evt,gs)=>{
      this.updateId && clearTimeout(this.updateId);
      let { identifier, pageX, pageY, locationX, locationY } = evt.nativeEvent;
      // 当前额外元素的位置   相对于根目录,
      // 判断滚动到的位置呢   相对listView的总坐标和横坐标(的top, left)

      // 虚拟占位
      let offsetY = pageY + scrollTop - baseHeight;
      judgeIndex(pageX, offsetY);
      let index = judgeNum;

      let right = pageX > width;

      console.log(index, pageY, right, scrollTop,  baseHeight, offsetY, 'index, pageY, right, scrollTop, baseHeight,offsetY');

      // 添加的空位
      console.log('onDraging');
      this.props.onDraging(false, this.props.attr, {top: pageY - height/2, left: pageX - width/2});

      // 更新数组  做延迟处理, 快速移动到某位置时 || 移动回原来的位置时 oriIndex, nowIndex
      //let lastIndex = this.state.index;
      //let oriIndex = this.props.index;
      //if( index === lastIndex || index === oriIndex ){
      //  return false;
      //}
      //this.updateId = setTimeout( () => {
      //  console.log('onUpdate');
      //  this.props.onUpdate( oriIndex, index);
      //}, 300);
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
    this.setState({
      listen: false
    });
    this.id && clearTimeout(this.id);
    this.props.onDraging(true, '');
  }

  componentDidMount() {
    //let key = Object.keys(this.refs)[0];
    //refItem[key] = this.refs[key];
  }


  render() {


    console.log( '子组件在render~~~~' );

    return (
      <View
        {...this._panResponder.panHandlers}
        ref={'list' + this.props.index}
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
    }
  }

  componentDidMount() {
    this.setState({
      ds: this.state.ds.cloneWithRows(this.state.order)
    });
  }


  render() {
    let dragDates = this.state.order;
    console.log('当前遍历的数据', dragDates);
    console.info( 'listView render' );

    let expert = this.state.expert;
    console.log(expert, expert !== '' ? 'view' : 'text');

    let couldScroll = this.state.couldScroll;
    console.log(dragDates, this.state.ds, 'before  && now');

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
            listViewH = e.nativeEvent.contentSize.height;

            console.log(e.nativeEvent, scrollTop, listViewH, couldScroll, baseHeight, 'y ,couldScroll, listViewH, onscroll, baseHeight,');
            //this.refs.list.scrollTo({x: 0,y: 100, animated: true});
          }}
          onContentSizeChange={(width, height) => {
            // 可视范围内 -- 横屏时...
            //console.log(width, height, 'width, height,')
          }}
          onLayout={(e,a) => {
            baseHeight = e.nativeEvent.layout.y;
          }}
          scrollEnabled={ couldScroll && listViewH >= HEIGHT}
          //scrollEnabled={ true }
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
              ? (
                <Image
                  source={dragDate[expert].url}
                  style={[styles.thumb, styles.expert]}
                  resizeMode='contain'
                />
              )
              : <Text />
          }

        </View>

    </View>
    );
  }

  _onDraging(bool, attr, pos = {top: 0, left: 0}) {
    let {top, left} = pos;
    console.log();
    //setNativeProps 的使用!
    //console.log(this.refs.expert.setNativeProps(pos));
    this.setState({
      couldScroll: bool,
      expert: attr,
      top: top,
      left: left,
    });
  }

  _onUpdate(oriIndex, nowIndex) {
    console.log(oriIndex, nowIndex);
    //copyArrayStr
    let order = copyArrayStr(this.state.order);
    let oriData = order.splice( oriIndex, 1 )[0];
    order.splice( nowIndex, 0, oriData);

    console.log(order);

    this.setState({
      ds: this.state.ds.cloneWithRows(order),
      order: order
    });


  }
  renderRow(data, sectionID, rowID, highlightRow) {
    return (
      <DragBtn
        onDraging={this._onDraging.bind(this)}
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





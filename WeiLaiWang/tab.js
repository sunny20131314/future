/**
 * Created by sunzhimin on 04/07/16.
 * TODO: 为了让 tab点击切换按钮显示在顶部,以及调用相关方法, 修改了 ViewPager 源代码: renderPageIndicator
 * TODO: 循环播放效果不好,后期修改(loop时视觉效果不好,但是可以点击tab头部切换)
 */

'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
var ViewPager = require('react-native-viewpager');
import DragBtnContainer from './dragBtn.expert';


// 计算每个image的大小,高宽和图等比例!
let WIDTH = Dimensions.get('window').width;
let HEIGHT = Dimensions.get('window').height;
let width = (WIDTH-4)/2;
var height = width/490*245;

console.log(width, height, 'width, height');
export default class Tab extends Component {
  constructor(props) {
    super(props);

    this.index = this.props.index; // string: 记录是第几个tab
    this.data = this.props.data;   // arr: 所有数据 []
    this.len = this.data.length;
    this.show = [];
    this.title = [];
    this.alter = [];

    let order = this.props.order;  // arr: 记录显示顺序及tab [name: '', show :Array[8]], [name: '', show :Array[8]]
    for (let i = 0, len = this.len; i !== len; i++ ){
      this.title[i] = order[i].name;
      this.show[i] = order[i].show;
      this.alter[i] = order[i].alter;
    }
    console.log(this.index, this.data, this.show, this.title, 'this.index, this.data, this.order, this.title,');


    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2
    });

    this.state = {
      activePage: 0,   // 这个需要传递给编辑,告诉是第几个
      dataSource: dataSource.cloneWithPages(this.show),
    }
  }
  static propTypes = {
    index: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    order: React.PropTypes.array.isRequired
  };
  //
  //shouldComponentUpdate(nextProps, nextState) {
  //  return nextState.activePage !== this.state.activePage;
  //}

  render() {
    this.onJump = this.props.onJump;
    return (
      <ViewPager
        style={[this.props.style]}
        dataSource={this.state.dataSource}
        renderPage={this._renderPage.bind(this)}
        renderPageIndicator={this._renderPageIndicator.bind(this)}
        onChangePage={this._onChangePage.bind(this)}
        isLoop={true}
        autoPlay={false}/>
    );
  }
  _renderIndicator(i, goToPage, name) {
    let isChange = this.state.activePage === i;
    return (
      <TouchableHighlight
        key={'btn' + i}
        activeOpacity={.8}
        underlayColor="rgba(255, 255, 255, 0.6)"
        onPress={() => {
          if(isChange){
            return false;
          }
          this.setState({
            activePage: i
          });
          console.log('go' ,i ,'~~~~');
          goToPage(i);
        }}
        style={styles.tab}
      >
        <Text
          style={[
            styles.tabText,
            isChange &&  {color: '#ff5248'}
            ]}
        >
          {name}
        </Text>
      </TouchableHighlight>
    );
  }
  _renderPageIndicator(props) {
    // 这个数据是修改了源代码才得到的 -- this.props.i
    // 从ViewPager 传过来的参数
    let {goToPage} = props;
    console.log(props);
    let indicators = [];
    for (let i = 0, len = this.len; i !== len; i++) {
      indicators.push(this._renderIndicator(i, goToPage, this.title[i]));
    }
    let activePage = this.state.activePage;
    return (
      <View style={styles.indicator}>
        {indicators}
        <TouchableHighlight
          style={styles.edit}
          onPress={() => {
            console.log('press');
            const { navigator } = this.props;
            navigator.replace({
              name: 'edit',
              component: DragBtnContainer,
              params: {
                url: '',
                index: this.index,  //第几个tab
                show: this.show[activePage],    //显示的前8条数据
                alter: this.alter[activePage],    //显示的剩余数据
                data: this.data[activePage],    //该页面的全部数据
              }
            });
            }}
          underlayColor="transparent"
        >
          <Text style={styles.editText}>编辑</Text>
        </TouchableHighlight>
      </View>
    )
  }

  _renderPage(datas, pageID) {
    console.log('_renderPage');
    let dataAll = this.data[pageID]; //当前切换页 url ,href
    return (
      <View style={styles.page}>
        {datas.map((data, i) => (
          <TouchableHighlight
            key={'img' + i}
            onPress={() => {
              this.onJump(dataAll[data].href);
            }}
            underlayColor="transparent"
          >
            <Image
              source={dataAll[data].url}
              style={styles.img}
              resizeMode='contain'
            />
          </TouchableHighlight>
          //<TouchImage key={'img' + i} url={dataAll[data].url} href={dataAll[data].href}/>
        ))}
      </View>
      );
    }

  _onChangePage(page) {
    console.log(page, 'page _onChangePage');
    if(this.state.activePage === page){
      return false;
    }
    this.setState({
      activePage: page
    });
  }
}

class TouchImage extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.url !== this.props.url;
  }

  render() {
    return (
      //<View style={styles.imgCon}>
        <TouchableHighlight
          onPress={() => console.log('press')}
          underlayColor="transparent"
        >
          <Image
            source={this.props.url}
            style={styles.img}
            resizeMode='contain'
          />
        </TouchableHighlight>
      //</View>
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
    //backgroundColor: '#F5FCFF',
  },
  edit: {
    position: 'absolute',
    right: 0,
    width: 60,
    height: 48,
    paddingRight: 16,
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    fontSize: 12,
  },
  tab: {
    width: 60,
    marginLeft: 16,
    paddingTop: 6,
    paddingBottom: 6,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 4,
  },
  indicator: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center'
  },
  img: {
    width: width,
    height: height,
    marginBottom: 4,
  }
});


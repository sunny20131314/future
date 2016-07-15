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
var ViewPager = require('./ViewPager/ViewPager');

import dragBtn from './dragBtn';

export default class Tab extends Component {
  constructor(props) {
    super(props);

    let index = this.index = this.props.index; // number: 记录是第几个tab
    let appDataOrders = this.appDataOrders = this.props.appDataOrders;
    this.imgLayout = this.props.deviceLayout.imgLayout;
    let {data, title} = this.props.data;
    this.data = data;  // arr: 当前tab页的所有数据 []
    this.title = title; // 类目
    this.len = title.length;
    this.order = appDataOrders[index];

    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2
    });

    this.state = {
      activePage: 0,   // 这个需要传递给编辑, 当前tab页的第几个
      dataSource: dataSource.cloneWithPages(this.order),
    }
  }

  static propTypes = {
    index: React.PropTypes.number.isRequired,
    data: React.PropTypes.object.isRequired,
  };
  //
  //shouldComponentUpdate(nextProps, nextState) {
  //  return nextState.activePage !== this.state.activePage;
  //}

  componentDidMount() {
  }

  //_renderIndicator(i, goToPage, name) {
  //  let isChange = this.state.activePage === i;
  //  return (
  //    <TouchableHighlight
  //      key={this.index + 'btn' + i }
  //      activeOpacity={.8}
  //      underlayColor="rgba(255, 255, 255, 0.6)"
  //      onPress={() => {
  //        if(isChange){
  //          return false;
  //        }
  //        this.setState({
  //          activePage: i
  //        });
  //        goToPage(i);
  //      }}
  //      style={styles.tab}
  //    >
  //      <Text style={[styles.tabText, isChange &&  {color: '#ff5248'}]} >
  //        {name}
  //      </Text>
  //    </TouchableHighlight>
  //  );
  //}
  //_renderPageIndicator(props) {
  //  // 这个数据是修改了源代码才得到的 -- this.props.i
  //  // 从ViewPager 传过来的参数
  //  let {goToPage} = props;
  //  let indicators = [];
  //  for (let i = 0, len = this.len; i !== len; i++) {
  //    indicators.push(this._renderIndicator(i, goToPage, this.title[i]));
  //  }
  //  const { navigator } = this.props;
  //  let activePage = this.state.activePage;
  //  return (
  //    <View
  //      style={styles.indicator}
  //    >
  //      {indicators}
  //      <TouchableHighlight
  //        style={styles.edit}
  //        onPress={() => {
  //          navigator.replace({
  //            name: 'edit',
  //            component: dragBtn,
  //            params: {
  //              url: '',
  //              deviceLayout: this.props.deviceLayout,
  //              index: this.index,       //第几个tab
  //              activePage: activePage,   //page页
  //              appDataOrders: this.appDataOrders,    //显示的全部数据顺序
  //              data: this.data[activePage],    //该页面的全部数据
  //            }
  //          });
  //        }}
  //        underlayColor="transparent"
  //      >
  //        <Image
  //          style={styles.editPic}
  //          source={require('./img/edit.png')}
  //        >
  //          {            //<Text style={styles.editText}>编辑</Text>
  //          }
  //        </Image>
  //      </TouchableHighlight>
  //    </View>
  //  )
  //}

  _renderPage(datas, pageID) {
    let pageData = this.data[pageID];
    datas = datas.slice(0, 8);
    return (
      <View style={styles.page}>
        {datas.map((data, i) => {
          return (
          <TouchableHighlight
            key={'img' + i}
            onPress={() => {
              this.props.onJump(pageData[data].href);
            }}
            underlayColor="transparent"
          >
            <Image
              source={pageData[data].url}
              style={this.imgLayout}
              resizeMode='contain'
            >
              <Text>{data.url}</Text>
            </Image>
          </TouchableHighlight>
          //<TouchImage key={'img' + i} url={dataAll[data].url} href={dataAll[data].href}/>
        )})}
      </View>
      );
    }

  _onChangePage(page) {
    if(this.state.activePage === page){
      return false;
    }
    this.setState({
      activePage: page
    });
  }

  _onJumpEdit() {
    const { navigator } = this.props;
    let activePage = this.state.activePage;
    navigator.replace({
      name: 'edit',
      component: dragBtn,
      params: {
        url: '',
        deviceLayout: this.props.deviceLayout,
        index: this.index,       //第几个tab
        activePage: activePage,   //page页
        appDataOrders: this.appDataOrders,    //显示的全部数据顺序
        data: this.data[activePage],    //该页面的全部数据
      }
    });
  }

  render() {
    return (
      <ViewPager
        style={[this.props.style]}
        dataSource={this.state.dataSource}
        renderPage={this._renderPage.bind(this)}
        //renderPageIndicator={this._renderPageIndicator.bind(this)}
        onChangePage={this._onChangePage.bind(this)}
        //isLoop={this.len > 1}
        //onJumpEdit={this._onJumpEdit.bind(this)}
        indicator={{onJumpEdit: this._onJumpEdit.bind(this), title: this.title, index: this.index}}
        isLoop={false}
        autoPlay={false}/>
    );
  }
}

//class TouchImage extends Component {
//  constructor(props) {
//    super(props);
//  }
//
//  shouldComponentUpdate(nextProps, nextState) {
//    return nextProps.url !== this.props.url;
//  }
//
//  render() {
//    return (
//      //<View style={styles.imgCon}>
//        <TouchableHighlight
//          onPress={() => console.log('press')}
//          underlayColor="transparent"
//        >
//          <Image
//            source={this.props.url}
//            style={this.imgLayout}
//            resizeMode='contain'
//          />
//        </TouchableHighlight>
//      //</View>
//    )
//  }
//}

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
  editPic: {
    width: 18,
    height: 18,
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
});


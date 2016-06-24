/**
 * Created by sunzhimin on 16/6/20.
 * 打算把所有的 btn 一个个写出来
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  TouchableHighlight,
  TextInput,
  Text,
  Image,
  View
} from 'react-native';
import SearchComponent from './search';

class DeliveryBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBtn: this.props.activeBtn,
      preActiveBtn: this.props.activeBtn,
    }
  }

  render() {
    return (
      <View style={styles.btnItem}>
        <TouchableHighlight
          activeOpacity={.8}
          onPress={this._onClick.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.6)"
          style={styles.btn}
        >
          <Text style={this.props.activeBtn=== this.props.id
                    ? [styles.inactiveBtn, styles.activeBtn]
                    : styles.inactiveBtn }
          >
            {this.props.val}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onClick() {
    let id = this.props.id;
    console.log(id);
    this.props.setType( id );
  }
}



var DeliveryArr = [
  {id: 'yuantong', val: '圆通'},
  {id: 'yunda', val: '韵达'},
  {id: 'shentong', val: '申通'},
  {id: 'zhongtong', val: '中通'},
  {id: 'shunfeng', val: '顺丰'},
  {id: 'ems', val: 'EMS'},
  {id: 'zhaijisong', val: '宅急送'},
  {id: 'quanfengkuaidi', val: '全峰'},
  {id: 'tiantian', val: '天天'},
  {id: 'youshuwuliu', val: '优速'},
  {id: 'rufengda', val: '如风达'},
  {id: 'youzhengguonei', val: '包裹'}
];

export default class DeliveryBtns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBtn: this.props.activeBtn,
      preActiveBtn: this.props.activeBtn,
    }
  }

  render() {
    return (
      <View>
        <SearchComponent placeholder="请输入快递单号..." keyboardType='numeric' onSearch={this._onSearchDelivery.bind(this)}/>
        <View style={styles.deliveryBtns}>
          {
            DeliveryArr.map((arr) => <DeliveryBtn
              id={arr.id}
              val={arr.val}
              key={arr.id}
              activeBtn={this.state.activeBtn}
              setType={this._setType.bind(this)}
            />)
          }
        </View>
      </View>
    );
  }

  _onSearchDelivery(val) {
    // 检测数据类型为 number --
    this.props.onSearch( 'http://m.kuaidi100.com/index_all.html?type=' + this.state.activeBtn + '&postid='+ val );
  }
}

const styles = StyleSheet.create({
  deliveryBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 15,
    marginBottom: 15,
  },
  btnItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  activeBtn: {
    backgroundColor: '#ff5248',
    color: '#fff',
  },
  inactiveBtn: {
    width: 80,
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 2,
    textAlign: 'center',
  },
});


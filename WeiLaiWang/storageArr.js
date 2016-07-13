/**
 * Created by sunzhimin on 01/07/16.
 * 存储数据
 * 前8个显示, 其余放在之后,
 */

import {
  Dimensions,
  Platform,
  AsyncStorage,
} from 'react-native';
import async from 'async';
console.log(async);

// 待定
let isOs = Platform.OS === 'ios';
let {width, height} = Dimensions.get('window');

function getData() {
  // 分组保管数据(以整个tab为单位)
// tabn 保管对象数据(src,href)
// tabIndexn 保管每个tab对应页的全部数据的展示顺序
  let dataTabs = [];  // 所有tab页的数据--近乎不变动 [tab0, tab1]
  let tab0 = dataTabs[0] = [];

// 订餐 0-0
  tab0[0] = {
    name: '订餐',
    data: [
      {
        url: require( './img/baiduwaimai490.png' ),
        href: 'http://waimai.baidu.com'
      },
      {
        url: require( './img/meituanwaimai490.png' ),
        href: 'http://i.meituan.com/'
      },
      {
        url: require( './img/dazhongdp490.png' ),
        href: 'http://m.dianping.com'
      },
      {
        url: require( './img/kendeji490.png' ),
        href: 'http://m.4008823823.com.cn/kfcmwos/index.htm'
      },
      {
        url: require( './img/maidanglao490.png' ),
        href: 'https://www.4008-517-517.cn/m/cn/jsp-mobile/sys/userLogin.jsp'
      },
      {
        url: require( './img/elema490.png' ),
        href: 'https://m.ele.me/home/'
      },
      {
        url: require( './img/bishengke490.png' ),
        href: 'http://m.4008123123.com/'
      },
      {
        url: require( './img/jiyejia490.png' ),
        href: 'http://ne.4008-197-197.com/'
      },
      {
        url: require( './img/xingbake490.png' ),
        href: 'https://www.starbucks.com.cn/'
      },
      {
        url: require( './img/aixianfeng490.png' ),
        href: 'http://m.beequick.cn'
      },
      {
        url: require( './img/dameile490.png' ),
        href: 'http://www.dominos.com.cn/'
      },
      {
        url: require( './img/budingwaimai490.png' ),
        href: 'http://www.buding.cn/i_takeout.html'
      }
    ]
  };
// 交通 0-1
  tab0[1] = {
    name: '交通',
    data: [
      {
        url: require( './img/edaijia490.png' ),
        href: 'http://wap.edaijia.cn'
      },
      {
        url: require( './img/dididache490.png' ),
        href: 'http://webapp.diditaxi.com.cn/?maptype=wgs84&channel=55265&d=130002030203'
      },
      {
        url: require( './img/shenzhouzhuanche490.png' ),
        href: 'http://m.10101111.com/'
      },
      {
        url: require( './img/weizhangchaxun490.png' ),
        href: 'http://m.weizhang8.cn/'
      },
      {
        url: require( './img/aibanggongjiao490.png' ),
        href: 'http://gj.aibang.com/'
      },
      {
        url: require( './img/yidaoyongche490.png' ),
        href: 'http://3g.yongche.com/touch/'
      },
      {
        url: require( './img/tieyouwang490.png' ),
        href: 'http://m.tieyou.com/'
      },
      {
        url: require( './img/youyouzuche.png' ),
        href: 'http://uucars.com/'
      },
      {
        url: require( './img/changtuqichepiao490.png' ),
        href: 'http://m.changtu.com/'
      },
      {
        url: require( './img/feichangzhun490.png' ),
        href: 'http://m.veryzhun.com/'
      }
    ]
  };
// 生活 0-2
  tab0[2] = {
    name: '生活',
    data: [
      {
        url: require( './img/58daojia490.png' ),
        href:'http://m.58.com/'
      },
      {
        url: require( './img/ganjiwang490.png' ),
        href: 'http://3g.ganji.com/'
      },
      {
        url: require( './img/baidunuomi490.png' ),
        href:'http://m.nuomi.com/'
      },
      {
        url: require( './img/benlai490.png' ),
        href:'https://m.benlai.com/'
      },
      {
        url: require( './img/ikea490.png' ),
        href:'http://m.ikea.com/cn/zh/?offlineCache=16979'
      },
      {
        url: require( './img/xianyu490.png' ),
        href: 'http://2.taobao.com'
      },
      {
        url: require( './img/douguomeishi490.png' ),
        href:'http://m.douguo.com/'
      },
      {
        url: require( './img/helijia490.png' ),
        href:'http://m.helijia.com/'
      },
      {
        url: require( './img/caishichang490.png' ),
        href:'http://www.zgwlcsc.com/wap/'
      },
      {
        url: require( './img/tiantianguoyuan490.png' ),
        href:'http://m.fruitday.com/'
      },
      {
        url: require( './img/enjoy490.png' ),
        href:'http://enjoy.ricebook.com/'
      },
      {
        url: require( './img/chengmi490.png' ),
        href:'http://www.chengmi.com/'
      }
    ]
  };

// 购物  1-0
  let tab1 = dataTabs[1] = [];
  tab1[0] = {
    name: '购物',
    data: [
      {
        url: require( './img/suningyigou490.png' ),
        href: 'http://m.suning.com/'
      },
      {
        url: require( './img/weipinhui490.png' ),
        href: 'http://m.vip.com/'
      },
      {
        url: require( './img/mogujie490.png' ),
        href:'http://m.mogujie.com/'
      },
      {
        url: require( './img/zhe800490.png' ),
        href:'http://m.zhe800.com/'
      },
      {
        url: require( './img/yamaxun490.png' ),
        href: 'https://www.amazon.cn/'
      },
      {
        url: require( './img/meiriyouxian490.png' ),
        href:'https://www.missfresh.cn/'
      },
      {
        url: require( './img/meilishuo490.png' ),
        href:'http://m.meilishuo.com/'
      },
      {
        url: require( './img/jumeiyoupin490.png' ),
        href:'http://m.jumei.com/'
      },
      {
        url: require( './img/dangdang490.png' ),
        href:'http://m.dangdang.com/'
      },
      {
        url: require( './img/jingdong490.png' ),
        href:'http://m.jd.com/'
      },
      {
        url: require( './img/taobao490.png' ),
        href:'https://m.taobao.com/#index'
      },
      {
        url: require( './img/tianmao490.png' ),
        href: 'https://www.tmall.com/?from=m'
      }
    ]
  };


  return dataTabs;
  // 双色球  -- bd-hd 中才获取数据
  fetch('http://f.apiplus.cn/ssq-1.json', {
    method: 'GET',
  }).then(response => {
    return response.json();
  }).then(json => {
    //console.log(json, 'json');
    if(json && json.data){
      let data = json.data[0];
      //storage1.save({
      //  key: 'lottery',
      //  rawData: data,
      //});
      // 成功则调用resolve
      //resolve && resolve(data);
    }
    else{
      // 失败则调用reject
      //reject && reject(new Error('data parse error'));
    }
  }).catch(err => {
    console.warn(err);
    //reject && reject(err);
  });
}

let data;

function get() {

  async getCache(key){
    try {
      const value = await AsyncStorage.getItem('dataTabs');
      if (value !== null){
        console.log(value);
        data = value;
      }
    } catch (error) {
      console.log(error);
      return false;
      //try {
      //  data = getData();
      //  await AsyncStorage.setItem('dataTabs', data);
      //} catch (error) {
      //  console.log(error);
      //}
    }
  }
  getCache();

}
get();
export default storage = data;

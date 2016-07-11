/**
 * Created by sunzhimin on 01/07/16.
 * 存储数据
 * 前8个显示, 其余放在之后,
 */

import Storage from 'react-native-storage';
import {
  Dimensions,
  Platform
} from 'react-native';

// 待定
let isOs = Platform.OS === 'ios';
let {width, height} = Dimensions.get('window');

// 分组保管数据(以整个tab为单位)
// tabn 保管对象数据(src,href)
// tabIndexn 保管每个tab对应页的全部数据的展示顺序
let dataTabs = [];  // 所有tab页的数据--近乎不变动 [tab0, tab1]
let dataTabOrders = [];  //所有tab页的数据的展示顺序
let tab0 = dataTabs[0] = [];

// 订餐 0-0
tab0[0] = {
  name: '订餐',
  data: {
    baiduwaimai: {
      url: require( './img/baiduwaimai490.png' ),
      href: 'http://waimai.baidu.com'
    },
    meituan: {
      url: require( './img/meituanwaimai490.png' ),
      href: 'http://i.meituan.com/'
    },
    dianping: {
      url: require( './img/dazhongdp490.png' ),
      href: 'http://m.dianping.com'
    },
    kfc: {
      url: require( './img/kendeji490.png' ),
      href: 'http://m.4008823823.com.cn/kfcmwos/index.htm'
    },
    maidanglao: {
      url: require( './img/maidanglao490.png' ),
      href: 'https://www.4008-517-517.cn/m/cn/jsp-mobile/sys/userLogin.jsp'
    },
    ele: {
      url: require( './img/elema490.png' ),
      href: 'https://m.ele.me/home/'
    },
    bishengke: {
      url: require( './img/bishengke490.png' ),
      href: 'http://m.4008123123.com/'
    },
    jiyejia: {
      url: require( './img/jiyejia490.png' ),
      href: 'http://ne.4008-197-197.com/'
    },
    starbucks: {
      url: require( './img/xingbake490.png' ),
      href: 'https://www.starbucks.com.cn/'
    },
    beequick: {
      url: require( './img/aixianfeng490.png' ),
      href: 'http://m.beequick.cn'
    },
    dameile: {
      url: require( './img/dameile490.png' ),
      href: 'http://www.dominos.com.cn/'
    },
    buding: {
      url: require( './img/budingwaimai490.png' ),
      href: 'http://www.buding.cn/i_takeout.html'
    }
  }
};
// 交通 0-1
tab0[1] = {
  name: '交通',
  data: {
    edaijia: {
      url: require( './img/edaijia490.png' ),
      href: 'http://wap.edaijia.cn'
    },
    dididache: {
      url: require( './img/dididache490.png' ),
      href: 'http://webapp.diditaxi.com.cn/?maptype=wgs84&channel=55265&d=130002030203'
    },
    shenzhouzhuanche: {
      url: require( './img/shenzhouzhuanche490.png' ),
      href: 'http://m.10101111.com/'
    },
    weizhangchaxun: {
      url: require( './img/weizhangchaxun490.png' ),
      href: 'http://m.weizhang8.cn/'
    },
    aibang: {
      url: require( './img/aibanggongjiao490.png' ),
      href: 'http://gj.aibang.com/'
    },
    yongche: {
      url: require( './img/yidaoyongche490.png' ),
      href: 'http://3g.yongche.com/touch/'
    },
    tieyou: {
      url: require( './img/tieyouwang490.png' ),
      href: 'http://m.tieyou.com/'
    },
    uucars: {
      url: require( './img/youyouzuche.png' ),
      href: 'http://uucars.com/'
    },
    changtu: {
      url: require( './img/changtuqichepiao490.png' ),
      href: 'http://m.changtu.com/'
    },
    feichangzhun: {
      url: require( './img/feichangzhun490.png' ),
      href: 'http://m.veryzhun.com/'
    }
  }
};
// 生活 0-2
tab0[2] = {
  name: '生活',
  data: {
    daojia: {
      url: require( './img/58daojia490.png' ),
      href:'http://m.58.com/'
    },
    ganji: {
      url: require( './img/ganjiwang490.png' ),
      href: 'http://3g.ganji.com/'
    },
    nuomi: {
      url: require( './img/baidunuomi490.png' ),
      href:'http://m.nuomi.com/'
    },
    benlai: {
      url: require( './img/benlai490.png' ),
      href:'https://m.benlai.com/'
    },
    ikea: {
      url: require( './img/ikea490.png' ),
      href:'http://m.ikea.com/cn/zh/?offlineCache=16979'
    },
    xianyu: {
      url: require( './img/xianyu490.png' ),
      href: 'http://2.taobao.com'
    },
    douguo: {
      url: require( './img/douguomeishi490.png' ),
      href:'http://m.douguo.com/'
    },
    helijia: {
      url: require( './img/helijia490.png' ),
      href:'http://m.helijia.com/'
    },
    caishichang: {
      url: require( './img/caishichang490.png' ),
      href:'http://www.zgwlcsc.com/wap/'
    },
    fruitday: {
      url: require( './img/tiantianguoyuan490.png' ),
      href:'http://m.fruitday.com/'
    },
    enjoy: {
      url: require( './img/enjoy490.png' ),
      href:'http://enjoy.ricebook.com/'
    },
    chengmi: {
      url: require( './img/chengmi490.png' ),
      href:'http://www.chengmi.com/'
    }
  }
};

// 购物  1-0
let tab1 = dataTabs[1] = [];
tab1[0] = {
  name: '购物',
  data: {
    suning: {
      url: require( './img/suningyigou490.png' ),
      href: 'http://m.suning.com/'
    },
    weipinhui: {
      url: require( './img/weipinhui490.png' ),
      href: 'http://m.vip.com/'
    },
    mogujie: {
      url: require( './img/mogujie490.png' ),
      href:'http://m.mogujie.com/'
    },
    zhe800: {
      url: require( './img/zhe800490.png' ),
      href:'http://m.zhe800.com/'
    },
    amazon: {
      url: require( './img/yamaxun490.png' ),
      href: 'https://www.amazon.cn/'
    },
    missfresh: {
      url: require( './img/meiriyouxian490.png' ),
      href:'https://www.missfresh.cn/'
    },
    meilishuo: {
      url: require( './img/meilishuo490.png' ),
      href:'http://m.meilishuo.com/'
    },
    jumei: {
      url: require( './img/jumeiyoupin490.png' ),
      href:'http://m.jumei.com/'
    },
    dangdang: {
      url: require( './img/dangdang490.png' ),
      href:'http://m.dangdang.com/'
    },
    jd: {
      url: require( './img/jingdong490.png' ),
      href:'http://m.jd.com/'
    },
    taobao: {
      url: require( './img/taobao490.png' ),
      href:'https://m.taobao.com/#index'
    },
    tmall: {
      url: require( './img/tianmao490.png' ),
      href: 'https://www.tmall.com/?from=m'
    }
  }
};

// tab页数据的排列顺序
for(let m = 0, len = dataTabs.length; m !== len; m++ ){
  let tab = dataTabs[m];
  let tabIndex = dataTabOrders[m] = []; // 传递每一个tab的数据
  let indexLen = tab.length;
  for(let n = 0; n !== indexLen; n++){ //每个tab的每页: 生成相关数据!
    let tabIndexArr = tabIndex[n] = {};
    tabIndexArr.order = Object.keys(tab[n].data);   // 保存全部数据的顺序
    //tabIndexArr.alter = Object.keys(tab[n].data);   // 保存剩余可选数据的顺序
    //tabIndexArr.show = tabIndex[n].alter.splice(0, 8);// 保存显示的数据的顺序
  }
}

// 存储数据!
let storage1 = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  //defaultExpires: 1000 * 3600 * 24,
  defaultExpires: 1000 * 3600 * 24,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  sync: {
    //http://f.apiplus.cn/ssq.json
    lottery(params){
      let { id, resolve, reject } = params;
      fetch('http://f.apiplus.cn/ssq-1.json', {
        method: 'GET',
      }).then(response => {
        return response.json();
      }).then(json => {
        console.log(json, 'json');
        if(json && json.data){
          let data = json.data[0];
          storage1.save({
            key: 'lottery',
            id,
            rawData: data,
            expires: 1000,
          });
          // 成功则调用resolve
          resolve && resolve(data);
        }
        else{
          // 失败则调用reject
          reject && reject(new Error('data parse error'));
        }
      }).catch(err => {
        console.warn(err);
        reject && reject(err);
      });
    }
  }
});


// 所有tab页的数据
storage1.save({
  key: 'dataTabs',
  rawData: dataTabs,
  expires: 1000 * 3600 * 24 * 30  //30天
});

storage1.save({
  key: 'dataTabOrders',
  rawData: dataTabOrders,
  expires: 1000 * 30  // 30s
});



//module.exports = dataTabs;

//// 设备数据
//storage1.save({
//  key: 'device',
//  rawData: {
//    isOs: isOs,
//    width: width,
//    height: height
//  }
//});



//// 保存数据 订餐 : 0-0
////1000 * 3600 * 24 * 330
//storage.save({
//    key: 'tab1',
//    id: '0',
//    rawData: dingCan,
//    expires: 1000 * 1  //330天
//  });
//storage.save({
//  key: 'tabIndex1',
//  id: '0',
//  rawData: dingCanOrder,
//  expires: 1000
//});
//
//// 保存数据 交通 : 0-1
//storage.save({
//  key: 'tab1',
//  id: '1',
//  rawData: jiaoTong,
//  expires: 1000 * 1  //330天
//});
//storage.save({
//  key: 'tabIndex1',
//  id: '1',
//  rawData: jiaoTongOrder,
//  expires: 1000
//});
//
//// 保存数据 生活 : 0-2
//storage.save({
//  key: 'tab1',
//  id: '2',
//  rawData: shengHuo,
//  expires: 1000 * 1  //330天
//});
//storage.save({
//  key: 'tabIndex1',
//  id: '2',
//  rawData: shengHuoOrder,
//  expires: 1000
//});
//
//// 保存数据 购物 : 1-0
//storage.save({
//  key: 'tab2',
//  id: '0',
//  rawData: gouWu,
//  expires: 1000 * 1  //330天
//});
//storage.save({
//  key: 'tabIndex2',
//  id: '0',
//  rawData: gouWuOrder,
//  expires: 1000
//});

// 全局中使用!!! 类似localstorage, 注意引用顺序
console.log(global.storage ? 'global.storage' : 'storage1');
export default storage = global.storage ? global.storage : storage1;

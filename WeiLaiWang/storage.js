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

// 订餐 0-0
let dingCan = {
  baiduwaimai: {
    url: require( './img/budingwaimai490.png' ),
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
};
let dingCanOrder = {
  name: '订餐'
};
dingCanOrder.alter = Object.keys(dingCan);  // 保存剩余可选数据的顺序
dingCanOrder.show = dingCanOrder.alter.splice(0, 8);  // 保存显示的数据的顺序

// 交通 0-1
let jiaoTong = {
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
};
let jiaoTongOrder = {
  name: '交通'
};
jiaoTongOrder.alter = Object.keys(jiaoTong);
jiaoTongOrder.show = jiaoTongOrder.alter.splice(0, 8);

// 生活 0-2
let shengHuo = {
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
};
let shengHuoOrder = {
  name: '生活'
};
shengHuoOrder.alter = Object.keys(shengHuo);
shengHuoOrder.show = shengHuoOrder.alter.splice(0, 8);


// 购物  1-0
let gouWu = {
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
};
let gouWuOrder = {
  name: '购物'
};
gouWuOrder.alter = Object.keys(gouWu);
gouWuOrder.show = gouWuOrder.alter.splice(0, 8);

// 存储数据!
export default storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  //defaultExpires: 1000 * 3600 * 24,
  defaultExpires: 1000 * 2,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  sync: {}
});

//// 设备数据
//storage.save({
//  key: 'device',
//  rawData: {
//    isOs: isOs,
//    width: width,
//    height: height
//  }
//});

// 保存数据 订餐 : 0-0
//1000 * 3600 * 24 * 330
storage.save({
    key: 'tab1',
    id: '0',
    rawData: dingCan,
    expires: 1000 * 1  //330天
  });
storage.save({
  key: 'tabIndex1',
  id: '0',
  rawData: dingCanOrder,
  expires: 1000
});

// 保存数据 交通 : 0-1
storage.save({
  key: 'tab1',
  id: '1',
  rawData: jiaoTong,
  expires: 1000 * 1  //330天
});
storage.save({
  key: 'tabIndex1',
  id: '1',
  rawData: jiaoTongOrder,
  expires: 1000
});

// 保存数据 生活 : 0-2
storage.save({
  key: 'tab1',
  id: '2',
  rawData: shengHuo,
  expires: 1000 * 1  //330天
});
storage.save({
  key: 'tabIndex1',
  id: '2',
  rawData: shengHuoOrder,
  expires: 1000
});

// 保存数据 购物 : 1-0
storage.save({
  key: 'tab2',
  id: '0',
  rawData: gouWu,
  expires: 1000 * 1  //330天
});
storage.save({
  key: 'tabIndex2',
  id: '0',
  rawData: gouWuOrder,
  expires: 1000
});

// 全局中使用!!! 类似localstorage, 注意引用顺序
global.storage = storage;
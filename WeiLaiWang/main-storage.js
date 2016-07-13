/**
 * Created by sunzhimin on 16/6/16.
 * tab页全部数据: tab页数据(地址,链接), tab页数据的相关顺序(展示)
 */
import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  RefreshControl,
  //AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  WebView,
  Text,
  Image,
  View,
  Animated,
} from 'react-native';

import storage from './storage';
console.log(storage);
//import nav from './header';
import WebViewCom from './webView';
import BdHd from './bd-hd';
import Calendar from './calendar/calendar';
import WeatherPage from './weatherPage';
import Ad from './ad';
import SearchComponent from './search';
import Tab from './tab';
import DeliveryBtnCon from './deliveryBtn';
import BdBtm from './bd-btm';


import ViewPager from './viewpager';

let appData0 = {
  "tab0":[
    [
      {url: require( 'images/baiduwaimai490.png'),href:"http://waimai.baidu.com/mobile/waimai"},
      {url: require( 'images/meituanwaimai490.png'),href:"http://i.waimai.meituan.com"},
      {url: require( 'images/dazhongdp490.png'),href:"http://m.dianping.com"},
      {url: require( 'images/kendeji490.png'),href:"http://m.4008823823.com.cn/kfcmwos/index.htm"},
      {url: require( 'images/maidanglao490.png'),href:"https://www.4008-517-517.cn/m/cn/jsp-mobile/sys/userLogin.jsp"},
      {url: require( 'images/elema490.png'),href:"https://m.ele.me/home"},
      {url: require( 'images/bishengke490.png'),href:"http://m.4008123123.com/PHHSMWOS/index.htm"},
      {url: require( 'images/jiyejia490.png'),href:"http://ne.4008-197-197.com/mobile/theme/dbjyj/home"},
      {url: require( 'images/xingbake490.png'),href:"https://www.starbucks.com.cn"},
      {url: require( 'images/aixianfeng490.png'),href:"http://m.beequick.cn"},
      {url: require( 'images/dameile490.png'),href:"http://m.dominos.com.cn"},
      {url: require( 'images/budingwaimai490.png'),href:"http://www.buding.cn/i_takeout.html"}
    ],
    [
      {url: require( 'images/edaijia490.png'),href:"http://h5.edaijia.cn/app/index.html"},
      {url: require( 'images/dididache490.png'),href:"http://webapp.diditaxi.com.cn"},
      {url: require( 'images/uber490.png'),href:"https://partners.uber.com.cn/ob/signup"},
      {url: require( 'images/shenzhouzhuanche490.png'),href:"http://m.10101111.com"},
      {url: require( 'images/weizhangchaxun490.png'),href:"http://m.weizhang8.cn"},
      {url: require( 'images/aibanggongjiao490.png'),href:"http://gj.aibang.com"},
      {url: require( 'images/yidaoyongche490.png'),href:"http://3g.yongche.com/touch"},
      {url: require( 'images/tieyouwang490.png'),href:"http://m.tieyou.com"},
      {url: require( 'images/youyouzuche.png'),href:"http://m.uucars.com"},
      {url: require( 'images/hangbanguanjia490.png'),href:"http://www.133.cn"},
      {url: require( 'images/changtuqichepiao490.png'),href:"http://m.changtu.com"},
      {url: require( 'images/feichangzhun490.png'),href:"http://m.veryzhun.com"}
    ],
    [
      {url: require( 'images/suningyigou490.png'),href:"http://m.suning.com"},
      {url: require( 'images/weipinhui490.png'),href:"http://m.vip.com"},
      {url: require( 'images/mogujie490.png'),href:"http://m.mogujie.com"},
      {url: require( 'images/zhe800490.png'),href:"http://m.zhe800.com"},
      {url: require( 'images/yamaxun490.png'),href:"https://www.amazon.cn"},
      {url: require( 'images/meiriyouxian490.png'),href:"https://www.missfresh.cn"},
      {url: require( 'images/meilishuo490.png'),href:"http://m.meilishuo.com"},
      {url: require( 'images/jumeiyoupin490.png'),href:"http://m.jumei.com"},
      {url: require( 'images/dangdang490.png'),href:"http://m.dangdang.com"},
      {url: require( 'images/jingdong490.png'),href:"http://m.jd.com"},
      {url: require( 'images/taobao490.png'),href:"https://m.taobao.com/#index"},
      {url: require( 'images/tianmao490.png'),href:"https://www.tmall.com/?from=m"}
    ],
    [
      {url: require( 'images/58daojia490.png'),href:"http://m.58.com"},
      {url: require( 'images/ganjiwang490.png'),href:"http://3g.ganji.com"},
      {url: require( 'images/baidunuomi490.png'),href:"http://m.nuomi.com"},
      {url: require( 'images/benlai490.png'),href:"https://m.benlai.com"},
      {url: require( 'images/ikea490.png'),href:"http://m.ikea.com/cn/zh/?offlineCache=16979"},
      {url: require( 'images/xianyu490.png'),href:"http://m.sankuaijiu.com"},
      {url: require( 'images/douguomeishi490.png'),href:"http://m.douguo.com"},
      {url: require( 'images/helijia490.png'),href:"http://m.helijia.com"},
      {url: require( 'images/caishichang490.png'),href:"http://www.zgwlcsc.com/wap"},
      {url: require( 'images/tiantianguoyuan490.png'),href:"http://m.fruitday.com"},
      {url: require( 'images/enjoy490.png'),href:"http://enjoy.ricebook.com"},
      {url: require( 'images/chengmi490.png'),href:"http://www.chengmi.com"}
    ]],
  "tab1":[
    [
      {url: require( 'images/maoyandianying490.png'),href:"http://m.maoyan.com"},
      {url: require( 'images/taopiaopiao490.png'),href:"http://h5.m.taobao.com/app/movie/pages/index/index.html"},
      {url: require( 'images/gewala490.png'),href:"http://m.gewara.com"},
      {url: require( 'images/migushipin490.png'),href:"http://m.miguvideo.com"},
      {url: require( 'images/shiguangwang490.png'),href:"http://m.mtime.cn"},
      {url: require( 'images/wandadianying490.png'),href:"http://m.wandafilm.com"},
      {url: require( 'images/damaiwang490.png'),href:"http://m.damai.cn"},
      {url: require( 'images/doubandianying490.png'),href:"https://movie.douban.com"},
      {url: require( 'images/maizuo490.png'),href:"http://m.maizuo.com"},
      {url: require( 'images/weipiao490.png'),href:"http://m.wepiao.com"},
      {url: require( 'images/cgv490.png'),href:"http://m.cgv.com.cn"},
      {url: require( 'images/1905dianyingwang490.png'),href:"http://www.1905.com"}
    ],
    [
      {url: require( 'images/fenghuangwang490.png'),href:"http://i.ifeng.com"},
      {url: require( 'images/jinritoutiao490.png'),href:"http://m.toutiao.com"},
      {url: require( 'images/wangyi490.png'),href:"http://3g.163.com"},
      {url: require( 'images/tengxunwang490.png'),href:"http://info.3g.qq.com"},
      {url: require( 'images/weilaiwang490.png'),href:"http://m.k618.cn"},
      {url: require( 'images/beijingshijian490.png'),href:"http://m.btime.com"},
      {url: require( 'images/souhushipin490.png'),href:"http://m.sohu.com/news"},
      {url: require( 'images/tiantiankuaibao490.png'),href:"http://kb.qq.com"},
      {url: require( 'images/jiemian490.png'),href:"http://m.jiemian.com"},
      {url: require( 'images/fenghuangshipin490.png'),href:"http://v.ifeng.com/m"},
      {url: require( 'images/zaker490.png'),href:"http://www.zaker.cn"},
      {url: require( 'images/pengpai490.png'),href:"http://m.thepaper.cn"}
    ],
    [
      {url: require( 'images/momo490.png'),href:"http://immomo.com"},
      {url: require( 'images/zhihu490.png'),href:"https://www.zhihu.com"},
      {url: require( 'images/weibo490.png'),href:"http://m.weibo.cn"},
      {url: require( 'images/douban490.png'),href:"https://m.douban.com"},
      {url: require( 'images/shijijiayuan490.png'),href:"http://m.jiayuan.com"},
      {url: require( 'images/baihe490.png'),href:"http://wap.baihe.com"},
      {url: require( 'images/wukongtv490.png'),href:"http://m.5kong.tv"},
      {url: require( 'images/huajiaozhibo.png'),href:"http://www.huajiao.com"}
    ],
    [
      {url: require( 'images/xiecheng490.png'),href:"http://m.ctrip.com"},
      {url: require( 'images/qunao490.png'),href:"http://touch.qunar.com"},
      {url: require( 'images/tuniu490.png'),href:"http://m.tuniu.com"},
      {url: require( 'images/tongcheng490.png'),href:"http://m.ly.com"},
      {url: require( 'images/yilong490.png'),href:"http://m.elong.com"},
      {url: require( 'images/alilvxing490.png'),href:"https://h5.m.taobao.com/trip/home/index.html"},
      {url: require( 'images/mafengwo490.png'),href:"https://m.mafengwo.cn"},
      {url: require( 'images/qiongyou490.png'),href:"http://m.qyer.com/z"},
      {url: require( 'images/aoyouwang490.png'),href:"http://m.aoyou.com"},
      {url: require( 'images/liurenxing490.png'),href:"http://m.ifindu.cn"},
      {url: require( 'images/mianbaolvxing490.png'),href:"http://web.breadtrip.com"},
      {url: require( 'images/lvmama490.png'),href:"http://m.lvmama.com"}
    ]
  ],
  "tab2":[
    [
      {url: require( 'images/xiamiyinyue490.png'),href:"http://h.xiami.com/index.html"},
      {url: require( 'images/kugouyinyue490.png'),href:"http://m.kugou.com"},
      {url: require( 'images/ximalaya490.png'),href:"http://m.ximalaya.com"},
      {url: require( 'images/lanrentingshu490.png'),href:"http://m.lrts.me"},
      {url: require( 'images/qingtingfm.png'),href:"http://m.qingting.fm"},
      {url: require( 'images/wangyiyunyinyue490.png'),href:"http://music.163.com/m/playlist?id=7288480"},
      {url: require( 'images/baiduyinyue490.png'),href:"http://music.baidu.com/home"},
      {url: require( 'images/lizhifm.png'),href:"http://m.lizhi.fm"},
      {url: require( 'images/qqyinyue490.png'),href:"http://m.y.qq.com"},
      {url: require( 'images/kuwoyinyue490.png'),href:"http://m.kuwo.cn"},
      {url: require( 'images/duomiyinyue490.png'),href:"http://wap.duomi.com"},
      {url: require( 'images/kaolafm490.png'),href:"http://m.kaolafm.com"}
    ],
    [
      {url: require( 'images/shuqixiaoshu490.png'),href:"http://shuqi.com"},
      {url: require( 'images/zhangyue.png'),href:"http://m.ireader.com"},
      {url: require( 'images/duokanyuedu490.png'),href:"http://www.duokan.com/m"},
      {url: require( 'images/miguyuedu490.png'),href:"http://wap.cmread.com/r"},
      {url: require( 'images/zhuishushenqi490.png'),href:"http://m.zhuishushenqi.com"},
      {url: require( 'images/kuaikanmanhua490.png'),href:"http://m.kuaikanmanhua.com"},
      {url: require( 'images/qidian490.png'),href:"http://m.qidian.com"},
      {url: require( 'images/kuaidu490.png'),href:"http://m.kuaidu.com.cn"},
      {url: require( 'images/xiongmaokanshu490.png'),href:"http://xm.91.com"},
      {url: require( 'images/tianyiyuedu490.png'),href:"http://wap.tyread.com"},
      {url: require( 'images/taduwenxue490.png'),href:"http://wap.tadu.com"}
    ],
    [
      {url: require( 'images/zhonghuawannianli490.png'),href:"http://rili.zhwnl.cn/m/index.html"},
      {url: require( 'images/mojitianqi490.png'),href:"http://m.moji.com"},
      {url: require( 'images/wifiwannengyaoshi490.png'),href:"https://www.wifi.com"},
      {url: require( 'images/qichezhijia490.png'),href:"http://m.autohome.com.cn"},
      {url: require( 'images/baiduyun490.png'),href:"http://yun.baidu.com/wap/welcome"},
      {url: require( 'images/360yunpan490.png'),href:"http://yunpan.360.cn"},
      {url: require( 'images/quanminkge490.png'),href:"http://kg.qq.com/index.html"},
      {url: require( 'images/chedaojiayou490.png'),href:"http://www.51autogo.com/indexWap.html"},
      {url: require( 'images/zuoyebang490.png'),href:"http://www.zybang.com"},
      {url: require( 'images/shoubashouqichepeilian490.png'),href:"http://m.shoubashou.net/wap"},
      {url: require( 'images/yiqizuoye490.png'),href:"http://www.17zuoye.com/signup/mobile/index.vpage"}
    ]
  ]
};

var a = {url: require( '         images/baiduwaimai490.png  '),href  :"http://waimai.baidu.com/mobile/waimai"};
var b = {url: require( ' images/baiduwaimai490.png  '),href:"http://waimai.baidu.com/mobile/waimai"};

let appData = [
  [
    [
      {url: require( 'images/baiduwaimai490.png'),href:"http://waimai.baidu.com/mobile/waimai"},
      {url: require( 'images/meituanwaimai490.png'),href:"http://i.waimai.meituan.com"},
      {url: require( 'images/dazhongdp490.png'),href:"http://m.dianping.com"},
      {url: require( 'images/kendeji490.png'),href:"http://m.4008823823.com.cn/kfcmwos/index.htm"},
      {url: require( 'images/maidanglao490.png'),href:"https://www.4008-517-517.cn/m/cn/jsp-mobile/sys/userLogin.jsp"},
      {url: require( 'images/elema490.png'),href:"https://m.ele.me/home"},
      {url: require( 'images/bishengke490.png'),href:"http://m.4008123123.com/PHHSMWOS/index.htm"},
      {url: require( 'images/jiyejia490.png'),href:"http://ne.4008-197-197.com/mobile/theme/dbjyj/home"},
      {url: require( 'images/xingbake490.png'),href:"https://www.starbucks.com.cn"},
      {url: require( 'images/aixianfeng490.png'),href:"http://m.beequick.cn"},
      {url: require( 'images/dameile490.png'),href:"http://m.dominos.com.cn"},
      {url: require( 'images/budingwaimai490.png'),href:"http://www.buding.cn/i_takeout.html"}
    ],
    [
      {url: require( 'images/edaijia490.png'),href:"http://h5.edaijia.cn/app/index.html"},
      {url: require( 'images/dididache490.png'),href:"http://webapp.diditaxi.com.cn"},
      {url: require( 'images/uber490.png'),href:"https://partners.uber.com.cn/ob/signup"},
      {url: require( 'images/shenzhouzhuanche490.png'),href:"http://m.10101111.com"},
      {url: require( 'images/weizhangchaxun490.png'),href:"http://m.weizhang8.cn"},
      {url: require( 'images/aibanggongjiao490.png'),href:"http://gj.aibang.com"},
      {url: require( 'images/yidaoyongche490.png'),href:"http://3g.yongche.com/touch"},
      {url: require( 'images/tieyouwang490.png'),href:"http://m.tieyou.com"},
      {url: require( 'images/youyouzuche.png'),href:"http://m.uucars.com"},
      {url: require( 'images/hangbanguanjia490.png'),href:"http://www.133.cn"},
      {url: require( 'images/changtuqichepiao490.png'),href:"http://m.changtu.com"},
      {url: require( 'images/feichangzhun490.png'),href:"http://m.veryzhun.com"}
    ],
    [
      {url: require( 'images/suningyigou490.png'),href:"http://m.suning.com"},
      {url: require( 'images/weipinhui490.png'),href:"http://m.vip.com"},
      {url: require( 'images/mogujie490.png'),href:"http://m.mogujie.com"},
      {url: require( 'images/zhe800490.png'),href:"http://m.zhe800.com"},
      {url: require( 'images/yamaxun490.png'),href:"https://www.amazon.cn"},
      {url: require( 'images/meiriyouxian490.png'),href:"https://www.missfresh.cn"},
      {url: require( 'images/meilishuo490.png'),href:"http://m.meilishuo.com"},
      {url: require( 'images/jumeiyoupin490.png'),href:"http://m.jumei.com"},
      {url: require( 'images/dangdang490.png'),href:"http://m.dangdang.com"},
      {url: require( 'images/jingdong490.png'),href:"http://m.jd.com"},
      {url: require( 'images/taobao490.png'),href:"https://m.taobao.com/#index"},
      {url: require( 'images/tianmao490.png'),href:"https://www.tmall.com/?from=m"}
    ],
    [
      {url: require( 'images/58daojia490.png'),href:"http://m.58.com"},
      {url: require( 'images/ganjiwang490.png'),href:"http://3g.ganji.com"},
      {url: require( 'images/baidunuomi490.png'),href:"http://m.nuomi.com"},
      {url: require( 'images/benlai490.png'),href:"https://m.benlai.com"},
      {url: require( 'images/ikea490.png'),href:"http://m.ikea.com/cn/zh/?offlineCache=16979"},
      {url: require( 'images/xianyu490.png'),href:"http://m.sankuaijiu.com"},
      {url: require( 'images/douguomeishi490.png'),href:"http://m.douguo.com"},
      {url: require( 'images/helijia490.png'),href:"http://m.helijia.com"},
      {url: require( 'images/caishichang490.png'),href:"http://www.zgwlcsc.com/wap"},
      {url: require( 'images/tiantianguoyuan490.png'),href:"http://m.fruitday.com"},
      {url: require( 'images/enjoy490.png'),href:"http://enjoy.ricebook.com"},
      {url: require( 'images/chengmi490.png'),href:"http://www.chengmi.com"}
    ]
  ],
  [
    [
      {url: require( 'images/maoyandianying490.png'),href:"http://m.maoyan.com"},
      {url: require( 'images/taopiaopiao490.png'),href:"http://h5.m.taobao.com/app/movie/pages/index/index.html"},
      {url: require( 'images/gewala490.png'),href:"http://m.gewara.com"},
      {url: require( 'images/migushipin490.png'),href:"http://m.miguvideo.com"},
      {url: require( 'images/shiguangwang490.png'),href:"http://m.mtime.cn"},
      {url: require( 'images/wandadianying490.png'),href:"http://m.wandafilm.com"},
      {url: require( 'images/damaiwang490.png'),href:"http://m.damai.cn"},
      {url: require( 'images/doubandianying490.png'),href:"https://movie.douban.com"},
      {url: require( 'images/maizuo490.png'),href:"http://m.maizuo.com"},
      {url: require( 'images/weipiao490.png'),href:"http://m.wepiao.com"},
      {url: require( 'images/cgv490.png'),href:"http://m.cgv.com.cn"},
      {url: require( 'images/1905dianyingwang490.png'),href:"http://www.1905.com"}
    ],
    [
      {url: require( 'images/fenghuangwang490.png'),href:"http://i.ifeng.com"},
      {url: require( 'images/jinritoutiao490.png'),href:"http://m.toutiao.com"},
      {url: require( 'images/wangyi490.png'),href:"http://3g.163.com"},
      {url: require( 'images/tengxunwang490.png'),href:"http://info.3g.qq.com"},
      {url: require( 'images/weilaiwang490.png'),href:"http://m.k618.cn"},
      {url: require( 'images/beijingshijian490.png'),href:"http://m.btime.com"},
      {url: require( 'images/souhushipin490.png'),href:"http://m.sohu.com/news"},
      {url: require( 'images/tiantiankuaibao490.png'),href:"http://kb.qq.com"},
      {url: require( 'images/jiemian490.png'),href:"http://m.jiemian.com"},
      {url: require( 'images/fenghuangshipin490.png'),href:"http://v.ifeng.com/m"},
      {url: require( 'images/zaker490.png'),href:"http://www.zaker.cn"},
      {url: require( 'images/pengpai490.png'),href:"http://m.thepaper.cn"}
    ],
    [
      {url: require( 'images/momo490.png'),href:"http://immomo.com"},
      {url: require( 'images/zhihu490.png'),href:"https://www.zhihu.com"},
      {url: require( 'images/weibo490.png'),href:"http://m.weibo.cn"},
      {url: require( 'images/douban490.png'),href:"https://m.douban.com"},
      {url: require( 'images/shijijiayuan490.png'),href:"http://m.jiayuan.com"},
      {url: require( 'images/baihe490.png'),href:"http://wap.baihe.com"},
      {url: require( 'images/wukongtv490.png'),href:"http://m.5kong.tv"},
      {url: require( 'images/huajiaozhibo.png'),href:"http://www.huajiao.com"}
    ],
    [
      {url: require( 'images/xiecheng490.png'),href:"http://m.ctrip.com"},
      {url: require( 'images/qunao490.png'),href:"http://touch.qunar.com"},
      {url: require( 'images/tuniu490.png'),href:"http://m.tuniu.com"},
      {url: require( 'images/tongcheng490.png'),href:"http://m.ly.com"},
      {url: require( 'images/yilong490.png'),href:"http://m.elong.com"},
      {url: require( 'images/alilvxing490.png'),href:"https://h5.m.taobao.com/trip/home/index.html"},
      {url: require( 'images/mafengwo490.png'),href:"https://m.mafengwo.cn"},
      {url: require( 'images/qiongyou490.png'),href:"http://m.qyer.com/z"},
      {url: require( 'images/aoyouwang490.png'),href:"http://m.aoyou.com"},
      {url: require( 'images/liurenxing490.png'),href:"http://m.ifindu.cn"},
      {url: require( 'images/mianbaolvxing490.png'),href:"http://web.breadtrip.com"},
      {url: require( 'images/lvmama490.png'),href:"http://m.lvmama.com"}
    ]
  ],
  [
    [
      {url: require( 'images/xiamiyinyue490.png'),href:"http://h.xiami.com/index.html"},
      {url: require( 'images/kugouyinyue490.png'),href:"http://m.kugou.com"},
      {url: require( 'images/ximalaya490.png'),href:"http://m.ximalaya.com"},
      {url: require( 'images/lanrentingshu490.png'),href:"http://m.lrts.me"},
      {url: require( 'images/qingtingfm.png'),href:"http://m.qingting.fm"},
      {url: require( 'images/wangyiyunyinyue490.png'),href:"http://music.163.com/m/playlist?id=7288480"},
      {url: require( 'images/baiduyinyue490.png'),href:"http://music.baidu.com/home"},
      {url: require( 'images/lizhifm.png'),href:"http://m.lizhi.fm"},
      {url: require( 'images/qqyinyue490.png'),href:"http://m.y.qq.com"},
      {url: require( 'images/kuwoyinyue490.png'),href:"http://m.kuwo.cn"},
      {url: require( 'images/duomiyinyue490.png'),href:"http://wap.duomi.com"},
      {url: require( 'images/kaolafm490.png'),href:"http://m.kaolafm.com"}
    ],
    [
      {url: require( 'images/shuqixiaoshu490.png'),href:"http://shuqi.com"},
      {url: require( 'images/zhangyue.png'),href:"http://m.ireader.com"},
      {url: require( 'images/duokanyuedu490.png'),href:"http://www.duokan.com/m"},
      {url: require( 'images/miguyuedu490.png'),href:"http://wap.cmread.com/r"},
      {url: require( 'images/zhuishushenqi490.png'),href:"http://m.zhuishushenqi.com"},
      {url: require( 'images/kuaikanmanhua490.png'),href:"http://m.kuaikanmanhua.com"},
      {url: require( 'images/qidian490.png'),href:"http://m.qidian.com"},
      {url: require( 'images/kuaidu490.png'),href:"http://m.kuaidu.com.cn"},
      {url: require( 'images/xiongmaokanshu490.png'),href:"http://xm.91.com"},
      {url: require( 'images/tianyiyuedu490.png'),href:"http://wap.tyread.com"},
      {url: require( 'images/taduwenxue490.png'),href:"http://wap.tadu.com"}
    ],
    [
      {url: require( 'images/zhonghuawannianli490.png'),href:"http://rili.zhwnl.cn/m/index.html"},
      {url: require( 'images/mojitianqi490.png'),href:"http://m.moji.com"},
      {url: require( 'images/wifiwannengyaoshi490.png'),href:"https://www.wifi.com"},
      {url: require( 'images/qichezhijia490.png'),href:"http://m.autohome.com.cn"},
      {url: require( 'images/baiduyun490.png'),href:"http://yun.baidu.com/wap/welcome"},
      {url: require( 'images/360yunpan490.png'),href:"http://yunpan.360.cn"},
      {url: require( 'images/quanminkge490.png'),href:"http://kg.qq.com/index.html"},
      {url: require( 'images/chedaojiayou490.png'),href:"http://www.51autogo.com/indexWap.html"},
      {url: require( 'images/zuoyebang490.png'),href:"http://www.zybang.com"},
      {url: require( 'images/shoubashouqichepeilian490.png'),href:"http://m.shoubashou.net/wap"},
      {url: require( 'images/yiqizuoye490.png'),href:"http://www.17zuoye.com/signup/mobile/index.vpage"}
    ]
  ]
];
global.storage = storage;

// 计算每个image的大小,高宽和图等比例!
let WIDTH = Dimensions.get('window').width;
let HEIGHT = Dimensions.get('window').height;
var baseHeight = Platform.OS === 'ios' ?  0 : 10;  // 手机自带导航栏的高度, ios为0, 安卓暂时不确定
let scrollHeight = HEIGHT - 45 - baseHeight;   // scrollView 的高度(-顶部导航)

let webViewH = WIDTH / 980 * 273;
let tabWidth ;
function imgLayout(num =2, margin = 4) { // margin 为元素之间的边距
  tabWidth = (WIDTH-margin * (num - 1))/num;
}
imgLayout();
let tabHeight = tabWidth / 490 * 245;
let tabHeights = ( tabHeight + 4 ) * 4 +48;

export default class Main extends Component {
  constructor(props) {
    super(props);

    let dates = new Date();
    let year = dates.getFullYear();
    let month = dates.getMonth();
    let date = dates.getDate();
    this.state = {
      date: {  // bdhd,  calendar
        year: year,
        month: month,
        date: date,
        day: dates.getDay()
      },
      fadeAnim: new Animated.Value(0),
      isToTop: false,
    isRefreshing: true,
      dataTabs: '',      //所有tab页数据
      dataTabOrders: '', //所有tab页数据的相关顺序
      lottery: '',
    };

    this.deviceLayout={
      imgLayout: {
        width: tabWidth,
        height: tabHeight,
        marginBottom: 4,
      },
      baseHeight: baseHeight,
      WIDTH: WIDTH,
      HEIGHT: HEIGHT,
    };

    // 获得tab页的数据
    storage.load({
      key: 'dataTabs',
      autoSync: true,
      syncInBackground: true
    }).then(ret => {
      this.setState({
        dataTabs: ret
      });
    }).catch(err => {
      console.info(err, '拿不到相关数据');
    });

    // 获得tab页的相关顺序
    storage.load({
      key: 'dataTabOrders',
      //autoSync: true,
      //syncInBackground: true
    }).then(ret => {
      //console.log(ret,'dataTabOrders');
      this.setState({
        dataTabOrders: ret
      });
    }).catch(err => {
      console.info(err, '错误');
    });

    this.navigator = this.props.navigator;
  }

  static propTypes = {
    navigator: React.PropTypes.object.isRequired
  };

  url = 'http://m.k618.cn/dhy_news/';  //新闻页面的地址

  async _loadInitialState() {
    try {
      //await AsyncStorage.setItem('天气', selectedValue);
      //var value = await AsyncStorage.getItem(STORAGE_KEY);
      //if (value !== null){
      //  this.setState({selectedValue: value});
      //  this._appendMessage('Recovered selection from disk: ' + value);
      //} else {
      //  this._appendMessage('Initialized with no selection on disk.');
      //}
    } catch (error) {
      //this._appendMessage('AsyncStorage error: ' + error.message);
    }
  }

  componentDidMount() {
    // 加载数据-刷新 -- 双色球, 天气, pm, 重新获取!(or 页面重新渲染)
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 1800);

    this.state.isToTop && Animated.timing(       // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {
        toValue: 1,        // Target
        duration: 400,    // Configuration
      }
    ).start();
  }

  _setType(id) {
    this.setState({
      activeBtn: id
    });
  }

  _onScroll(e) {
    // 页面偏卡,
    //clearTimeout(this.scrollId);
    //let offsetY = Math.abs(e.nativeEvent.contentOffset.y);
    //this.scrollId = setTimeout( () => {
    //  this.setState({
    //    isToTop: offsetY > 300,
    //  });
    //}, 300);

    let offsetY = Math.abs(e.nativeEvent.contentOffset.y);
    this.setState({
      isToTop: offsetY > 300,
    });

  }

  onJumpCalendar() {
    console.log('calendar');
    let navigator = this.navigator;
    if(navigator) {
      navigator.push({
        name: 'Calendar',
        component: Calendar,
        params: {
          date: this.state.date,
        }
      })
    }
  }

  onJumpWeatherPage(data) {
    console.log('calendar');
    let navigator = this.navigator;
    if(navigator) {
      navigator.push({
        name: 'WeatherPage',
        component: WeatherPage,
        params: {
          data,
          scrollHeight,
        }
      })
    }
  }
  _onJump(url) {// 跳转到url
    // 新开一个 webview...
    let navigator = this.navigator;
    if(navigator) {
      navigator.push({
        name: 'webView',
        component: WebViewCom,
        params: {
          url: url,
        }
      })
    }
  }

  _onSearchBaiDu(val) {
    this._onJump( 'http://www.baidu.com/s?wd=' + val );
  }

  _onSearchDelivery(val) {
    // 检测数据类型为 number --
    this._onJump( 'http://m.kuaidi100.com/index_all.html?type=' + this.state.activeBtn + '&postid='+ val );
  }

  _onRefresh() {
    this.setState({isRefreshing: true});

    // 加载相关数据 : 天气,广告, 新闻!
    setTimeout(() => {
      this.setState({
        isRefreshing: false
      });
    }, 2000);
  }

  _onNavigationStateChange(nav) {
    let url = nav.url;
    if(nav.navigationType && url !== this.url && this.navigator) {
      this.navigator.push({
        name: 'webView',
        component: WebViewCom,
        params: {
          url: url,
          WebViewNews: this.WebViewNews
        }
      })
    }
  }

  render() {
    //console.log('render');
    let dataTabs = this.state.dataTabs;
    let dataTabOrders = this.state.dataTabOrders;
    let isGetData = dataTabs !== '' && dataTabOrders !== '';
    //console.log(dataTabs, dataTabOrders, 'dataTabs, dataTabOrders')
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
            activeOpacity={.8}
            onPress={() => console.log('press')}
            underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <Image
              source={require('./img/icon_user.png')}
              style={styles.user}
            />
          </TouchableHighlight>
          <Image
            source={require('./img/logo.jpg')}
            style={styles.logo}
          >
          </Image>
          <Image
            source={require('./img/icon_info.png')}
            style={styles.info}
          >
          </Image>
        </View>
        <ScrollView
          ref={(scrollView) => { this._scrollView = scrollView; }}
          style={[styles.scrollView, { height: scrollHeight}]}
          alwaysBounceHorizontal={false}
          keyboardShouldPersistTaps={false}
          keyboardDismissMode='on-drag'
          scrollEventThrottle={200}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#f00"
              title="Loading..."
              titleColor="#8f8f8f"
            />
          }
          onMomentumScrollEnd={this._onScroll.bind(this)}
        >
          <BdHd onJump={this._onJump.bind(this)}
                date={this.state.date}
                onJumpCalendar={this.onJumpCalendar.bind(this)}
                onJumpWeatherPage={this.onJumpWeatherPage.bind(this)}
                height={HEIGHT}
                width={WIDTH}
          />
          <Ad style={{marginTop: 12,marginBottom: 12,}}/>
          <View style={styles.searchBaiDu}>
            <SearchComponent placeholder="输入关键词..." onSearch={this._onSearchBaiDu.bind(this)}/>
          </View>
          {
            //isGetData && <ViewPager
            //  style={styles.viewpager}
            //  navigator={this.navigator}
            //  onJump={this._onJump.bind(this)}
            //  data={dataTabs[0]}
            //  order={dataTabOrders[0]}
            //  index={0}
            //  key={'tab' + 0}
            //  deviceLayout={this.deviceLayout}
            ///>
          }
          <View style={styles.tabCon}>
            { // 第一个轮播图,解决拿数据的过程中,后面的先渲染出来,然后页面闪动渲染数据
              // 保存在state, 加载好了之后, state数据 -- 渲染
              isGetData && <Tab
                  style={styles.viewpager}
                  navigator={this.navigator}
                  onJump={this._onJump.bind(this)}
                  data={dataTabs[0]}
                  order={dataTabOrders[0]}
                  index={0}
                  key={'tab' + 0}
                  deviceLayout={this.deviceLayout}
                />
            }
          </View>

          {  // 轮播图
            isGetData && dataTabs.map((dataTab, i) => {
              if( !i ) {
                return <WebView
                  key={'webView' + i}
                  ref={(webView) => this.WebViewNews = webView}
                  style={{flex:1, height: webViewH,}}
                  onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                  bounces={false}
                  scrollEnabled={false}
                  source={{uri: this.url}}
                  scalesPageToFit={true}
                />
              }
              return (
                <Tab
                  style={styles.viewpager}
                  navigator={this.navigator}
                  onJump={this._onJump.bind(this)}
                  data={dataTab}
                  order={dataTabOrders[i]}
                  index={i}
                  key={'tab' + i}
                  deviceLayout={this.deviceLayout}
                />
              )})
          }
          {
            // 快递页面
          }
          <View style={styles.indicator}>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => console.log('press')}
              underlayColor="rgba(255, 255, 255, 0.6)"
              style={{
                width: 60,
                marginLeft: 16,
                paddingTop: 6,
                paddingBottom: 6,
                borderWidth: 1,
                borderColor: '#ededed',
                borderRadius: 4,
             }}
            >
              <Text style={{fontSize: 18, color: '#ff5248', textAlign: 'center'}}>
                快递
              </Text>
            </TouchableHighlight>
          </View>
          <DeliveryBtnCon onSearch={this._onJump.bind(this)} />
          <Ad />
          <BdBtm />
        </ScrollView>
        {
          // 向上滚动~~~
          this.state.isToTop && <TouchableOpacity
            style={[styles.goTop, {opacity: this.state.fadeAnim,}]}
            onPress={() => {
              this._scrollView.scrollTo({x: 0,y: 0, animated: true});
              this.setState({
                isToTop: false
              });
            }}
          >
            <Image
              source={require('./img/icon_top.png')}
              style={styles.goTopImg}
            >
            </Image>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  header: {
    //flex: 1,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff5248'
  },
  user: {
    width: 24,
    height: 24,
    marginLeft: 10
  },
  logo: {
    width: 75,
    height: 34
  },
  info: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  scrollView: {
    flex:1,
    backgroundColor: '#fff',
  },
  searchBaiDu: {
    borderTopColor: '#d8d8d8',
    borderTopWidth: 1,
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 1,
  },
  tabCon: {
    height: tabHeights,
  },
  indicator: {
    //height: 48,
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryBtns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 15,
    marginBottom: 15,
  },
  goTop: {
    position: 'absolute',
    bottom: 40,
    right: 40,
  },
  goTopImg: {
    width: 48,
    height: 48,
  },
});
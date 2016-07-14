/**
 * Created by sunzhimin on 16/6/17.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Platform,
  TouchableHighlight,
  Dimensions,
  AsyncStorage,
  Picker,
  Image,
  Modal,
  Text,
  View
} from 'react-native';

const Item = Picker.Item;
let isIos = Platform.OS === 'ios';

let {width, height} = Dimensions.get('window');
let cityArr = ['北京', '天津', '上海', '重庆', '石家庄', '郑州', '武汉', '长沙', '南京', '南昌', '沈阳', '长春', '哈尔滨', '西安', '太原', '济南', '成都', '西宁', '合肥', '海口', '广州', '贵阳', '杭州', '福州', '台北', '兰州', '昆明', '拉萨', '银川', '南宁', '乌鲁木齐', '呼和浩特', '香港', '澳门' ];
class CityPick extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: this.props.city
    }
  }

  render() {
    return (
      <Picker
        selectedValue={this.state.city}
        style={[styles.picker, this.props.style]}
        enabled={true}
        //mode='dropdown'
        prompt="请选择城市:"
        onValueChange={(city) => {
          this.props.onCityChange(city);
          this.setState({city: city});
        }}
      >
        { cityArr.map( (city) => <Item label={city} value={city} key={city} /> ) }
      </Picker>
    )
  }
}

class Ball extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redBall: '',
      blueBall: ''
    };

    fetch('http://f.apiplus.cn/ssq-1.json', {
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(json => {
      if(json && json.data){
        let data = json.data[0];
        let str = data.opencode;
        let arr = str.split('+');
        let redBall = arr[0].split(',');
        let blueBall = arr[1];
        this.setState({
          redBall: redBall,
          blueBall: blueBall,
        });
      }
    }).catch(err => {
      console.warn(err);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.blueBall !== nextState.blueBall || this.state.redBall !== nextState.redBall;
  }

  render() {
    let redBall = this.state.redBall;
    let blueBall = this.state.blueBall;
    return(
      <View style={styles.ball}>
        {
          redBall !== '' && redBall.map((number, i) => (
            <Image
              style={styles.ballImg}
              source={require('./img/redball.png')}
              key={'redBall' + i}
            >
              <Text style={styles.ballText} numberOfLines={1}> {number}</Text>
            </Image>
          ))
        }
        {
          blueBall !== '' && <Image
            style={styles.ballImg}
            source={require('./img/blueball.png')}
            key={'blueBall'}
          >
            <Text style={[styles.ballText, styles.ballText]} numberOfLines={1}> {blueBall}</Text>
          </Image>
        }
      </View>
    );
  }
}

export default class Mess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '北京',
      showPick: false,
      weatherPic: '',
      weather: '',
      showLimitNum: true,
    };
  }

  componentWillMount() {
    this.fetchWeather(this.state.city);
  }

  data = {
    "HeWeather data service 3.0": [
      {
        "aqi": {
          "city": {
            "aqi": "29",
            "co": "1",
            "no2": "32",
            "o3": "51",
            "pm10": "21",
            "pm25": "29",
            "qlty": "优",
            "so2": "3"
          }
        },
        "basic": {
          "city": "北京",
          "cnty": "中国",
          "id": "CN101010100",
          "lat": "39.904000",
          "lon": "116.391000",
          "update": {
            "loc": "2016-07-13 09:51",
            "utc": "2016-07-13 01:51"
          }
        },
        "daily_forecast": [
          {
            "astro": {
              "sr": "04:57",
              "ss": "19:43"
            },
            "cond": {
              "code_d": "100",
              "code_n": "101",
              "txt_d": "晴",
              "txt_n": "多云"
            },
            "date": "2016-07-13",
            "hum": "23",
            "pcpn": "0.0",
            "pop": "0",
            "pres": "1004",
            "tmp": {
              "max": "35",
              "min": "23"
            },
            "vis": "10",
            "wind": {
              "deg": "85",
              "dir": "无持续风向",
              "sc": "微风",
              "spd": "10"
            }
          },
          {
            "astro": {
              "sr": "04:58",
              "ss": "19:42"
            },
            "cond": {
              "code_d": "300",
              "code_n": "104",
              "txt_d": "阵雨",
              "txt_n": "阴"
            },
            "date": "2016-07-14",
            "hum": "27",
            "pcpn": "0.1",
            "pop": "43",
            "pres": "1006",
            "tmp": {
              "max": "33",
              "min": "23"
            },
            "vis": "10",
            "wind": {
              "deg": "210",
              "dir": "无持续风向",
              "sc": "微风",
              "spd": "1"
            }
          },
          {
            "astro": {
              "sr": "04:58",
              "ss": "19:42"
            },
            "cond": {
              "code_d": "104",
              "code_n": "104",
              "txt_d": "阴",
              "txt_n": "阴"
            },
            "date": "2016-07-15",
            "hum": "28",
            "pcpn": "1.2",
            "pop": "78",
            "pres": "1003",
            "tmp": {
              "max": "32",
              "min": "22"
            },
            "vis": "10",
            "wind": {
              "deg": "74",
              "dir": "无持续风向",
              "sc": "微风",
              "spd": "5"
            }
          },
          {
            "astro": {
              "sr": "04:59",
              "ss": "19:41"
            },
            "cond": {
              "code_d": "302",
              "code_n": "302",
              "txt_d": "雷阵雨",
              "txt_n": "雷阵雨"
            },
            "date": "2016-07-16",
            "hum": "26",
            "pcpn": "0.0",
            "pop": "19",
            "pres": "1001",
            "tmp": {
              "max": "30",
              "min": "22"
            },
            "vis": "10",
            "wind": {
              "deg": "161",
              "dir": "无持续风向",
              "sc": "微风",
              "spd": "7"
            }
          },
          {
            "astro": {
              "sr": "05:00",
              "ss": "19:40"
            },
            "cond": {
              "code_d": "302",
              "code_n": "101",
              "txt_d": "雷阵雨",
              "txt_n": "多云"
            },
            "date": "2016-07-17",
            "hum": "33",
            "pcpn": "0.1",
            "pop": "48",
            "pres": "1004",
            "tmp": {
              "max": "28",
              "min": "21"
            },
            "vis": "10",
            "wind": {
              "deg": "219",
              "dir": "无持续风向",
              "sc": "微风",
              "spd": "4"
            }
          },
          {
            "astro": {
              "sr": "05:01",
              "ss": "19:40"
            },
            "cond": {
              "code_d": "101",
              "code_n": "104",
              "txt_d": "多云",
              "txt_n": "阴"
            },
            "date": "2016-07-18",
            "hum": "29",
            "pcpn": "0.1",
            "pop": "48",
            "pres": "1001",
            "tmp": {
              "max": "30",
              "min": "22"
            },
            "vis": "10",
            "wind": {
              "deg": "184",
              "dir": "无持续风向",
              "sc": "微风",
              "spd": "4"
            }
          },
          {
            "astro": {
              "sr": "05:01",
              "ss": "19:39"
            },
            "cond": {
              "code_d": "104",
              "code_n": "104",
              "txt_d": "阴",
              "txt_n": "阴"
            },
            "date": "2016-07-19",
            "hum": "30",
            "pcpn": "0.4",
            "pop": "46",
            "pres": "1001",
            "tmp": {
              "max": "30",
              "min": "22"
            },
            "vis": "10",
            "wind": {
              "deg": "211",
              "dir": "无持续风向",
              "sc": "微风",
              "spd": "5"
            }
          }
        ],
        "hourly_forecast": [
          {
            "date": "2016-07-13 10:00",
            "hum": "37",
            "pop": "0",
            "pres": "1005",
            "tmp": "35",
            "wind": {
              "deg": "40",
              "dir": "东北风",
              "sc": "微风",
              "spd": "5"
            }
          },
          {
            "date": "2016-07-13 13:00",
            "hum": "26",
            "pop": "0",
            "pres": "1004",
            "tmp": "39",
            "wind": {
              "deg": "73",
              "dir": "东北风",
              "sc": "微风",
              "spd": "6"
            }
          },
          {
            "date": "2016-07-13 16:00",
            "hum": "23",
            "pop": "0",
            "pres": "1003",
            "tmp": "39",
            "wind": {
              "deg": "73",
              "dir": "东北风",
              "sc": "微风",
              "spd": "5"
            }
          },
          {
            "date": "2016-07-13 19:00",
            "hum": "29",
            "pop": "0",
            "pres": "1004",
            "tmp": "37",
            "wind": {
              "deg": "212",
              "dir": "西南风",
              "sc": "微风",
              "spd": "7"
            }
          },
          {
            "date": "2016-07-13 22:00",
            "hum": "36",
            "pop": "0",
            "pres": "1005",
            "tmp": "35",
            "wind": {
              "deg": "225",
              "dir": "西南风",
              "sc": "微风",
              "spd": "10"
            }
          }
        ],
        "now": {
          "cond": {
            "code": "100",
            "txt": "晴"
          },
          "fl": "32",
          "hum": "60",
          "pcpn": "0",
          "pres": "1005",
          "tmp": "28",
          "vis": "10",
          "wind": {
            "deg": "330",
            "dir": "西南风",
            "sc": "3-4",
            "spd": "14"
          }
        },
        "status": "ok",
        "suggestion": {
          "comf": {
            "brf": "很不舒适",
            "txt": "白天天气晴好，但烈日炎炎会使您会感到很热，很不舒适。"
          },
          "cw": {
            "brf": "较适宜",
            "txt": "较适宜洗车，未来一天无雨，风力较小，擦洗一新的汽车至少能保持一天。"
          },
          "drsg": {
            "brf": "炎热",
            "txt": "天气炎热，建议着短衫、短裙、短裤、薄型T恤衫等清凉夏季服装。"
          },
          "flu": {
            "brf": "少发",
            "txt": "各项气象条件适宜，发生感冒机率较低。但请避免长期处于空调房间中，以防感冒。"
          },
          "sport": {
            "brf": "较适宜",
            "txt": "天气较好，户外运动请注意防晒。推荐您进行室内运动。"
          },
          "trav": {
            "brf": "一般",
            "txt": "天气较好，同时又有微风伴您一路同行，但是比较热，外出旅游请注意防晒，并注意防暑降温。"
          },
          "uv": {
            "brf": "强",
            "txt": "紫外线辐射强，建议涂擦SPF20左右、PA++的防晒护肤品。避免在10点至14点暴露于日光下。"
          }
        }
      }
    ]
  }

  fetchWeather(city) {
    let today = Math.ceil(new Date().getTime()/1000/60/60/24);
    this.setState({
      weather: this.data['HeWeather data service 3.0'][0]
    });

    return false;
    fetch('http://apis.baidu.com/heweather/weather/free?city=' + city || this.state.city, {
      method: 'POST',
      headers:{
        apikey:'7472b1cdcf63836e3986c69f03860508'
      }
    }).then(response => {
      return response.json();
    }).then(json => {
      let data = json['HeWeather data service 3.0'][0];
      console.log(today, city, data);
      if(json && data){
        this.setState({
          weather: data
        });
      }
    }).catch(err => {
      console.warn(err);
    });
  }

  fetchWeatherPic() {
    let weather = this.state.weather;
    let time = new Date();
    let cHours = time.getHours();
    let cMinutes = time.getMinutes();
    if(cHours > 0 && cHours < 10){
      cHours = '0' + cHours;
    }
    if( cMinutes >=0 && cMinutes<10 ){
      cMinutes='0'+cMinutes;
    }
    let currentTime = cHours + ':' + cMinutes;

    let response = require('./weatherpic.json');
    let picData = response['cond_info'];
    let {ss, sr} = weather.daily_forecast[0].astro;
    let {code_d, code_n} = weather.daily_forecast[0].cond;
    let len = picData.length;
    if ( currentTime > sr && currentTime < ss ) {
      for ( let i = 0; i < len; i++ ){
        if ( picData[i].code ===  code_d ){
          return picData[i].icon1;
        }
      }
    }
    else {
      for ( let n = 0;  n < len; n++ ){
        if ( picData[n].code ===  code_n ){
          return picData[n].icon1;
        }
      }
    }
  }

  _onCityChange(city) {
    this.fetchWeather(city);
    this.setState({
      city: city,
      showLimitNum: city === '北京'
    });
  }

  _onJumpWeatherPage() {
    console.log('_onJumpWeatherPage');
    this.props.onJumpWeatherPage(this.state.weather.daily_forecast);
  }

  weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  render() {

    let {year, month, day, date} = this.props.date;
    let weather = this.state.weather;
    let max = '', min = '';
    weather && ( {max, min} = weather.daily_forecast[0].tmp);
    let pm25 = weather && weather.aqi.city.pm25 || '';
    let weatherPic = weather && this.fetchWeatherPic();

    let currentDate = year*10000 + ( month + 1 )* 100 + date;
    let response = require('./limitNO.json');
    let limitNum;
    for ( let m = 0, len = response.length; m !== len; m++ ) {
      if ( currentDate <= response[m].id ) {
        limitNum = response[m].data;
        break;
      }
    }
    return (
      <View style={styles.hd}>
        {
          isIos && <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.showPick}
            onshow={() => {}}
          >
            <View style={[styles.bottomIos, styles.modalCity]}>
              <CityPick city={this.state.city} onCityChange={this._onCityChange.bind(this)} />
              <TouchableHighlight
                activeOpacity={.8}
                onPress={() => {
                this.setState({showPick: false});
              }}
                underlayColor="rgba(255, 255, 255, 0.6)"
                style={[styles.hdBottomItem]}
              >
                <Text style={[{paddingTop: 18, fontSize: 18, color: 'red'}]}>
                  确定
                </Text>
              </TouchableHighlight>
            </View>
          </Modal>
        }
        <View style={styles.hdLeft}>
          <TouchableHighlight
            activeOpacity={.8}
            onPress={this._onJumpWeatherPage.bind(this)}
            underlayColor="rgba(255, 255, 255, 0.6)"
          >
            <View style={styles.hdTop}>
              <Image
                source={{uri: weatherPic}}
                style={styles.weatherPic}
              />
              <Text style={styles.textLarge}>
                { max + '° ~' + min + '°' }
              </Text>
            </View>
          </TouchableHighlight>
          <View style={styles.hdMedium}>
            {
              this.state.showLimitNum && (
                <Text style={styles.textMedium}>
                  今日限行: {limitNum[day].value}
                </Text>)
            }
          </View>
          <View style={styles.hdBottom}>
            {
              isIos
                ?  <TouchableHighlight
                      activeOpacity={.8}
                      onPress={() => this.setState({showPick: true})}
                      underlayColor="rgba(255, 255, 255, 0.6)"
                      style={styles.hdBottomItem}
                    >
                      <View style={styles.cityPick}>
                        <Image
                          style={styles.cityPic}
                          source={require('./img/location1.png')}
                        >
                        </Image>
                        <Text>
                          {this.state.city}
                        </Text>
                      </View>
                    </TouchableHighlight>
                : <CityPick city={this.state.city} onCityChange={this._onCityChange.bind(this)} />
            }
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => this.props.onJump('http://3g.d1xz.net/astro/')}
              underlayColor="rgba(255, 255, 255, 0.6)"
              style={styles.hdBottomItem}
            >
              <Text>
                星座
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.hdCenter}>
          <TouchableHighlight
            activeOpacity={.8}
            onPress={() => this.props.onJumpCalendar()}
            underlayColor="rgba(255, 255, 255, 0.6)"
          >
            <View style={styles.flexColumn}>
              <View style={styles.hdTop}>
                <Text style={styles.textLarge}>
                  {( month + 1 ) + '月' + date + '日'}
                </Text>
              </View>
              <View style={styles.hdMedium}>
                <Text style={styles.textMedium}>
                  {this.weekday[day]}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.hdBottom}>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => this.props.onJump('http://m.edu.k618.cn/camp/')}
              underlayColor="rgba(255, 255, 255, 0.6)"
              style={styles.hdBottomItem}
            >
              <Text>
                图片
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => this.props.onJump('http://m.ziroom.com/')}
              underlayColor="rgba(255, 255, 255, 0.6)"
              style={styles.hdBottomItem}
            >
              <Text>
                租房
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.hdRight}>
          <TouchableHighlight
            activeOpacity={.8}
            style={styles.date}
            onPress={this._onJumpWeatherPage.bind(this)}
            //onPress={() => console.log('press')}
            underlayColor="rgba(255, 255, 255, 0.6)"
          >
            <View style={styles.flexColumn}>
              <View style={styles.hdTop}>
                <Text style={styles.textLarge}>
                  PM 2.5
                </Text>
              </View>
              <View style={styles.hdMedium}>
                <Text style={styles.textMedium}>
                  {pm25}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.hdBottom}>
            <TouchableHighlight
              activeOpacity={.8}
              onPress={() => this.props.onJump('http://m.zhcw.com/')}
              underlayColor="rgba(255, 255, 255, 0.6)"
            >
              <View>
                <Ball />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hd: {
    flex: 1,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textLarge: {
    fontSize: 16,
  },
  textMedium: {
    fontSize: 14,
  },
  flexColumn: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 72,
  },
  hdLeft: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  hdTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
  },
  hdMedium: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  hdBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderTopColor: '#ededed',
    borderTopWidth: 1,
    //borderStyle: 'dotted',
  },
  hdBottomItem: {
    padding: 10,
  },
  weatherPic: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  hdCenter: {
    flex: 1,
    flexDirection: 'column',
    borderLeftColor: '#ededed',
    borderLeftWidth: 1,
    borderRightColor: '#ededed',
    borderRightWidth: 1,
    //borderStyle: 'dotted',
  },
  ball: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 6,
    //paddingLeft: 6,
    //paddingRight: 6,
  },
  ballText: {
    color: '#fff',
    fontSize: 8,
    lineHeight: 12,
    textAlign: 'center'
  },
  ballImg: {
    width: 14,
    height: 14,
  },
  picker: {
    width: 98,
    height: 100,
  },
  modalCity: {
    width: width,
    height: height/3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,1)'
  },
  bottomIos: {
    position: 'absolute',
    bottom: 0,
  },
  cityPick: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityPic: {
    width: 12,
    height: 14,
    marginRight: 2,
  }
});

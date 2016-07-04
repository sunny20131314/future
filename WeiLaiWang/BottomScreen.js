/**
 * Created by sunzhimin on 04/07/16.
 */

'use strict';

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Dimensions,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';

var ViewPager = require('react-native-viewpager');
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;

var PAGES = [
  'Page 0',
  'Page 1',
  'Page 2',
  'Page 3',
  'Page 4',
];

function notifyMessage(msg: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    console.log(msg);
    //AlertIOS.alert(msg);
  }
}

var ImagesScreen = React.createClass({
  getInitialState: function() {
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });

    return {
      activePage: 0,
      dataSource: dataSource.cloneWithPages(PAGES),
    };
  },

  render: function() {
    return (
      <ViewPager
        style={this.props.style}
        dataSource={this.state.dataSource}
        renderPage={this._renderPage}
        renderPageIndicator={this.renderPageIndicator}
        onChangePage={this._onChangePage}
        isLoop={true}
        autoPlay={false}/>
    );
  },
  renderIndicator(i, goToPage) {
    //var isTabActive = this.props.activePage === page;
    return (
      <TouchableHighlight
        activeOpacity={.8}
        underlayColor="rgba(255, 255, 255, 0.6)"
        onPress={() => {
          if(this.state.activePage === i){
            return false;
          }
          this.setState({
            activePage: i
          });
          goToPage(i);
        }}
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
        <Text
          style={[
            {fontSize: 16, color: '#000', textAlign: 'center'},
            this.state.activePage === i &&  {color: '#ff5248'}
            ]}
        >
          {i}
        </Text>
      </TouchableHighlight>
    );
  },
  renderPageIndicator: function(props) {
    console.log(props);
    let {goToPage} = props;
    var indicators = [];
    for (let i = 0, len = PAGES.length ; i !== len; i++) {
      indicators.push(this.renderIndicator(i, goToPage));
    }
    console.log(indicators);
    return (
      <View style={styles.page}>
        {indicators}
      </View>
    )
  },
  _renderPage: function(data: Object, pageID: number | string,) {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>{data}</Text>
    </View>
  );
},

_onChangePage: function(page: number | string) {
  if(this.state.activePage === page){
    return false;
  }
  this.setState({
    activePage: page
  });
},

});

var styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

module.exports = ImagesScreen;
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Text,
} = ReactNative;

var DefaultViewPageIndicator = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activePage: React.PropTypes.number,
    pageCount: React.PropTypes.number
  },

  getInitialState() {
    return {
      viewWidth: 0,
    };
  },

  _renderIndicator(i, name) {
    let isChange = this.props.activePage !== i;
    return (
      <TouchableHighlight
        key={this.props.index + 'btn' + i }
        activeOpacity={.8}
        underlayColor="rgba(255, 255, 255, 0.6)"
        onPress={() => {
          if ( !isChange ) {
            return false;
          }
          //this.setState({
          //  activePage: i
          //});
          this.props.goToPage(page);
        }}
        style={styles.tab}
      >
        <Text style={[styles.tabText, isChange &&  {color: '#ff5248'}]} >
          {name}
        </Text>
      </TouchableHighlight>
    );
  },

  render() {
    let {pageCount} = this.props;
    let indicators = [];
    for (let i = 0; i !== pageCount; i++) {
      indicators.push(this._renderIndicator(i, this.props.title[i]));
    }
    return (
      <View
        style={styles.indicator}
      >
        {indicators}
        <TouchableHighlight
          style={styles.edit}
          onPress={() => this.props.onJumpEdit()}
          underlayColor="transparent"
        >
          <Image
            style={styles.editPic}
            source={require('../img/edit.png')}
          >
            {            //<Text style={styles.editText}>编辑</Text>
            }
          </Image>
        </TouchableHighlight>
      </View>
    )
  },
});

var styles = StyleSheet.create({
  indicator: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
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

module.exports = DefaultViewPageIndicator;

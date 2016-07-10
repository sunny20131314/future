/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 需要添加的功能:
 * 1. (√)周末 - 高亮 (√)
 * 2. 节假日
 * 3. (√)阴历的初一显示为几月
 * 4. 增加跳转到某个日期,
 * 5. (√)以及左右滑动功能  - 主
 * 5. (×)日期小于今天的 颜色变灰
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator
} from 'react-native';

import main from './pages/main.js';

export default class myDate extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }
    };

    render() {
        return (
            <Navigator
                initialRoute={{ name: 'main', component: main, params: {date: this.state.date}}}
                configureScene={() => {
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                renderScene={(route, navigator)=>{
                        let Component = route.component;
                        if(Component) {
                        return <Component {...route.params} navigator={navigator} />
                    }
                }}
            />
        );
    }
}

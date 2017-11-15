import React, { Component } from 'react';

import {
    View,
} from 'react-native'

import { NativeRouter, Route, Link } from 'react-router-native'

import HomeScreen from './home/screen';
import ImageScreen from './image/screen';

class Routers extends Component {
    render() {
        return (
            <NativeRouter>
                <View >
                    <Route exact path="/" component={HomeScreen} />
                    <Route path="/image/:id" component={ImageScreen}/>
                </View>
            </NativeRouter>
        );
    }
}
export default Routers;
import React, { Component } from 'react';
import { Provider } from "react-redux";

import configureStore from "./store";

const store = configureStore();
import Routers from './routers';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Routers />
            </Provider>
        );
    }
}


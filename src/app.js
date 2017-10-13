import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Scene } from 'react-native-router-flux';
import reducers from './reducers';
import RouterComponent from './RouterComponent';

class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducers)}>
                <RouterComponent />
            </Provider>
        );
    }
}

export default App;

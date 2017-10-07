import React, { Component } from 'react';
// import Router from './Router';

import { View } from 'react-native';
import Home from './components/Home';
import Profile from './components/Profile';
import Semester from './components/Semester';

// import Semester from './components/Semester';
// import { ClassItem } from './components/demf';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import firebase from 'firebase';
// import ReduxThunk from 'redux-thunk';
// import reducers from './reducers';

class App extends Component {
    render() {
        return (
            <Home />
        );
    }
}

export default App;

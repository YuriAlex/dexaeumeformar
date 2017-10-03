import React, { Component } from 'react';
// import Router from './Router';

import { View } from 'react-native';
import Profile from './components/Profile';
import Router from 'react-native-router-flux';

// import { ClassItem } from './components/demf';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import firebase from 'firebase';
// import ReduxThunk from 'redux-thunk';
// import reducers from './reducers';

class App extends Component {
    
    componentWillMount() {
        
    }

    

    buttonPress() {
        
    }

    // render() {
    //     return (
    //         <Router />
    //     );
    // }

    render() {
        return (
            // <Intro />
            <View>
                <Profile />
            </View>
        );
    }
}

export default App;

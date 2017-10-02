import React, { Component } from 'react';
// import Router from './Router';

import { View } from 'react-native';
import Atividades from './components/Atividades';

// import { ClassItem } from './components/demf';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import firebase from 'firebase';
// import ReduxThunk from 'redux-thunk';
// import reducers from './reducers';

class App extends Component {
    
    componentWillMount() {
        
    }

    // render() {
    //     return (
    //         <Router />
    //     );
    // }

    buttonPress() {
        
    }

    render() {
        return (
            // <Intro />
            <View>
                <Atividades />
            </View>
        );
    }
}

export default App;

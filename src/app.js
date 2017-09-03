import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Header, ClassItem, ConfirmButton } from './components';
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
        console.log('PPRESS');
    }

    renderClasses() {
        return (<ClassItem />);
    }
    
    render() {
        return (
            <View>
                <Header headerText='Primeiro Semestre' />

                <ScrollView>                    
                    {this.renderClasses()}
                </ScrollView>

                <ConfirmButton onPress={this.buttonPress.bind(this)} />
            </View>
        );
    }
}

export default App;

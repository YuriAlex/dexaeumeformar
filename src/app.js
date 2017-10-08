import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AtividadesList from './components/AtividadesList';
import reducers from './reducers';

class App extends Component {
    render() {
        return (
            <Provider store={createStore(reducers)}>
                <AtividadesList />
            </Provider>
        );
    }
}

export default App;

import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import Semester from './components/Semester';

const RouterComponent = () => {
    return (
        <Router>
                <Scene key="semestre" component={Semester} title="Semestre" />
        </Router>
    );
};

export default RouterComponent;

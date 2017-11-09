import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Header } from './components/demf';

import Intro from './components/Intro';
import Home from './components/Home';
import Profile from './components/Profile';
import Matriz from './components/Matriz';
import SemesterList from './components/SemesterList';
import Semester from './components/Semester';
import AtividadesList from './components/AtividadesList';

const RouterComponent = () => {
    return (
        <Router >
            <Scene key="root" hideNavBar={true}>
                <Scene key="intro" component={Intro} title="Intro" />
                <Scene key="home" component={Home} title="Home" initial />
                <Scene key="profile" component={Profile} title="Profile" />
                <Scene key="matriz" component={Matriz} title="Matriz" />
                <Scene key="home" component={Home} title="Home" />
                <Scene key="semesterList" component={SemesterList} title="SemestreList" />
                <Scene key="semester" component={Semester} title="Semestre" />
                <Scene key="atividadesList" component={AtividadesList} title="AtividadesList" />
            </Scene>
        </Router>
    );
};

export default RouterComponent;

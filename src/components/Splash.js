import React, { Component } from 'react';
import { View, Image, AsyncStorage, AppStateIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';

let ready = false;

class Splash extends Component {

    state = {loaded: false, semestres: null, disciplinas: null, faq: null};

    componentWillMount() {
        // AsyncStorage.clear().then(this.setState({ loaded: true }));

        // return;
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4M2IyYTc5YS0xNmExLWYwY2QtYTM0OS0yOWYzNjE1MjI5MjkiLCJOb21lIjoiTHVjYXMiLCJNYXRyaWN1bGEiOjM1Nzk1MSwiaWF0IjoxNTExNjYzMjM4LCJleHAiOjE1MTE2NjY4Mzh9.cWMmuWED8vI-OQi7yYyubpOafgTRw6D7fnm-XBWPHCM";
        // AsyncStorage.setItem('token', token);

        fetch('http://104.41.36.75:3070/semestre?idCurso=f7c44ded-9fc7-604b-94db-6d72446a10bb')
        .then(response => response.json())
        .then(data => {
            this.setState({ semestres: data })
            this.onLoad(data, 'semestres')
        });

        fetch('http://104.41.36.75:3070/disciplina/curso/f7c44ded-9fc7-604b-94db-6d72446a10bb')
        .then(response => response.json())
        .then(data => {
            this.setState({ disciplinas: data })
            this.onLoad(data, 'disciplinas')
        });

        fetch('http://104.41.36.75:3070/curso/curso-faq/f7c44ded-9fc7-604b-94db-6d72446a10bb')
        .then(response => response.json())
        .then(data => {
            this.setState({ faq: data })
            this.onLoad(data, 'faq')
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
    }

    onLoad(item, tag) {
        AsyncStorage.setItem(tag, JSON.stringify(item))
        .then(this.setState({ loaded: true }))
    }

    checkLoad() {
        const state = this.state;

        if(state.loaded === false 
            || state.semestres === null 
            || state.disciplinas === null
            || state.faq === null)
            return;
        if(ready)
            return;

        ready = true;
        
        this.timeoutHandle = setTimeout(()=>{
            this.gotoPage();
        }, 100);
    }

    gotoPage() {
        // Actions.home();
        AsyncStorage.getItem('token')
            .then(
                (value) => {
                    if(value === null || value === undefined)
                        Actions.intro();
                    else
                        Actions.login();
                }
            );
    }

    render() {
        return (
            <View style={styles.container} >
                <Image style={styles.image} source={require('../assets/images/logo.png')} />
                {this.checkLoad()}
            </View>
        );
    }    
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    image: {
        width: 300,
        height: 300
    }
};

export default Splash;

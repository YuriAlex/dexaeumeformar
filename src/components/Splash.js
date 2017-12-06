import React, { Component } from 'react';
import { View, Image, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

let ready = false;

class Splash extends Component {


    // componentWillMount() {
    //     // AsyncStorage.clear();
    // }

    checkLoad() {
        this.timeoutHandle = setTimeout(()=>{
            this.gotoPage();
        }, 1000);
    }

    gotoPage() {
        // Actions.home();
        AsyncStorage.getItem('userData')
            .then(
                (value) => {
                    if(value === null || value === undefined)
                        Actions.intro();
                    else
                        Actions.home();
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

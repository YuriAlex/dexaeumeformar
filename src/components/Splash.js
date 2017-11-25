import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Splash extends Component {

    componentDidMount(){
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(()=>{
             Actions.intro();
        }, 3000);
   }

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
    }

    render() {
        
        return (
            <View style={styles.container} >
                <Image style={styles.image} source={require('../assets/images/logo.png')} />
            </View>
        );
    }    
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 300,
        height: 300
    }
};

export default Splash;

import React from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';

const ConfirmButton = ({ onPress, closeIcon }) => (
    <TouchableNativeFeedback onPress={onPress} >
        <View style={styles.containerStyle}>
            {setImage(closeIcon)}
        </ View>
    </TouchableNativeFeedback>
);

function setImage(closeIcon) {
    if(closeIcon === undefined)
        return (<Image source={require('../../assets/images/confirm.png')} style={styles.iconStyle} />)
    else
        return (<Image source={require('../../assets/images/menuclose.png')} style={styles.iconStyle} /> )
}

const styles = {
    containerStyle: {
        backgroundColor: '#6563a4',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
     },

     submitButton: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },

    iconStyle: {
        width: 40,
        height: 40
    }
 }; 

export { ConfirmButton };

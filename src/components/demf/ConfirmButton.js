import React from 'react';
import { View, Image, TouchableNativeFeedback } from 'react-native';

const ConfirmButton = ({ onPress }) => (
    <TouchableNativeFeedback onPress={onPress} >
        <View style={styles.containerStyle}>
            <Image source={require('../../assets/images/confirm.png')} style={{ width: 40, height: 40 }} />
        </ View>
    </TouchableNativeFeedback>
);

const styles = {
    containerStyle: {
        backgroundColor: '#6563a4',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
     },

     submitButton: {
        position: 'absolute',
        bottom: 0,
        left: 0
    }
 }; 

export { ConfirmButton };

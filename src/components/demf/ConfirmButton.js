import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';

const ConfirmButton = ({ onPress }) => (
    <TouchableWithoutFeedback onPress={onPress} >
        <View style={styles.containerStyle}>
            <Image source={require('../../assets/images/happy.png')} style={{ width: 20, height: 20 }} />
        </ View>
    </TouchableWithoutFeedback>
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

import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';

const ConfirmButton = ({ onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.containerStyle}>
            <Image source={require('../assets/images/happy.png')} style={{ width: 20, height: 20 }} />
            
        </ View>
    </TouchableWithoutFeedback>
);

const styles = {
    containerStyle: {
        backgroundColor: '#7a32b8',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
     }
 }; 

export { ConfirmButton };

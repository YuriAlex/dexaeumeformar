import React from 'react';
import { View, TouchableHighlight, Image } from 'react-native';

const ConfirmButton = ({ onPress }) => (
    <View style={styles.containerStyle}>
        <TouchableHighlight onPress={onPress}>
        <Image source={require('../assets/images/happy.png')} style={{ width: 20, height: 20 }} />
        </TouchableHighlight>
    </ View>
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

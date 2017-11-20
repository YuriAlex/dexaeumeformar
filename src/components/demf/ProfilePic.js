import React from 'react';
import { View, Image } from 'react-native';

const placeHolder = '../../assets/images/batman.jpg';

const ProfilePic = (props) => (
    <Image 
        source={require('../../assets/images/batman.jpg')} style={styles.imageStyle}
        resizeMode="cover"
    />
);

const styles = {
    imageStyle: {
        height: 100,
        width: 100,
        borderRadius: 50
    }
};

export { ProfilePic };

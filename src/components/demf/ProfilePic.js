import React from 'react';
import { View, Image } from 'react-native';

const ProfilePic = () => (
    <Image source={require('../../assets/images/happy.png')} style={styles.imageStyle} />
);

const styles = {
    imageStyle: {
        height: 100,
        width: 100
    }
};

export { ProfilePic };

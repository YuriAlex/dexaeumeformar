import React from 'react';
import { Image } from 'react-native';

const ClassCheck = () => (
    <Image source={require('../../assets/images/happy.png')} style={styles.imageStyle} />
);

const styles = {

    imageStyle: {
        height: 20,
        width: 20,
        marginRight: 10
    }
};

export { ClassCheck };

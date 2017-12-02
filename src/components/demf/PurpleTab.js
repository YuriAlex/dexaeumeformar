import React from 'react';
import { View, Text } from 'react-native';

const PurpleTab = (props) => {
    return (
        <View style={styles.containerStyle} >
                <Text style={styles.matrizText}>{props.text}</Text>
        </View>
    );
};

const styles = {

    containerStyle: {
        height: 60,
        backgroundColor: '#6563a4',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center'
    },
    matrizText: {
        fontSize: 10,
        paddingLeft: 20,
        fontWeight: 'bold',
        color: '#fff',
    }
};

export { PurpleTab };

import React from 'react';
import { View } from 'react-native';
import { ContentText, ClassCheck } from './';

const ClassItem = () => (
    <View style={styles.containerStyle} >
        
            <ClassCheck />
            <ContentText text="Cadeira Um" />
    </View>
);

const styles = {

    containerStyle: {
        borderBottomWidth: 1,
        height: 40,
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { ClassItem };

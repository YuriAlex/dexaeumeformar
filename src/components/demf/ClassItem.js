import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { ContentText, ClassCheck } from './';

const ClassItem = ({ classInfo }, { onPress }) => {
    const { nome } = classInfo;

    return (
        <TouchableWithoutFeedback onPress={onPress} >
            <View style={styles.containerStyle} >
                <ClassCheck />
                <ContentText text={nome} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = {

    containerStyle: {
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#a8a8aa50',
        position: 'relative'
    }
};

export { ClassItem };

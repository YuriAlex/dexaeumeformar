import React from 'react';
import { Text } from 'react-native';

const ContentSubtext = (props) => (
    <Text style={styles.textStyle}>
        {props.text}
    </Text>
);

const styles = {

    textStyle: {
        fontSize: 11,
        color: '#00000050'
    }
};

export { ContentSubtext };

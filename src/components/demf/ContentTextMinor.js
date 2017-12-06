import React from 'react';
import { Text } from 'react-native';

const ContentTextMinor = (props) => (
    <Text style={styles.textStyle}>
        {props.text}
    </Text>
);

const styles = {

    textStyle: {
        fontSize: 12,
        color: '#000'
    }
};

export { ContentTextMinor };

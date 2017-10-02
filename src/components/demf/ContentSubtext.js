import React from 'react';
import { Text } from 'react-native';

const ContentSubtext = (props) => (
    <Text style={styles.textStyle}>
        {props.text}
    </Text>
);

const styles = {

    textStyle: {
        fontSize: 10,
        color: '#17172150'
    }
};

export { ContentSubtext };

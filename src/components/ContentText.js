import React from 'react';
import { Text } from 'react-native';

const ContentText = (props) => (
    <Text style={styles.textStyle}>
        {props.text}
    </Text>
);

const styles = {

    textStyle: {
        fontSize: 15,
        color: '#171721'
    }
};

export { ContentText };

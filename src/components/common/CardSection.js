import React from 'react';
import { View } from 'react-native';

//props.styles serve para caso um style seja passado como props
//ao inves dele usar o containerStyle normal como o style
//ele vai usar esse props.style

const CardSection = (props) => (
    
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
);

// const CardSection = () => (
    
//         <View style={styles.containerStyle} />
// );

const styles = {

    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };

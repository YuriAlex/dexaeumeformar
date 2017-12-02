import React from 'react';
import { Text, View, Image, TouchableNativeFeedback } from 'react-native';

const HeaderRegular = (props) => {
    const { textStyle, imageStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <TouchableNativeFeedback onPress={props.iconPress}>
                <Image source={require('../../assets/images/menuopen.png')} style={imageStyle} />
            </TouchableNativeFeedback>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {

    viewStyle: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'flex-start',
        padding: 10,
    },
    textStyle: {
        fontSize: 20,
        paddingLeft:15,
        color: '#000'
    },
    imageStyle: {
        height: 40,
        width: 40
    }
};

export { HeaderRegular };

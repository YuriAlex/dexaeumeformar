import React from 'react';
import { Text, View, Image, TouchableNativeFeedback } from 'react-native';

const HeaderSemester = (props) => {
    const { textStyle, imageStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <TouchableNativeFeedback onPress={props.iconPress}>
                <Image source={require('../../assets/images/menuclose.png')} style={imageStyle} />
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
        fontFamily: 'sans-serif-light',
        fontSize: 18,
        paddingLeft:15,
        paddingBottom: 2,
        color: '#000'
    },
    imageStyle: {
        height: 40,
        width: 40
    }
};

export { HeaderSemester };

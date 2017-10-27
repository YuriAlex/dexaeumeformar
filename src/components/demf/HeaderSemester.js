import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';

const HeaderSemester = (props) => {
    const { textStyle, imageStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <TouchableWithoutFeedback onPress={props.iconPress}>
                <Image source={require('../../assets/images/menuclose.png')} style={imageStyle} />
            </TouchableWithoutFeedback>
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
        paddingLeft:15
    },
    imageStyle: {
        height: 40,
        width: 40
    }
};

export { HeaderSemester };

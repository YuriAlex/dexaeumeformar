//Importar library pra fazer o component
import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';

//fazer o componente
const HeaderHome = (props) => {
    const { textStyle, imageStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <TouchableWithoutFeedback onPress={props.iconPress}>
                <Image source={require('../../assets/images/menuopen.png')} style={imageStyle} />
            </TouchableWithoutFeedback>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

//'css' do componente
const styles = {

    viewStyle: {
        backgroundColor: '#fff',
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
        paddingLeft:'15%',
        paddingBottom: 2,
        color: '#000'
    },
    imageStyle: {
        height: 40,
        width: 40
    }
};

//deixar o componente disponivel pra outras partes do app
export { HeaderHome };

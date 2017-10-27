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
        paddingLeft:50
    },
    imageStyle: {
        height: 40,
        width: 40
    }
};

//deixar o componente disponivel pra outras partes do app
export { HeaderHome };

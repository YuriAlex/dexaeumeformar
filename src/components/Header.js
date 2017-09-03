//Importar library pra fazer o component
import React from 'react';
import { Text, View } from 'react-native';

//fazer o componente
const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

//'css' do componente
const styles = {

    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2
    },

    textStyle: {
        fontSize: 20
    }
};

//deixar o componente disponivel pra outras partes do app
export { Header };

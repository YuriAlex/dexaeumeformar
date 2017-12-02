import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { selectAtividade } from '../../actions/index';

const setNome = semInfo => {
    if(semInfo === undefined)
        return;

    let nome = "";
    nome = semInfo.Nome;
    nome = nome.substring(0, nome.length - 9).trim();
    return nome;
}

const SemesterSquare = ({ semInfo, semHeight, onPress}) => {
    const { containerStyle, titleStyle, subtextStyle, incompleteStyle } = styles;

    return (
        <TouchableNativeFeedback onPress={onPress} >
            <View style={[containerStyle, {height: semHeight}]} >

                <Text style={titleStyle}>{setNome(semInfo)}</Text>
                <Text style={subtextStyle}>{applyLetterSpacing('0 DE 5 CONCLUÍDOS')}</Text>
                <View style={incompleteStyle} />

            </ View>
        </ TouchableNativeFeedback>
    );
};

function applyLetterSpacing(string, count = 1) {
    return string.split('').join('\u200A'.repeat(count));
}

const styles = {

    containerStyle: {
        padding: 10,
        width: '50%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e7e7e7',
        position: 'relative'
    },

    titleStyle: {
        fontSize: 15,
        color: '#000'
    },

    subtextStyle: {
        fontSize: 10,
        marginTop: 5,
        color: '#a8a8aa',
    },
    
    incompleteStyle: {
        width: 12,
        marginTop: 10,
        borderBottomColor: 'purple',
        borderBottomWidth: 2.5,
    }
};

export { SemesterSquare };

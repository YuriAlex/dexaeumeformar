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

const SemesterSquare = ({ semInfo, semHeight, qtdFeitas, onPress }) => {

    const { containerStyle, titleStyle, subtextStyle, completeStyle, incompleteStyle } = styles;
    const qtdTotal = semInfo.QuantidadeObrigatorias + semInfo.QuantidadeEletivas + semInfo.QuantidadeOptativas;

    let complete = false;
    if(qtdFeitas === qtdTotal)
        complete = true;

    return (
        <TouchableNativeFeedback onPress={onPress} >
            <View style={[containerStyle, {height: semHeight}]} >

                <Text style={titleStyle}>{setNome(semInfo)}</Text>

                {complete === true 
                    ? <Text style={subtextStyle}>{applyLetterSpacing('CONCLUÍDO')}</Text>
                    : <Text style={subtextStyle}>{applyLetterSpacing(qtdFeitas + ' DE ' + qtdTotal + ' CONCLUÍDOS')}</Text>
                }

                {complete === true 
                    ? <View style={completeStyle} /> 
                    : <View style={incompleteStyle} /> 
                }

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
        borderBottomColor: '#6563a4',
        borderBottomWidth: 2.5,
    },

    completeStyle: {
        width: 12,
        marginTop: 10,
        borderBottomColor: '#05b9c4',
        borderBottomWidth: 2.5,
    }
};

export { SemesterSquare };

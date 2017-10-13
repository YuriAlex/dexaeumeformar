import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';

const gotoSemester = (id) => {
    console.log(id);
    Actions.semester();
}

const SemesterSquare = ({ semInfo }, squarePress) => {
    const { containerStyle, titleStyle, subtextStyle, incompleteStyle } = styles;
    const { id, semesterOrder, doneNum } = semInfo;

    return (
        <TouchableWithoutFeedback onPress={() => {gotoSemester(id)}} >
            <View style={containerStyle} >
                <Text style={titleStyle}>{semesterOrder}</Text>
                <Text style={subtextStyle}>{doneNum} de 5 CONCLUÍDOS</Text>
                <View style={incompleteStyle} />
            </ View>
        </ TouchableWithoutFeedback>
    );
};

const styles = {

    containerStyle: {
        padding: 10,
        height: 130,
        width: '50%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        position: 'relative'
    },

    titleStyle: {
        fontSize: 15
    },

    subtextStyle: {
        fontSize: 10,
        marginTop: 5,
        color: '#a8a8aa',
    },
    
    incompleteStyle: {
        width: 10,
        marginTop: 5,
        borderBottomColor: 'purple',
        borderBottomWidth: 2.5,
    }
};

export { SemesterSquare };

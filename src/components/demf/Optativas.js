import React from 'react';
import { View, ScrollView } from 'react-native';
import { ClassItem } from './';

const teste = [
    {
        id: 0,
        nome: 'Optativa 1'
    },
    {
        id: 1,
        nome: 'Optativa 2'
    },
    {
        id: 2,
        nome: 'Optativa 3'
    },
    {
        id: 3,
        nome: 'Optativa 4'
    },
    {
        id: 4,
        nome: 'Optativa 5'
    },
];

const renderClasses = () => {
    return (
        teste.map(info =>
            <ClassItem
            key={info.id}
            classInfo={info}
            />
        )
    );
};

const Optativas = () => {
    return (
        <View style={styles.containerStyle} >
            <ScrollView>
                {renderClasses()}
                {renderClasses()}
                {renderClasses()}
                {renderClasses()}
                {renderClasses()}
                {renderClasses()}
                {renderClasses()}
                {renderClasses()}
            </ScrollView>
        </View>
    );
};

const styles = {

    containerStyle: {
        flexDirection: 'column',
        height: '100%',
    }
};

export { Optativas };

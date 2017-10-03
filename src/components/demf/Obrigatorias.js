import React from 'react';
import { View, ScrollView } from 'react-native';
import { ClassItem, PurpleTab } from './';

const teste = [
    {
        id: 0,
        nome: 'Obrigatória 1'
    },
    {
        id: 1,
        nome: 'Obrigatória 2'
    },
    {
        id: 2,
        nome: 'Obrigatória 3'
    },
    {
        id: 3,
        nome: 'Obrigatória 4'
    },
    {
        id: 4,
        nome: 'Obrigatória 5'
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

const Obrigatorias = () => {
    return (
        <View style={styles.containerStyle} >
            <ScrollView>
                <PurpleTab text='1º SEMESTRE' />
                {renderClasses()}
                <PurpleTab text='2º SEMESTRE' />
                {renderClasses()}
                <PurpleTab text='3º SEMESTRE' />
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

export { Obrigatorias };

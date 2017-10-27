import React from 'react';
import { View, ScrollView } from 'react-native';
import { ClassItem, PurpleTab } from './';

const teste = [
    {
        Id: 0,
        Nome: 'Obrigatória 1'
    },
    {
        Id: 1,
        Nome: 'Obrigatória 2'
    },
    {
        Id: 2,
        Nome: 'Obrigatória 3'
    },
    {
        Id: 3,
        Nome: 'Obrigatória 4'
    },
    {
        Id: 4,
        Nome: 'Obrigatória 5'
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

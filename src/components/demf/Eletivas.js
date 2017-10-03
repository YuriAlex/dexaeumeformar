import React from 'react';
import { View, ScrollView } from 'react-native';
import { ClassItem, PurpleTab } from './';

const teste = [
    {
        id: 0,
        nome: 'Eletiva 1'
    },
    {
        id: 1,
        nome: 'Eletiva 2'
    },
    {
        id: 2,
        nome: 'Eletiva 3'
    },
    {
        id: 3,
        nome: 'Eletiva 4'
    },
    {
        id: 4,
        nome: 'Eletiva 5'
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

const Eletivas = () => {
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

export { Eletivas };

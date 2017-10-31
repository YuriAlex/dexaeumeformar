import React from 'react';
import { View, ScrollView } from 'react-native';
import { PurpleTab } from './';
import ClassItem from './ClassItem';

const teste = [
    {
        Id: 0,
        nome: 'Eletiva 1'
    },
    {
        Id: 1,
        nome: 'Eletiva 2'
    },
    {
        Id: 2,
        nome: 'Eletiva 3'
    },
    {
        Id: 3,
        nome: 'Eletiva 4'
    },
    {
        Id: 4,
        nome: 'Eletiva 5'
    },
];

const renderClasses = () => {
    return (
        teste.map(info =>
            <ClassItem
                key={info.Id}
                classInfo={info}
                onPress={() => {}}
                done={false}
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

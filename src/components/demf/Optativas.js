import React from 'react';
import { View, ScrollView } from 'react-native';
import ClassItem from './ClassItem';

const teste = [
    {
        Id: 0,
        nome: 'Optativa 1'
    },
    {
        Id: 1,
        nome: 'Optativa 2'
    },
    {
        Id: 2,
        nome: 'Optativa 3'
    },
    {
        Id: 3,
        nome: 'Optativa 4'
    },
    {
        Id: 4,
        nome: 'Optativa 5'
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

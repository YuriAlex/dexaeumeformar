import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Header, ClassItem, ConfirmButton } from './demf';

const teste = [
    {
        id: 0,
        pergunta: 'Pergunta 00',
        Resposta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl ligula, condimentum a sollicitudin vitae, pharetra eu sapien. Aenean pretium volutpat magna, quis sollicitudin turpis venenatis ultrices.'
    },
    {
        id: 1,
        pergunta: 'Pergunta 01',
        Resposta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl ligula, condimentum a sollicitudin vitae, pharetra eu sapien. Aenean pretium volutpat magna, quis sollicitudin turpis venenatis ultrices.'
    },
    {
        id: 2,
        pergunta: 'Pergunta 02',
        Resposta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl ligula, condimentum a sollicitudin vitae, pharetra eu sapien. Aenean pretium volutpat magna, quis sollicitudin turpis venenatis ultrices.'
    },
    {
        id: 3,
        pergunta: 'Pergunta 03',
        Resposta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl ligula, condimentum a sollicitudin vitae, pharetra eu sapien. Aenean pretium volutpat magna, quis sollicitudin turpis venenatis ultrices.'
    },
    {
        id: 4,
        pergunta: 'Pergunta 04',
        Resposta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl ligula, condimentum a sollicitudin vitae, pharetra eu sapien. Aenean pretium volutpat magna, quis sollicitudin turpis venenatis ultrices.'
    },
];

const styles = {
     container: {
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
    }
 };

class Atividades extends Component {
    
    componentWillMount() {
        
    }

    buttonPress() {
        console.log('PPRESS');
    }

    renderClasses() {
        return (
            teste.map(info =>
                <ClassItem
                key={info.id}
                classInfo={info}
                />
            )
        );
        // return (<ClassItem />);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Header headerText='Primeiro Semestre' />

                <ScrollView>                    
                    {this.renderClasses()}
                </ScrollView>

                <ConfirmButton onPress={this.buttonPress.bind(this)} />
            </View>
        );
    }
}

export default Atividades;

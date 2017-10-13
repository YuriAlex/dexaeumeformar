import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, ClassItem, ConfirmButton } from './demf';

const teste = [
    {
        id: 0,
        nome: 'Introdução a Sistemas e Mídias Digitais'
    },
    {
        id: 1,
        nome: 'História do Design'
    },
    {
        id: 2,
        nome: 'Autoração Multimídia'
    },
    {
        id: 3,
        nome: 'Programação I'
    },
    {
        id: 4,
        nome: 'Desenho I'
    },
];

const styles = {
     container: {
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
    }
 }; 

class Semester extends Component {
    
    componentWillMount() {
        
    }

    buttonPress() {
        Actions.pop();
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
    }
    
    render() {
        return (
            <View style={styles.container}>

                <ScrollView>                    
                    {this.renderClasses()}
                </ScrollView>

                <ConfirmButton onPress={this.buttonPress.bind(this)} />
            </View>
        );
    }
}

export default Semester;

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ConfirmButton, HeaderSemester } from './demf';
import ClassItem from './demf/ClassItem';

const styles = {
     container: {
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
    }
 }; 

class Semester extends Component {
    
    state = { disciplinas: [] };

    componentWillMount() {
        
        fetch('http://104.41.36.75:3070/disciplina/curso-semestre?idCurso=f7c44ded-9fc7-604b-94db-6d72446a10bb&idSemestre=4f8a5602-4bd9-a5d8-ba35-c0c9727f7055')
        .then(response => response.json())
        .then(data => this.setState({ disciplinas: data }));
    }

    buttonPress() {
        console.log('teste');
    }

    backToList() {
        Actions.pop();
    }

    renderClasses() {
        return (
            this.state.disciplinas.map(info =>
                <ClassItem
                key={info.Id}
                classInfo={info}
                />
            )
        );
    }
    
    render() {
        return (
            <View style={styles.container}>
                <HeaderSemester headerText='Primeiro Semestre' iconPress={this.backToList.bind(this)} />

                <ScrollView>                    
                    {this.renderClasses()}
                </ScrollView>

                <ConfirmButton onPress={this.buttonPress.bind(this)} />
            </View>
        );
    }
}

export default Semester;

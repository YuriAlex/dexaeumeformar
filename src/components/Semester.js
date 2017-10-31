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

const holder = [
    {
        Id: "15132e57-0347-b063-c851-eb3f62e938b8",
        IdSemestre: "4f8a5602-4bd9-a5d8-ba35-c0c9727f7055"
    },
    {
        Id: "2d9bca2c-344d-b000-136f-d9231fb5e237",
        IdSemestre: "4f8a5602-4bd9-a5d8-ba35-c0c9727f7055"
    }
];


class Semester extends Component {
    
    state = { 
        disciplinas: [],
        disciplinasFeitas: holder
    };

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

    handleClassItemPress = classId => {

        const { disciplinasFeitas } = this.state;

        //classdoneid eh da disciplinasfeitas
        //classid eh o da disciplinas

        //SOME: retorna "true" se "classDoneId" é igual a "classId"
        //? if
        //: else

        const newdisciplinasFeitas = disciplinasFeitas.some(item => item.Id == classId) //disciplinasFeitas.indexOf(classId) == -1
        ? disciplinasFeitas.filter(item => item.Id !== classId)
        : [...disciplinasFeitas, classId];

        this.setState({ disciplinasFeitas: newdisciplinasFeitas });
    
    }

    renderClasses() {
        return (
            this.state.disciplinas.map(info => {
                
                const done = this.state.disciplinasFeitas.some(item => item.Id == info.Id);

                return (
                    <ClassItem
                    key={info.Id}
                    classInfo={info}
                    onPress={() => this.handleClassItemPress(info.Id)}
                    done={done}
                    />
                );
            })
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

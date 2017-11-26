import React, { Component } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
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
        disciplinasFeitas: holder,
        token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4M2IyYTc5YS0xNmExLWYwY2QtYTM0OS0yOWYzNjE1MjI5MjkiLCJOb21lIjoiTHVjYXMiLCJNYXRyaWN1bGEiOjM1Nzk1MSwiaWF0IjoxNTExNTUzMjMxLCJleHAiOjE1MTE1NTY4MzF9.QiD-_-N59c0QhqKZ7aISBLyfqf1dRFQ0u4Hnh903vwM"
    };
    
    componentWillMount() {
        // var a = JSON.parse(AsyncStorage.getItem('semestres'));
        // console.log(a);

        fetch('http://104.41.36.75:3070/disciplina/curso-semestre?idCurso=f7c44ded-9fc7-604b-94db-6d72446a10bb&idSemestre=4f8a5602-4bd9-a5d8-ba35-c0c9727f7055',
        {
            method: 'GET',
            headers: {
                'authorization': this.state.token
            }
        }
        )
        .then(response => response.json())
        .then(data => this.setState({ disciplinas: data }));
    }

    componentDidMount() {
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
        : [...disciplinasFeitas, { Id: classId, IdSemestre: "4f8a5602-4bd9-a5d8-ba35-c0c9727f7055" }];
        
        this.setState({ disciplinasFeitas: newdisciplinasFeitas });
    }

    renderClasses() {
        console.log(this.props.semestreId);
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

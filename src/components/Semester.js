import React, { Component } from 'react';
import { View, ScrollView, AsyncStorage, Modal, Text, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ConfirmButton, HeaderSemester } from './demf';
import ClassItem from './demf/ClassItem';
import ClassItemPopup from './demf/ClassItemPopup';

const holder = [
    {
        Id: "15132e57-0347-b063-c851-eb3f62e938b8",
        Nome: "Programação I",
        IdSemestre: "4f8a5602-4bd9-a5d8-ba35-c0c9727f7055",
        IdCurso: "f7c44ded-9fc7-604b-94db-6d72446a10bb",
        Tipo: 1
        },
    {
        Id: "2d9bca2c-344d-b000-136f-d9231fb5e237",
        Nome: "Autoração Multimídia I",
        IdSemestre: "4f8a5602-4bd9-a5d8-ba35-c0c9727f7055",
        IdCurso: "f7c44ded-9fc7-604b-94db-6d72446a10bb",
        Tipo: 1
    }
];

class Semester extends Component {

    state = {
        obrigatorias: [],
        eletivas: [],
        optativas: [],
        ordem: '',

        disciplinasFeitas: holder,
        
        // token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4M2IyYTc5YS0xNmExLWYwY2QtYTM0OS0yOWYzNjE1MjI5MjkiLCJOb21lIjoiTHVjYXMiLCJNYXRyaWN1bGEiOjM1Nzk1MSwiaWF0IjoxNTExNTUzMjMxLCJleHAiOjE1MTE1NTY4MzF9.QiD-_-N59c0QhqKZ7aISBLyfqf1dRFQ0u4Hnh903vwM"
        isModalVisible: false,
        typeToShow: 2
    };
    
    componentWillMount() {
        const i = this.props.semestre.Ordem;
        let str = '';

        if(i === 1)
            str = 'Primeiro'
        else if(i === 2)
            str = 'Segundo'
        else if(i === 3)
            str = 'Terceiro'
        else if(i === 4)
            str = 'Quarto'
        else if(i === 5)
            str = 'Quinto'
        else if(i === 6)
            str = 'Sexto'
        else if(i === 7)
            str = 'Sétimo'
        else if(i === 8)
            str = 'Oitavo'

        this.setState({ ordem: str });

        let ob = [];

        this.props.disciplinas.map(item =>{
            if(item.Tipo === 1)
                ob.push(item)
            // else if(item.Tipo === 2)
            //     el.push(item)
        })

        this.setState({ obrigatorias: ob });

        let el = [{ disciplina: null }, { disciplina: null }];

        this.setState({ eletivas: el });

        let op = [{ disciplina: null }, { disciplina: null }];
        
        this.setState({ optativas: op });
    }

    buttonPress() {
        console.log('teste');
    }

    backToList() {
        Actions.semester();
    }

    handleClassItemPress = classId => {

        const { disciplinasFeitas } = this.state;

        const newdisciplinasFeitas = disciplinasFeitas.some(item => item.Id == classId) //disciplinasFeitas.indexOf(classId) == -1
        ? disciplinasFeitas.filter(item => item.Id !== classId)
        : [...disciplinasFeitas, { Id: classId, IdSemestre: this.props.semestre.Id }];
        
        this.setState({ disciplinasFeitas: newdisciplinasFeitas });
    }

    renderObrigatorias() {    

        return (
            this.state.obrigatorias.map(info => {
                
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

    renderEletivaOptativa(tipo) {
        return (
            this.state.eletivas.map((data, index, array) => {
                
                if(data.disciplina === null){
                    let text = 'Eletiva';
                    if(tipo === 3)
                        text = 'Optativa'
                    
                    return (
                        <ClassItemPopup
                            key={index}
                            tipo={tipo}
                            text={text}
                            onPress={() => this.setState({isModalVisible: true, typeToShow: tipo})}
                        />
                    );
                }
                else {
                    const done = this.state.disciplinasFeitas.some(item => item.Id == info.Id);
                    
                        return (
                            <ClassItem
                            key={info.Id}
                            classInfo={info}
                            onPress={() => this.handleClassItemPress(info.Id)}
                            done={done}
                            />
                        );
                }
            })
        );
    }

    renderModal() {
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.isModalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                >
                <View style={{marginTop: 22, height: 100, width: 100}}>
                    <View>
                        <Text>Hello World!</Text>

                        <TouchableNativeFeedback onPress={() => {
                            this.setState({ isModalVisible: false })
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableNativeFeedback>

                    </View>
                </View>
            </Modal>
        )
    }
    
    render() {
        return (
            <View style={styles.container}>
                <HeaderSemester headerText={this.state.ordem + ' Semestre'} iconPress={this.backToList.bind(this)} />
                {this.renderModal()}
                <ScrollView>                    
                    {this.renderObrigatorias()}
                    {this.renderEletivaOptativa(2)}
                    {this.renderEletivaOptativa(3)}
                </ScrollView>

                <ConfirmButton onPress={this.buttonPress.bind(this)} />
            </View>
        );
    }
}

const styles = {
    container: {
       flexDirection: 'column',
       height: '100%',
       justifyContent: 'space-between',
       backgroundColor: '#fff'
   }
}; 

export default Semester;

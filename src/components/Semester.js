import React, { Component } from 'react';
import { View, ScrollView, AsyncStorage, Text, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
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

        modalEletivas: [],
        modalOptativas: [],

        disciplinasFeitas: null,

        typeToShow: 2,
        isModalVisible: false
    };
    
    componentWillMount() {
        
        AsyncStorage.getItem('disciplinasFeitas')
        .then(data => {
            console.log(JSON.parse(data))
            this.setState({ disciplinasFeitas: JSON.parse(data) });
        })

        this.setNome();

        let ob = [];
        let modEl = [];

        this.props.disciplinas.map(item =>{
            if(item.Tipo === 1)
                ob.push(item)
            else if (item.Tipo === 2)
                modEl.push(item)
        })

        this.setState({ obrigatorias: ob });
        this.setState({ modalEletivas: modEl });

        const numEl = this.props.semestre.QuantidadeEletivas

        if(numEl > 0)
        {
            let el = []

            for(let i = 0; i < numEl; i++)
                el.push({ disciplina: null })
            
            this.setState({ eletivas: el });
        }
    
        const numOp = this.props.semestre.QuantidadeOptativas

        if(numOp > 0)
        {
            let op = []
            
            for(let i = 0; i < numOp; i++)
                op.push({ disciplina: null })
            
            this.setState({ optativas: op, modalOptativas: this.props.modalOptativas });
        }
    }

    setNome(){

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
    }

    handleClassItemPress = classId => {

        const { disciplinasFeitas } = this.state;

        const newdisciplinasFeitas = disciplinasFeitas.some(item => item.Id == classId) //disciplinasFeitas.indexOf(classId) == -1
        ? disciplinasFeitas.filter(item => item.Id !== classId)
        : [...disciplinasFeitas, { Id: classId, IdSemestre: this.props.semestre.Id }];
        
        this.setState({ disciplinasFeitas: newdisciplinasFeitas });
    }

    renderObrigatorias() {    
        
        if(this.state.disciplinasFeitas === null)
            return;

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

    renderEletivas() {

        if(this.state.disciplinasFeitas === null)
            return;

        return (
            this.state.eletivas.map((data, index, array) => {
                if(data.disciplina === null){
                    return (
                        <ClassItemPopup
                            key={index}
                            tipo={2}
                            text={'Eletiva'}
                            onPress={() => this.setState({isModalVisible: true, typeToShow: 2})}
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

    renderOptativas() {
        
        if(this.state.disciplinasFeitas === null)
            return;

        return (
            this.state.optativas.map((data, index, array) => {
                if(data.disciplina === null){
                    return (
                        <ClassItemPopup
                            key={index}
                            tipo={3}
                            text={'Optativa'}
                            onPress={() => this.setState({isModalVisible: true, typeToShow: 3})}
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

    _showModal = () => this.setState({ isModalVisible: true })
    
    _hideModal = () => this.setState({ isModalVisible: false })

    setModal() {
        return(
            <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.modalContent}>
                <ScrollView style={{maxHeight: 300}}>
                    {this.renderModalClasses()}
                </ScrollView>
                <ConfirmButton onPress={() => this.setState({isModalVisible: false})} closeIcon={true}/>
              </View>
            </Modal>
        )
    }

    renderModalClasses() {

        if(this.state.typeToShow === 2)
        {
            return (
                this.state.modalEletivas.map(info => {
                    return (
                        <ClassItem
                            key={info.Id}
                            classInfo={info}
                            onPress={() => this.selectClass(info.Id)}
                            done={false}
                        />
                    );
                })
            );
        }
        else if(this.state.typeToShow === 3)
        {
            return (
                this.state.modalOptativas.map(info => {
                    return (
                        <ClassItem
                            key={info.Id}
                            classInfo={info}
                            onPress={() => this.selectClass(info.Id)}
                            done={false}
                        />
                    );
                })
            );
        }
    }

    selectClass(Id) {

    }
    
    render() {
        return (
            <View style={styles.container}>
                <HeaderSemester headerText={this.state.ordem + ' Semestre'} iconPress={() => Actions.pop()} />
                {this.setModal()}
                <ScrollView>                    
                    {this.renderObrigatorias()}
                    {this.renderEletivas()}
                    {this.renderOptativas()}
                </ScrollView>

                <ConfirmButton onPress={() => {}} />
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
   },

   modalContent: {
    backgroundColor: 'white',
    // padding: 22,
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
}; 

export default Semester;

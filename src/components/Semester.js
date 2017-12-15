import React, { Component } from 'react';
import { View, ScrollView, AsyncStorage, Text, TouchableNativeFeedback, ToastAndroid, ActivityIndicator } from 'react-native';
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
        obrigatorias: [], eletivas: [], optativas: [],
        ordem: '',

        originalFeitas: null, disciplinasFeitas: null, todasSelecionadas: [],
        optativasSelecionadas: [], eletivasSelecionadas: [],

        modalEletivas: [],  modalOptativas: [],

        typeToShow: 2,
        isModalVisible: false,
        isLoadingVisible: false,
        userData: null
    };
    
    componentWillMount() {

        //MISC
            AsyncStorage.getItem('userData')
            .then(data =>this.setState({ userData: JSON.parse(data) }))

            this.setNome();

        //PUXAS TODAS AS FEITAS E COLOCA NO ESTADO
        console.log(this.props)
            let totalOb = [];
            let totalEl = [];

            this.props.disciplinas.map(item =>{
                if(item.Tipo === 1)
                    totalOb.push(item)
                else if (item.Tipo === 2)
                    totalEl.push(item)
            })

            AsyncStorage.getItem('disciplinasFeitas')
            .then(data => {

                AsyncStorage.getItem('selecionadasElOp')
                .then(selec => {
                    this.manageEletivasList(JSON.parse(data), totalEl, JSON.parse(selec))
                    this.manageOptativasList(JSON.parse(data), JSON.parse(selec))
                })

                this.setState({
                    disciplinasFeitas: JSON.parse(data),
                    originalFeitas: JSON.parse(data),
                    obrigatorias: totalOb
                })
            })
        //FILTRANDO OPTATIVAS
            // const numOp = this.props.semestre.QuantidadeOptativas

            // if(numOp > 0)
            // {
            //     let op = []
                
            //     for(let i = 0; i < numOp; i++)
            //         op.push({ disciplina: null })
                
            //     this.setState({ optativas: op, modalOptativas:    });
            // }
    }

    manageEletivasList(discFeitas, totalEl, selec) {

        let feitas = []
        let mod = []

        selec = selec.filter(item => item.Tipo === 2 && item.IdSemestre === this.props.semestre.Id)
        
        if(discFeitas !== null){

            totalEl.map(info => {
                if(discFeitas.some(item => item.IdDisciplina === info.Id))
                    feitas.push(info)
                else
                    mod.push(info)
            })

            feitas.map(info =>{
                if(selec.filter(item => item.Id === info.Id).length === 0)
                    selec.push(info)
            })

            selec.map(info => {
                mod = mod.filter(item => item.Id !== info.Id)
            })
        }
        else {
            mod = totalEl
            selec.map(info => { mod = mod.filter(item => item.Id !== info.Id) })
        }

        this.setState({
            eletivasSelecionadas: selec,
            modalEletivas: mod
        })

        this.resetEletivas()
    }

    manageOptativasList(discFeitas, selec) {
        
        const totalOp = this.props.modalOptativas
        if(totalOp === undefined)
            return;

        let feitas = []
        let mod = []

        selec = selec.filter(item => item.Tipo === 3 && item.IdSemestre === this.props.semestre.Id)
        
        if(discFeitas !== null){

            totalOp.map(info => {
                if(discFeitas.some(item => item.IdDisciplina === info.Id && item.IdSemestre === this.props.semestre.Id))
                    feitas.push(info)
                else
                    mod.push(info)
            })

            feitas.map(info =>{
                if(selec.filter(item => item.Id === info.Id && item.IdSemestre === this.props.semestre.Id).length === 0)
                    selec.push(info)
            })

            selec.map(info => {
                mod = mod.filter(item => item.Id !== info.Id && item.IdSemestre === this.props.semestre.Id)
            })
        }
        else {
            mod = totalOp
            selec.map(info => { mod = mod.filter(item => item.Id !== info.Id && item.IdSemestre === this.props.semestre.Id) })
        }

        this.setState({
            optativasSelecionadas: selec,
            modalOptativas: mod
        })

        this.resetOptativas()
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

    handleClassItemPress = clickedClassId => {

        const { disciplinasFeitas, userData } = this.state;

        const newdisciplinasFeitas = disciplinasFeitas.some(item => item.IdDisciplina === clickedClassId) //disciplinasFeitas.indexOf(classId) == -1
        ? disciplinasFeitas.filter(item => item.IdDisciplina !== clickedClassId)
        : [...disciplinasFeitas, { Id: '', IdDisciplina: clickedClassId, IdSemestre: this.props.semestre.Id, IdUsuario: userData.Id }];

        this.setState({ disciplinasFeitas: newdisciplinasFeitas });
    }

    renderObrigatorias() {    
        
        if(this.state.disciplinasFeitas === null)
            return;

        return (
            this.state.obrigatorias.map(info => {
                const done = this.state.disciplinasFeitas.some(item => item.IdDisciplina === info.Id);

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
            this.state.eletivas.map((info, index, array) => {
                if(info.disciplina === null){
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
                    const done = this.state.disciplinasFeitas.some(item => item.IdDisciplina == info.Id);
                    
                    return (
                        <ClassItem
                            key={info.Id}
                            classInfo={info}
                            onPress={() => this.handleClassItemPress(info.Id)}
                            onLongPress={() => this.removeFromList(info, done)}
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
            this.state.optativas.map((info, index, array) => {
                if(info.disciplina === null){
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
                    const done = this.state.disciplinasFeitas.some(item => item.IdDisciplina == info.Id);
                    
                    return (
                        <ClassItem
                            key={info.Id}
                            classInfo={info}
                            onPress={() => this.handleClassItemPress(info.Id)}
                            onLongPress={() => this.removeFromList(info, done)}
                            done={done}
                        />
                    );
                }
            })
        );
    }

    setClassesModal() {
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
                this.state.modalEletivas.map((info, index, array) => {
                    return (
                        <ClassItem
                            key={index}
                            classInfo={info}
                            onPress={() => this.removeFromModal(info)}
                            done={false}
                        />
                    );
                })
            );
        }
        else if(this.state.typeToShow === 3)
        {
            return (
                this.state.modalOptativas.map((info, index, array) => {
                    return (
                        <ClassItem
                            key={index}
                            classInfo={info}
                            onPress={() => this.removeFromModal(info)}
                            done={false}
                        />
                    );
                })
            );
        }
    }
    
    removeFromModal(info) {
        console.log(info)
        ToastAndroid.show('Para remover a disciplina, basta pressionar e segurá-la.', ToastAndroid.SHORT)
        
        if(info.Tipo == 2) {

            let { modalEletivas, eletivas, eletivasSelecionadas } = this.state;
            
            eletivasSelecionadas.push(info)
            modalEletivas = modalEletivas.filter(item => item.Id !== info.Id)
    
            this.setState({
                isModalVisible: false,
                eletivasSelecionadas: eletivasSelecionadas,
                modalEletivas: modalEletivas
            })

            this.resetEletivas()
        }

        if(info.Tipo == 3) {

            let { modalOptativas, optativas, optativasSelecionadas } = this.state;
            
            info.IdSemestre = this.props.semestre.IdSemestre
            optativasSelecionadas.push(info)
            modalOptativas = modalOptativas.filter(item => item.Id !== info.Id)
    
            this.setState({
                isModalVisible: false,
                optativasSelecionadas: optativasSelecionadas,
                modalOptativas: modalOptativas
            })

            this.resetOptativas()
        }
    }

    removeFromList(info, done) {

        if(info.Tipo == 2) {
            
            let { modalEletivas, eletivas, eletivasSelecionadas } = this.state;
            
            eletivasSelecionadas = eletivasSelecionadas.filter(item => item.Id !== info.Id)
            modalEletivas.push(info)

            if(done) {
                this.handleClassItemPress(info.Id)
            }
    
            this.setState({
                eletivasSelecionadas: eletivasSelecionadas,
                modalEletivas: modalEletivas
            })

            this.resetEletivas()
        }

        if(info.Tipo == 3) {
            
            let { modalOptativas, optativas, optativasSelecionadas } = this.state;
            
            info.IdSemestre = null
            optativasSelecionadas = optativasSelecionadas.filter(item => item.Id !== info.Id)
            modalOptativas.push(info)

            if(done) {
                this.handleClassItemPress(info.Id)
            }
    
            this.setState({
                optativasSelecionadas: optativasSelecionadas,
                modalOptativas: modalOptativas
            })

            this.resetOptativas()
        }
    }
    
    resetEletivas() {
        const selecionadas = this.state.eletivasSelecionadas
        const num = this.props.semestre.QuantidadeEletivas
        
        if(num > 0)
        {
            let el = []

            for(let i = 0; i < num; i++) {
                if(i < selecionadas.length)
                    el.push(selecionadas[i])
                else
                    el.push({ disciplina: null })
            }
            
            this.setState({ eletivas: el });
        }
    }

    resetOptativas() {
        const selecionadas = this.state.optativasSelecionadas
        const num = this.props.semestre.QuantidadeOptativas
        
        if(num > 0)
        {
            let op = []

            for(let i = 0; i < num; i++) {
                if(i < selecionadas.length)
                    op.push(selecionadas[i])
                else
                    op.push({ disciplina: null })
            }
            
            console.log(op)

            this.setState({ optativas: op });
        }
    }

    confirm() {

        if(this.state.disciplinasFeitas === this.state.originalFeitas)
        {
            Actions.pop()
            return
        }
        
        this.setState({isLoadingVisible: true});
        this.state.disciplinasFeitas.map(nova => this.addToPost(nova));

        AsyncStorage.getItem('selecionadasElOp')
        .then(data => this.setSelecionadasStorage(JSON.parse(data)))

        fetch('http://104.41.36.75:3070/usuario/usuario-disciplina/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                IdUsuario: this.state.userData.Id,
                Disciplinas: this.state.disciplinasFeitas
            })
        })
        .then(response => response.json())
        .then(data =>  {
            AsyncStorage.setItem('disciplinasFeitas', JSON.stringify(data))
            .then(() => {
                this.setState({isLoadingVisible: false})
                ToastAndroid.show('Salvo com sucesso!', ToastAndroid.SHORT)
            })
            .then(Actions.semesterList())
        })
        .catch(error => {
            this.setState({isLoadingVisible: false})
            ToastAndroid.show('Ocorreu um erro! :(', ToastAndroid.SHORT)
            console.log(error)
        })
    }

    addToPost(nova) {
        
        let originais = this.state.originalFeitas
        const alredyDone = originais.some(feita => feita.Id === nova.Id);
        if(alredyDone)
            return

        originais.push({IdDisciplina: nova.Id, IdSemestre: this.props.semestre.Id})
        this.setState({ originalFeitas: originais })
    }

    setSelecionadasStorage(data){
        const{ eletivasSelecionadas, optativasSelecionadas} = this.state;

        if(eletivasSelecionadas.length === 0 && optativasSelecionadas.length === 0)
            return;

        if(data.length === 0) {
            eletivasSelecionadas.map(item => data.push(item))
            optativasSelecionadas.map(item => data.push(item))
            AsyncStorage.setItem('selecionadasElOp', JSON.stringify(data))
            return;
        }
        
        eletivasSelecionadas.map(el => {
            if(data.filter(item => item.Id === el.Id).length === 0) {
                data.push(el)
            } else{
                data = data.filter(item => item.Id === el.Id)
            }
        })

        optativasSelecionadas.map(op => {
            if(data.filter(item => item.Id === op.Id).length === 0) {
                data.push(el)
            }
        })

        AsyncStorage.setItem('selecionadasElOp', JSON.stringify(data))
    }

    setLoadingModal() {
        return(
            <Modal isVisible={this.state.isLoadingVisible}>
                    <View>
                        <ActivityIndicator size={'large'} />
                    </View>
            </Modal>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderSemester headerText={this.state.ordem + ' Semestre'} iconPress={() => Actions.pop()} />
                {this.setLoadingModal()}
                {this.setClassesModal()}
                <ScrollView>                    
                    {this.renderObrigatorias()}
                    {this.renderEletivas()}
                    {this.renderOptativas()}
                </ScrollView>

                <ConfirmButton onPress={this.confirm.bind(this)} />
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

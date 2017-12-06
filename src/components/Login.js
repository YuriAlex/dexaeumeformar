import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, Image, Keyboard, AsyncStorage, ToastAndroid, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import { ProfileItem, HeaderSemester } from './demf';

class Login extends Component {

    state = {   
        email: '', password: '', userID: '',
        userError: false, passwordError: false, isModalVisible: false,
        disciplinasFeitas: null, semestres: null, disciplinas: null, faq: null, optativas: null
    };

    componentWillMount(){

        // LOGIN
            // fetch('http://104.41.36.75:3070/usuario/signin', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         login: "357979",
            //         senha: "12345678",
            //     })
            // })
            // .then(response => response.json())
            // .then(data => this.handleLogin(data))
            // .then(data => console.log(data.error.message))
            // .then(data => { console.log(data); })
            // .catch(error => {console.log(error.messages); console.log(error)})
        

        //CADASTRO
            // fetch('http://104.41.36.75:3070/usuario/saveUsuario', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         matricula 	: "357979",
            //         senha 		: "qwewqwe",
            //         tipo         : 2,
            //         nome         : 'asdasd'
            //         IdCurso      : 'asdasdasd'
            //         Imagem       : null
            //     })
            // })
            // .then(response => response.json())
            // .then(data => {
            //    console.log(data);
            // });

        //EDITAR PERFIL
            // fetch('http://104.41.36.75:3070/usuario/saveUsuario', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         Id           : 'dasdas dad kaspo'
            //         matricula 	: "357979",
            //         senha 		: "qwewqwe",
            //         tipo         : 2,
            //         nome         : 'asdasd'
            //     })
            // })
            // .then(response => response.json())
            // .then(data => {
            //    console.log(data);
            // });

        //SALVAR DISCIPLINAS
            // fetch('http://104.41.36.75:3070/usuario/usuario-disciplina/', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //          Id: 'dasdas dad kaspo',
            //          [
            //              {
            //                  IdDisciplina,
            //                  IdSemestre
            //              },
            //              {
            //                  IdDisciplina,
            //                  IdSemestre
            //              },
            //           ]
            //     })
            // })
            // .then(response => response.json())
            // .then(data => {
            //    console.log(data);
            // });


    }

    tryConfirm() {
        
        let { matricula, password } = this.state;
        if(matricula === undefined || password === undefined)
        {
            matricula = '';
            password = '';
        }

        const isnum = /^\d+$/.test(matricula);

        if(matricula.length < 6 || !isnum) {
            ToastAndroid.show('A matrícula são seis números, viu?', ToastAndroid.SHORT)
            return;
        }
        if(password.length < 6) {
            ToastAndroid.show('A senha são pelo menos seis caractéres', ToastAndroid.SHORT)
            return; 
        }

        this.setState({isModalVisible: true})

        fetch('http://104.41.36.75:3070/usuario/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: "357979",
                senha: "12345678",
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({userID: data.Id})
            // console.log(this.state.userID);
            this.handleLogin(data)
        })
    }

    handleLogin(data) {
        if(data.status !== undefined)
        {
            console.log("FAZER LOGIN OU MENSAGEM DE SENHA");
            return;
        }

        AsyncStorage.setItem('userData', JSON.stringify(data))
        .then(
            AsyncStorage.setItem('userId', this.state.userID)
            .then(this.downloadInfo())
        )
    }

    downloadInfo() {
        
        //DISCIPLINAS FEITAS
            const str = 'http://104.41.36.75:3070/usuario/usuario-disciplina/'+this.state.userID
            
            fetch(str)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ disciplinasFeitas: data })
                this.onLoad(data, 'disciplinasFeitas')
            })

        //SEMESTRES DO CURSO
            fetch('http://104.41.36.75:3070/semestre?idCurso=f7c44ded-9fc7-604b-94db-6d72446a10bb')
            .then(response => response.json())
            .then(data => {
                this.setState({ semestres: data })
                this.onLoad(data, 'semestres')
            })

            

        //DISCIPLINAS OBRIGATORIAS,ELETIVAS E OPTATIVAS
            let disc = []
            let op =[]

            fetch('http://104.41.36.75:3070/disciplina/curso/f7c44ded-9fc7-604b-94db-6d72446a10bb')
            .then(response => response.json())
            .then(data => {
                data.map(item =>{
                    if(item.Tipo === 3)
                        op.push(item)
                    else
                        disc.push(item)
                })
            })
            .then(() => {
                this.setState({ disciplinas: this.sortByNome(disc), optativas: this.sortByNome(op) })
                this.onLoad(disc, 'disciplinas')
                this.onLoad(op, 'optativas')
            })

        //FAQ
            fetch('http://104.41.36.75:3070/curso/curso-faq/f7c44ded-9fc7-604b-94db-6d72446a10bb')
            .then(response => response.json())
            .then(data => {
                this.setState({ faq: data })
                this.onLoad(data, 'faq')
            });

        
    }

    sortByNome(array) {
        array = array.sort((a, b) => a.Nome.localeCompare(b.Nome));
        return array;
    }

    onLoad(item, tag) {
        AsyncStorage.setItem(tag, JSON.stringify(item))
        .then(this.checkLoad())
    }

    checkLoad() {
        const state = this.state;

        if( state.userID === ''
            || state.semestres === null 
            || state.disciplinas === null
            || state.optativas === null
            || state.faq === null)
            return;
        
        this.setState({isModalVisible: false})

        this.timeoutHandle = setTimeout(()=>{
            Actions.profile()
        }, 100);
    }

    setModal() {
        return(
            <Modal isVisible={this.state.isModalVisible}>
                <View style={styles.modalContent}>
                    <ActivityIndicator size={'large'} />
              </View>
            </Modal>
        )
    }

    renderButton() {
        let { matricula, password } = this.state;
        if(matricula === undefined || password === undefined)
        {
            matricula = '';
            password = '';
        }

        const isnum = /^\d+$/.test(matricula);

        if(matricula.length < 6 || !isnum || password.length < 6) {
            return(
                <View style={[styles.btnView, { backgroundColor: '#8F8F93'}]}>
                    <Image source={require('../assets/images/confirm.png')} style={{ width: 40, height: 40 }} />
                </View>
            );
        }

        return (
            <View style={[styles.btnView, { backgroundColor: '#6563a4'}]}>
                <Image source={require('../assets/images/confirm.png')} style={{ width: 40, height: 40 }} />
            </View>
        );
    }

    render() {
        const { 
            container, blackText, textArea, textArea2, inputArea
        } = styles;

        return (
            <View style={container}>
                <HeaderSemester headerText='Login' iconPress={() => Actions.intro()} />
                {this.setModal()}
                <View style={textArea}>
                    <View backupArea2>
                        <Text style={blackText}>Não se preocupe{'\n'}</Text>
                    </View>
                    <View backupArea2>
                        <Text style={blackText}>caso você ainda não tenha cadastro.{'\n'}</Text>
                    </View>
                    <View backupArea2>
                        <Text style={blackText}>Ele será criado agora. ;)</Text>
                    </View>
                </View>

                <View style={inputArea}>
                    <ProfileItem 
                        label='QUAL SUA MATRÍCULA?' placeholder='Matrícula'
                        value={this.state.matricula}
                        onChangeText={matricula => {
                            if(!this.state.isModalVisible) {
                                this.setState({ matricula })
                            }
                        }}
                    />
                    <ProfileItem 
                        label='QUAL SUA SENHA?' placeholder='Senha'
                        value={this.state.password}
                        secured={true}
                        onChangeText={password => {
                            if(!this.state.isModalVisible) {
                                this.setState({ password })
                            }
                        }}
                    />
                </View>

                <TouchableNativeFeedback onPress={this.tryConfirm.bind(this)} onPressOut={Keyboard.dismiss}>
                    {this.renderButton()}
                </TouchableNativeFeedback>
            </View>
        );
    }    
}

const styles = {

    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: '100%'
    },

    textArea: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top:100
    },
    textArea2: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center'
    },
    
    blackText: {
        fontSize: 12,
        color: '#171721',
        textAlign: 'center'
    },

    inputArea: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 220
    },

    btnView: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom:0,
        left:0,
        width: '100%'
    },
};

export default Login;

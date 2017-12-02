import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, Image, Keyboard, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ProfileItem, HeaderSemester } from './demf';

class Login extends Component {

    state = {   
        email: '', password: '', error: '', loading: false, oktogo: false,
        userError: false, passwordError: false, 
    };

    componentWillMount(){

        // LOGIN
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
        .then(data => this.handleLogin(data))
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
        //         tipo: 2,
        //         nome: 'asdasd'
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
        //         Id : 'dasdas dad kaspo'
        //         matricula 	: "357979",
        //         senha 		: "qwewqwe",
        //         tipo: 2,
        //         nome: 'asdasd'
        //     })
        // })
        // .then(response => response.json())
        // .then(data => {
        //    console.log(data);
        // });

    }

    handleLogin(data)
    {
        if(data.status !== undefined)
        {
            console.log("FAZER LOGIN OU MENSAGEM DE SENHA");
            return;
        }
        console.log('blz');
        AsyncStorage.setItem('userData', JSON.stringify(data))
        .then(this.setState({ oktogo: true }))
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
                <View style={styles.btnView2}>
                    <Image source={require('../assets/images/confirm.png')} style={{ width: 40, height: 40 }} />
                </View>
            );
        }

        return (
            <View style={styles.btnView}>
                <Image source={require('../assets/images/confirm.png')} style={{ width: 40, height: 40 }} />
            </View>
        );
    }

    tryProfile() {
        if(!this.state.oktogo)
            return;

        let { matricula, password } = this.state;
        if(matricula === undefined || password === undefined)
        {
            matricula = '';
            password = '';
        }

        const isnum = /^\d+$/.test(matricula);

        // if(matricula.length < 6 || !isnum || password.length < 6)
        //     return;

        
        Actions.profile();
    }

    render() {
        const { 
            container, blackText, backupArea, backupArea2
        } = styles;

        return (
            <View style={container}>
                <HeaderSemester headerText='Login' iconPress={() => Actions.intro()} />
            
                <View style={backupArea}>
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

                <View style={{ marginBottom: 60 }}>
                    <ProfileItem 
                        label='QUAL SUA MATRÍCULA?' placeholder='Matrícula'
                        value={this.state.matricula}
                        onChangeText={matricula => this.setState({ matricula })}
                    />
                    <ProfileItem 
                        label='QUAL SUA SENHA?' placeholder='Senha'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>

                <TouchableNativeFeedback onPress={this.tryProfile.bind(this)} onPressOut={Keyboard.dismiss}>
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

    backupArea: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 40
    },
    backupArea2: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center'
    },
    
    blackText: {
        fontSize: 12,
        color: '#171721',
        textAlign: 'center'
    },

    btnView: {
        backgroundColor: '#05b9c4',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnView2: {
        backgroundColor: '#8F8F93',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default Login;

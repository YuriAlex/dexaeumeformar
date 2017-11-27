import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ProfileItem, HeaderSemester } from './demf';

class Login extends Component {

    state = { email: '', password: '', error: '', loading: false };

    componentWillMount(){

        //LOGIN
        // fetch('http://104.41.36.75:3070/usuario/signin', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         login: "357951",
        //         senha: "12345678",
        //     })
        // })
        // .then(response => response.json())
        // .then(data => {
        //    console.log(data);
        // });

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

    backToHome() {
        Actions.intro();
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
        let { matricula, password } = this.state;
        if(matricula === undefined || password === undefined)
        {
            matricula = '';
            password = '';
        }

        const isnum = /^\d+$/.test(matricula);

        if(matricula.length < 6 || !isnum || password.length < 6)
            return;

        
        Actions.profile();
    }

    render() {
        const { 
            container, blackText, backupArea, backupArea2
        } = styles;

        return (
            <View style={container}>
                <HeaderSemester headerText='Login' iconPress={this.backToHome.bind(this)} />
            
                <View style={backupArea}>
                    <View backupArea2>
                        <Text style={blackText}>Não se preocupe caso você ainda não tenha cadastro.{'\n'}</Text>
                    </View>
                    <View backupArea2>
                        <Text style={blackText}>Ele será criado agora. ;)</Text>
                    </View>
                </View>

                <View style={{ marginTop: -50 }}>
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

                <TouchableWithoutFeedback onPress={this.tryProfile.bind(this)} onPressOut={Keyboard.dismiss}>
                    {this.renderButton()}
                </TouchableWithoutFeedback>
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
    },
    backupArea2: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center'
    },
    
    blackText: {
        fontSize: 12,
        color: '#171721',
        textAlign: 'center',
    },

    btnView: {
        backgroundColor: '#05b9c4',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnView2: {
        backgroundColor: '#6563a4',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default Login;

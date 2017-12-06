import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, Image, Keyboard, ToastAndroid, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import RNFetchBlob from 'react-native-fetch-blob';
import { ProfileItem, ContentTextMinor, HeaderSemester } from './demf';
import ProfilePic from './demf/ProfilePic';

var ImagePicker = require('react-native-image-picker');

class Profile extends Component {

    state = {
        imageData: '',
        imageHeight: '',
        imageWidth: '',
        imagePlaceHolder: '../assets/images/perfilPlaceholder.jpg',
        
        userData: '',
        nome: 'Nome',
        curso: ''
    }

    componentWillMount() {
        AsyncStorage.getItem('userData')
        .then(data => { this.handleUser(JSON.parse(data)) })
    }

    handleUser(data) { 
        console.log(data)
        this.setState({ nome: data.Nome, userData: data })
    }

    tryHome() {
        let { nome, nomeOriginal, userData } = this.state;

        if(nome === undefined)
            nome = '';
        if(nome === '')
        {
            ToastAndroid.show('Tá faltando o teu nome, mah!', ToastAndroid.SHORT)
            return;
        }
        if(nome.length > 20)
        {
            ToastAndroid.show('Só vale até 20 caractéres. Foi mal...', ToastAndroid.SHORT)
            return;
        }

        if(nome === userData.Nome)
            Actions.home();
        else {
            fetch('http://104.41.36.75:3070/usuario/saveUsuario', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id : userData.Id,
                    Matricula 	: userData.Matricula,
                    senha 		: "123123",
                    tipo: 2,
                    nome: nome
                })
            })
            .then(response => response.json())
            .then(data => {
               console.log(data);
               Actions.home();
            });
        }
    }

    renderButton() {
        let { nome } = this.state;

        if(nome === undefined)
            nome = '';

        if(nome === '' || nome.length > 20) {
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

    openImagePicker() {
        const options = {
            title: 'Selecione uma Foto',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };  

        ImagePicker.showImagePicker(options, (response) => {
            if(response.didCancel){
                console.log('cancelado');
            } else if(response.error){
                console.log('Error' + response.error);
            } else if(response.customButton){
                console.log('pressed custom button' + response.customButton);
            } else{
                // console.log(response.data);
                this.setState({
                    imageData: response.data,
                    imageHeight: response.height,
                    imageWidth: response.width
                });
            }
        });
    }

    goto(){
        if(this.props.goto === 'home')
            Actions.home()
        else
            Actions.login()
    }

    render() {
        const { 
            container, picArea, greenText, btnView, picStyle, inputArea
        } = styles;

        return (
            <View style={container}>
                <HeaderSemester headerText='Perfil' iconPress={this.goto.bind(this)} />
                
                <View style={picArea}>
                    {/* { this.state.imagePath ? <Image style={styles.picStyle} source={{uri: this.state.imagePath}} /> : <ProfilePic />} */}
                    { this.state.imageData ? <ProfilePic data={this.state.imageData} /> : <ProfilePic />}
                    <TouchableNativeFeedback onPress={this.openImagePicker.bind(this)}>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={greenText}>Alterar Foto</Text>
                        </View>
                    </TouchableNativeFeedback>
                    
                </View>
                
                <View style={inputArea}>
                    <ProfileItem 
                        label='QUAL SEU NOME?' placeholder={this.state.nome}
                        value={this.state.nome}
                        onChangeText={nome => this.setState({ nome })}
                    />
                    <ProfileItem 
                        label='QUAL SEU CURSO?' placeholder='Sistemas e Mídias Digitais - UFC'
                        value={this.state.curso}
                        onChangeText={curso => this.setState({ curso })}
                        blocked={true}
                        onPress={() =>ToastAndroid.show('Por enquanto é só o SMD!', ToastAndroid.SHORT)}
                    />
                </View>

                {/* <View style={backupArea}>
                    <View style={backupArea2}>
                        <Text style={greenText}>Criar um backup das informações?</Text>
                    </View>
                
                    <View style={backupArea2}>
                        <ContentTextMinor text='Já possui um backup? ' />
                        <Text style={greenText}>Restaurar.</Text>
                    </View>
                </View> */}

                <TouchableNativeFeedback 
                    onPress={this.tryHome.bind(this)}  onPressOut={Keyboard.dismiss}>
                    {this.renderButton()}
                </TouchableNativeFeedback>
            </View>
        );
    }    
}

const styles = {

    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        height: '100%',
        justifyContent:'space-between',
    },

    picArea: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '10%',
        position: 'absolute',
        top:70
    },

    // backupArea: {
    //     flexDirection: 'column',
    //     justifyContent: 'space-between',
    // },
    // backupArea2: {
    //     flexDirection: 'row',
    //     padding: 5,
    //     justifyContent: 'center'
    // },

    inputArea: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 220
    },

    greenText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#05b9c4'
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

    picStyle: {
        height: 100,
        width: 100,
        borderRadius: 50
    }
};

export default Profile;

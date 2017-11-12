import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import CameraRollPicker from 'react-native-camera-roll-picker';
import { ProfileItem, ProfilePic, ContentTextMinor, HeaderSemester } from './demf';

var ImagePicker = require('react-native-image-picker');

class Profile extends Component {

    state = {
        imagePath: '',
        imageHeight: '',
        imageWidth: '',
        imagePlaceHolder: '../assets/images/batman.jpg'
    }

    backToHome() {
        Actions.pop();
    }

    // getSelectedImages(image) {
    //     if(image[0])
    //         alert(image[0].uri);
    // }

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
                this.setState({
                    imagePath: response.uri,
                    imageHeight: response.height,
                    imageWidth: response.width
                });
            }
        });
    }

    render() {
        const { 
            container, picArea, greenText, backupArea, backupArea2, btnView, picStyle
        } = styles;

        return (
            <View style={container}>
                <HeaderSemester headerText='Perfil' iconPress={this.backToHome.bind(this)} />
                
                <View style={picArea}>
                    {/* <CameraRollPicker callback={this.getSelectedImages} /> */}
                    {/* <ProfilePic imageUri='../../assets/images/batman.jpg' /> */}
                    { this.state.imagePath ? <Image style={styles.picStyle} source={{uri: this.state.imagePath}} /> : null }
                    <TouchableWithoutFeedback onPress={this.openImagePicker.bind(this)}>
                        <View>
                            <Text style={greenText}>Alterar foto</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    
                </View>
                
                <View>
                    <ProfileItem label='QUAL SEU NOME?' placeholder='Nome' />
                    <ProfileItem label='CURSO?' placeholder='Curso' />
                    <ProfileItem label='QUANDO INGRESSOU NO CURSO?' placeholder='Ano' />
                </View>

                <View style={backupArea}>
                    <View style={backupArea2}>
                        <Text style={greenText}>Criar um backup das informações?</Text>
                    </View>
                
                    <View style={backupArea2}>
                        <ContentTextMinor text='Já possui um backup? ' />
                        <Text style={greenText}>Restaurar.</Text>
                    </View>
                </View>

                <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={btnView}>
                        <Image source={require('../assets/images/confirm.png')} style={{ width: 40, height: 40 }} />
                    </View>
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

    picArea: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
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

    greenText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#05b9c4'
    },

    btnView: {
        backgroundColor: '#05b9c4',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    picStyle: {
        height: 100,
        width: 100,
        borderRadius: 50
    }
};

export default Profile;

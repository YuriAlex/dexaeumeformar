import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { ProfileItem, ProfilePic, ContentTextMinor, HeaderRegular } from './demf';


class Profile extends Component {

    render() {
        const { 
            container, picArea, greenText, backupArea, backupArea2, btnView
        } = styles;

        return (
            <View style={container}>
                <HeaderRegular headerText='Perfil' />
                <View style={picArea}>
                    <ProfilePic />
                    <Text style={greenText}>Alterar foto</Text>
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
};

export default Profile;

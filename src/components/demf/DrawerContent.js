import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableNativeFeedback, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ProfilePic } from './';

const items = [
    {
        id: 0,
        nome: 'Início',
        icon: require('../../assets/images/iconHome.png')
    },
    {
        id: 1,
        nome: 'Atividades Complementares',
        icon: require('../../assets/images/iconFaq.png')
    },
    {
        id: 2,
        nome: 'Matriz Curricular',
        icon: require('../../assets/images/iconMatriz.png')
    },
    {
        id: 3,
        nome: 'Semestres',
        icon: require('../../assets/images/iconSemestres.png')
    },
    {
        id: 4,
        nome: 'Perfil',
        icon: require('../../assets/images/iconPerfil.png')
    },
];

class DrawerContent extends Component {

    static propTypes = {
        closeDrawer: PropTypes.func.isRequired
    };

    ExitButton = () => {
        return (
            <TouchableNativeFeedback onPress={this.props.closeDrawer} >
                <View style={styles.exitStyle} >
                    <Image source={require('../../assets/images/iconSair.png')} style={{ height: 24, width: 24 }} />
                    <Text style={{ fontSize: 12, color: '#fff' }}>SAIR</Text>
                </View>
            </TouchableNativeFeedback>
        );
    };

    renderButtons() {
        return (
            items.map(item =>
                <MenuButton
                    key={item.id}
                    title={item.nome}
                    closeFunc={this.props.closeDrawer}
                    icon={item.icon}
                />
            )
        );
    }

    render() {
        const { containerStyle, btnContainer, headerStyle, picArea } = styles;

        return (
            <View style={containerStyle} >
                <View style={headerStyle}>
                    <TouchableNativeFeedback onPress={this.props.closeDrawer}>
                        <Image source={require('../../assets/images/menuclose.png')} style={{ width: 40, height: 40 }} />
                    </TouchableNativeFeedback>
                </View>
                <View style={picArea}>
                    <ProfilePic />
                </View>
                <View style={btnContainer} >
                    {this.renderButtons()}
                    {this.ExitButton()}
                </View>
            </View>
        );
    }
    
}

const MenuButton = ({ title, closeFunc, icon}) => {

    gotoPage = () => {
        closeFunc();

        switch (title) {
            case 'Início':
                Actions.home();
                break;
            case 'Atividades Complementares':
                Actions.atividadesList();
                break;
            case 'Matriz Curricular':
                Actions.matriz();
                break;
            case 'Semestres':
                Actions.semesterList();
                break;
            case 'Perfil':
                Actions.profile();
                break;
        }
    };
    const teste = '../../assets/images/iconPerfil.png'
    return (
        <TouchableNativeFeedback onPress={this.gotoPage.bind(this)} >
            <View style={[styles.btnStyle]} >
                <Image source={icon} style={styles.imageStyle} />
                <Text style={styles.txtStyle}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = {

    containerStyle: {
        height: '100%',
        width: '100%',
        backgroundColor: '#6563a4',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between' 
    },
    picArea: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center'
    },
    btnContainer: {
        marginTop: '10%',
        width: '100%'
    },
    btnStyle: {
        borderBottomWidth: 1,
        padding: 15,
        paddingLeft: '15%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#e7e7e750',
        position: 'relative'
    },
    txtStyle: {
        fontSize: 14,
        width: '75%',
        color: '#fff',
        marginTop: 3
    },
    imageStyle: {
        height: 24,
        width: 24,
        marginRight: '10%'
    },
    exitStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '20%',
        paddingTop: 25
    },
    headerStyle: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        padding: 15,
        marginBottom: 10
    }
};

export { DrawerContent };

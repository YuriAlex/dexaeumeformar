import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ProfilePic } from './';

const items = [
    {
        id: 0,
        nome: 'Início'
    },
    {
        id: 1,
        nome: 'Atividades Complementares'
    },
    {
        id: 2,
        nome: 'Matriz Curricular'
    },
    {
        id: 3,
        nome: 'Semestres'
    },
    {
        id: 4,
        nome: 'Perfil'
    },
];

class DrawerContent extends Component {

    static propTypes = {
        closeDrawer: PropTypes.func.isRequired
    };

    ExitButton = () => {
        return (
            <TouchableWithoutFeedback onPress={this.props.closeDrawer} >
                <View style={styles.exitStyle} >
                    <Image source={require('../../assets/images/logo.png')} style={{ height: 20, width: 20 }} />
                    <Text style={{ fontSize: 10, color: '#fff' }}>SAIR</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    renderButtons() {
        return (
            items.map(info =>
                <MenuButton
                    key={info.id}
                    title={info.nome}
                    closeFunc={this.props.closeDrawer}
                />
            )
        );
    }

    render() {
        const { containerStyle, btnContainer, headerStyle } = styles;

        return (
            <View style={containerStyle} >
                <View style={headerStyle}>
                    <TouchableWithoutFeedback onPress={this.props.closeDrawer}>
                        <Image source={require('../../assets/images/menuclose.png')} style={{ width: 40, height: 40 }} />
                    </TouchableWithoutFeedback>
                </View>
                <ProfilePic />
                <View style={btnContainer} >
                    {this.renderButtons()}
                    {this.ExitButton()}
                </View>
            </View>
        );
    }
    
}

const MenuButton = ({ title, closeFunc }) => {

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
    
    return (
        <TouchableWithoutFeedback onPress={this.gotoPage.bind(this)} >
            <View style={styles.btnStyle} >
                <Image source={require('../../assets/images/logo.png')} style={styles.imageStyle} />
                <Text style={styles.txtStyle}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
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
    btnContainer: {
        paddingTop: '5%',
        width: '100%'
    },
    btnStyle: {
        borderBottomWidth: 1,
        padding: 15,
        paddingLeft: '15%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#a8a8aa50',
        position: 'relative'
    },
    txtStyle: {
        fontSize: 12,
        width: '75%',
        color: '#fff'
    },
    imageStyle: {
        height: 20,
        width: 20,
        marginRight: '7.5%',
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

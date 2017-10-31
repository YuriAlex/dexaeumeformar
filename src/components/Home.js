import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import { HeaderHome, HomeItem, ProfilePic, DrawerContent } from './demf';

class Home extends Component {

    state = {
        toggle: () => {this.setState({ isOpen: !this.state.isOpen })},
        menuState: (isOpen) => {this.setState({ isOpen })}
    };

    componentWillMount() {
        this.setState({ screenWidth: Dimensions.get('window').width })
    }

    render() {

        const { toggle, screenWidth, menuState, isOpen } = this.state;

        const { 
            container, whiteArea, purpleArea1, purpleArea2, greenArea,
            welcomeText1, welcomeText2, matrizText, classesText, classesNum
        } = styles;

        return (
            <SideMenu
                menu={<DrawerContent closeDrawer={toggle.bind(this)} />}
                isOpen={isOpen}
                onChange={(isOpen) => menuState}
                openMenuOffset={screenWidth}
            >
                <View style={container}>
                    
                    <HeaderHome iconPress={toggle.bind(this)} headerText='DEXA EUME FORMAR' />
                    
                    <View style={whiteArea}>
                        <ProfilePic />
                        <Text style={welcomeText1}>Bem-vindo, Fulano!</Text>
                        <Text style={welcomeText2}>Aproveita o aplicativo e deixa tudo em ordem!</Text>
                    </View>

                    <View style={purpleArea1}>
                        <View style={purpleArea2}>
                            <Text style={classesText}>DISCIPLINAS CONCLUÍDAS</Text>
                            <Text style={classesNum}>0</Text>
                        </View>
                        <View style={purpleArea2}>
                            <Text style={classesText}>DISCIPLINAS RESTANTES</Text>
                            <Text style={classesNum}>0</Text>
                        </View>
                    </View>

                    <View style={greenArea}>
                        <Text style={matrizText}>JÁ CONFERIU A QUANTAS ANDA A MATRIZ?</Text>
                    </View>

                    <View>
                        <HomeItem
                            text1='Disciplinas Obrigatórias Concluídas'
                            text2='Vai dar certo!'
                            num='5'
                        />
                        <HomeItem
                            text1='Disciplinas Eletivas Concluídas'
                            text2='Vai dar certo!'
                            num='5'
                        />
                        <HomeItem
                            text1='Disciplinas Optativas Concluídas'
                            text2='Vai dar certo!'
                            num='5'
                        />
                    </View>
                </View>
            </ SideMenu>
        );
    }    
}

const styles = {

    container: {
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#fff'
    },

    whiteArea: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    purpleArea1: {
        backgroundColor: '#6563a4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '18%'
    },
    purpleArea2: {
        backgroundColor: '#6563a4',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
    },
    greenArea: {
        backgroundColor: '#05b9c4',
        flexDirection: 'row',
        width: '100%',
        height: '8%'
    },

    welcomeText1: {
        fontSize: 20,
        color: '#171721'
    },
    welcomeText2: {
        fontSize: 12,
        color: '#17172150'
    },
    classesText: {
        fontSize: 10,
        color: '#fff',
        width: 100,
        textAlign: 'center',
        alignItems: 'center',
    },
    classesNum: {
        fontSize: 36,
        color: '#fff'
    },
    matrizText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: 15,
        paddingLeft: 25
    }
};

export default Home;

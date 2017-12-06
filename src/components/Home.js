import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableNativeFeedback, AsyncStorage, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import { HeaderHome, HomeItem, DrawerContent } from './demf';
import ProfilePic from './demf/ProfilePic';

class Home extends Component {

    state = {
        toggle: () => {this.setState({ isOpen: !this.state.isOpen })},
        menuState: (isOpen) => {this.setState({ isOpen })},
        pointerEvents: 'auto',

        userName: '', userPic: ''
    };

    componentWillMount() {
        this.setState({ screenWidth: Dimensions.get('window').width })

        AsyncStorage.getItem('userData')
        .then(data => { this.handleUser(JSON.parse(data)) })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        return true
    }

    handleUser(data) { 
        this.setState({ userName: data.Nome })
    }

    applyLetterSpacing(string, count = 1) {
        return string.split('').join('\u200A'.repeat(count));
    }

    render() {

        const { toggle, screenWidth, menuState, isOpen, pointerEvents, userName, userPic } = this.state;

        const { 
            container, whiteArea, whiteArea2, welcomeText1, welcomeText2,
            purpleArea1, purpleArea2, greenArea, barsArea,
            matrizText, classesText, classesNum
        } = styles;

        return (
            <SideMenu
                menu={<DrawerContent closeDrawer={toggle.bind(this)} />}
                isOpen={isOpen}
                onChange={(isOpen) => menuState}
                openMenuOffset={screenWidth}
                disableGestures={true}
            >
                <View style={container} pointerEvents={pointerEvents} >
                    
                    <HeaderHome iconPress={toggle.bind(this)} headerText='DEXA EUME FORMAR' />
                    
                    <View style={whiteArea}>
                        <ProfilePic />
                        <View style={whiteArea2}>
                            <Text style={welcomeText1}>Bem-vindo, {userName}!</Text>
                            <Text style={welcomeText2}>Aproveita o aplicativo e deixa tudo em ordem!</Text>
                        </View>
                    </View>
                    
                    <TouchableNativeFeedback onPress={() => Actions.semesterList()}>
                        <View style={purpleArea1}>
                            <View style={purpleArea2}>
                                <Text style={classesText}>{this.applyLetterSpacing('DISCIPLINAS')}</Text>
                                <Text style={classesText}>{this.applyLetterSpacing('CONCLUÍDAS')}</Text>
                                <Text style={classesNum}>20</Text>
                            </View>
                            <View style={purpleArea2}>
                            <Text style={classesText}>{this.applyLetterSpacing('DISCIPLINAS')}</Text>
                            <Text style={classesText}>{this.applyLetterSpacing('RESTANTES')}</Text>
                                <Text style={classesNum}>20</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={() => Actions.matriz()}>
                        <View style={greenArea}>
                            <Text style={[matrizText, {paddingLeft: '7%'}]}>JÁ CONFERIU A QUANTAS ANDA A MATRIZ?</Text>
                            <Text style={[matrizText, {fontSize:20, paddingRight: '7.5%', paddingBottom: 3}]}>></Text>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={barsArea}>
                        <HomeItem 
                            onPress={() => Actions.matriz({ initialTab: 0 })}
                            text1='Disciplinas Obrigatórias Concluídas'
                            text2='Vai dar certo!'
                            num='5'
                        />
                        <HomeItem
                            onPress={() => Actions.matriz({ initialTab: 1 })}
                            text1='Disciplinas Eletivas Concluídas'
                            text2='Vai dar certo!'
                            num='5'
                        />
                        <HomeItem
                            onPress={() => Actions.matriz({ initialTab: 2 })}
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
        height: '30%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    whiteArea2: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        paddingBottom: '2%'
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
        marginTop: 10
    },
    greenArea: {
        backgroundColor: '#05b9c4',
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    welcomeText1: {
        fontSize: 22,
        color: '#000'
    },
    welcomeText2: {
        fontSize: 12,
        color: '#00000050'
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
        color: '#fff',
        marginTop: -5
    },
    matrizText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#fff'
    },
    barsArea: {
        height: '40%',
        position: 'absolute',
        bottom:'-8%',
        left:0,
        width: '100%'
    }
};

export default Home;

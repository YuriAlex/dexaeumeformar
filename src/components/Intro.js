import React, { Component } from 'react';
import { Text, View, Image, TouchableNativeFeedback, BackHandler } from 'react-native';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';

const Intro = props => {
    
    let s = {}
    if(props.index === 0)
        s = styles.imageLogo
    else
        s = styles.image

    return(
        <View style={styles.container}>
            <View style={{height: '50%', justifyContent: 'center',}}>
                <Image style={s} source={props.uri} />
            </View>
            <Text style={styles.title}> {props.tit} </Text>
            <Text style={styles.txt}> {props.txt} </Text>
        </View>
    )
};

const NextButton = props => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <View style={styles.btnView}>
            <Text style={styles.btnTxt}> { props.tit } </Text>
        </ View>
    </TouchableNativeFeedback>
);

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff'
    },

    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: -50
    },

    imageLogo: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        marginTop: -50
    },

    title: {
        paddingTop: 10,
        fontSize: 14,
        color: '#171721',
        alignSelf: 'center',
        fontWeight: 'bold'
    },

    txt: {
        paddingTop: 10,
        fontSize: 12,
        color: '#171721',
        alignSelf: 'center',
        textAlign: 'center',
        width: '75%',
        height: 50
    },

    btnView: {
        backgroundColor: '#6563a4',
        height: 60,
        justifyContent: 'center',
        
    },

    btnTxt: {
        fontSize: 12,
        color: '#fff',
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    }
};

const images = [
    {
        img: require('../assets/images/logo.png'),
        title: ' ',
        txt: 'Experimente uma nova forma de administrar sua matriz curricular.'
    },
    {
        img: require('../assets/images/walk01.png'),
        title: 'SINTA-SE EM CASA',
        txt: 'Mantenha suas cadeiras organizadas.'
    },
    {
        img: require('../assets/images/walk02.png'),
        title: 'ESCOLHA O SEU DESTINO',
        txt: 'Dê uma olhada nas cadeiras disponíveis para o seu curso.'
    },
    {
        img: require('../assets/images/walk03.png'),
        title: 'NÃO SE PERCA',
        txt: 'Tire dúvidas sobre suas atividades complementares de forma rápida e eficiente.'
    }
];

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSlider: images,
            btnText: 'AVANÇAR',
            current: 0
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        BackHandler.exitApp();
    }

    next() {
        if(this.state.current === 3) {
            Actions.login();
            return;
        }

        this.refs.swiper.scrollBy(1);
    }

    renderButton() {
        return(<NextButton onPress={this.next.bind(this)} tit={this.state.btnText} />);
    }

    lastSlide() {
        if(this.state.current != 3)
            this.state.current++;
        if(this.state.current === 3)
            this.setState({btnText: 'INICIAR'});
    }

    render() {
        return (
            <View style={styles.container}>
                <Swiper
                    activeDotColor={'rgba(5,185,196,1)'}
                    ref='swiper'
                    loop={false}
                    onIndexChanged={() => this.lastSlide()}
                >
                    {
                        this.state.imageSlider.map((item, i) => <Intro 
                            uri={item.img}
                            tit={item.title}
                            txt={item.txt}
                            index={i}
                            key={i}
                        />)
                    }
                </Swiper>
                
                {this.renderButton()}
            </View>
        );
    }
}

import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';

const Intro = props => (
    <View style={styles.container}>
        <Image style={styles.image} source={props.uri} />
        <Text style={styles.title}> {props.tit} </Text>
        <Text style={styles.txt}> {props.txt} </Text>
    </View> 
);

const NextButton = props => (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.btnView}>
            <Text style={styles.btnTxt}> { props.tit } </Text>
        </ View>
    </TouchableWithoutFeedback>
);

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },

    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: -50
    },

    title: {
        paddingTop: 30,
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
        width: '75%'
    },

    btnView: {
        backgroundColor: '#05b9c4',
        height: 50,
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
        title: '',
        txt: 'Experimente uma nova forma de administrar sua matriz curricular.',
        btn: 'AVANÇAR'
    },
    {
        img: require('../assets/images/walk01.png'),
        title: 'SINTA-SE EM CASA',
        txt: 'Mantenha suas cadeiras organizadas.',
        btn: 'AVANÇAR'
    },
    {
        img: require('../assets/images/walk02.png'),
        title: 'ESCOLHA O SEU DESTINO',
        txt: 'Saiba quais cadeiras são recomendadas para as trilhas do curso.',
        btn: 'AVANÇAR'
    },
    {
        img: require('../assets/images/walk03.png'),
        title: 'NÃO SE PERCA',
        txt: 'Gerencie suas atividades complementares de forma rápida eficiente.',
        btn: 'INICIAR'
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

    next() {
        if(this.state.current === 3) {
            Actions.home();
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
                    activeDotColor={'rgba(101,99,164,1)'}
                    ref='swiper'
                    loop={false}
                    onIndexChanged={() => this.lastSlide()}
                >
                    {
                        this.state.imageSlider.map((item, i) => <Intro 
                            uri={item.img}
                            tit={item.title}
                            txt={item.txt}
                            key={i}
                        />)
                    }
                </Swiper>
                
                {this.renderButton()}
            </View>
        );
    }
}

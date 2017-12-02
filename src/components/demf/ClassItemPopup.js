import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Image } from 'react-native';
import { ContentText } from './';

class ClassItemPopup extends Component{

    render() {
        return (
            <TouchableNativeFeedback onPress={this.props.onPress} >
                <View style={styles.containerStyle} >
                <Image source={require('../../assets/images/uncheck.png')} style={styles.imageStyle} />
                    <View style={styles.textStyle}>
                        <ContentText text={this.props.text}/>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = {

    containerStyle: {
        borderTopWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#e7e7e7',
        position: 'relative'
    },
    textStyle: {
        paddingTop: 10,
        paddingLeft: 20
    },
    imageStyle: {
        height: 40,
        width: 40,
        marginRight: 10
    }
};

export default ClassItemPopup;

import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import { ContentText } from './';

class ClassItem extends Component{

    renderIcon() {
        if(this.prop.done === true) {
            return(
            <Image source={require('../../assets/images/check.png')} style={styles.imageStyle} />
            );
        }
        else {
            return(
            <Image source={require('../../assets/images/uncheck.png')} style={styles.imageStyle} />
            );
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress} >
                <View style={styles.containerStyle} >
                    {this.renderIcon()}
                    <View style={styles.textStyle}>
                        <ContentText text={this.props.classInfo.Nome}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {

    containerStyle: {
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#a8a8aa50',
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

export default ClassItem;

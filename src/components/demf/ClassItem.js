import React, { Component } from 'react';
import { View, TouchableNativeFeedback, Image } from 'react-native';
import { ContentText } from './';

class ClassItem extends Component{

    state = { 
        checked: false
    };

    componentWillMount() {
        this.setState({checked: this.props.done});
    }

    renderIcon(done) {

        if(done === true) {
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
            <TouchableNativeFeedback onPress={this.props.onPress} >
                <View style={styles.containerStyle} >
                    {this.renderIcon(this.props.done)}
                    <View style={styles.textStyle}>
                        <ContentText text={this.props.classInfo.Nome}/>
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

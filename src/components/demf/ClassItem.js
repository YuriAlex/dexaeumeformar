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
                    <View style={styles.textContainer}>
                        <ContentText  text={this.props.classInfo.Nome}/>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
// style={{textAlign: 'center'}}

const styles = {

    containerStyle: {
        borderTopWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#e7e7e7',
        position: 'relative',
        alignItems: 'center'

    },
    textContainer: {
        paddingLeft: 20,
        width: '80%',
        flexDirection: 'row',
    },
    imageStyle: {
        height: 40,
        width: 40,
        marginRight: 10
    }
};

export default ClassItem;

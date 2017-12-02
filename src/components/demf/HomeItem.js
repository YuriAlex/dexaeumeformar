import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { ContentText, ContentTextMinor, ContentSubtext } from './';

const HomeItem = (props) => {
    const { containerStyle, dotStyle, textAreaStyle } = styles;

    return (<TouchableNativeFeedback onPress={props.onPress} >
                <View style={containerStyle} >
                    <Text style={dotStyle}>•</Text>
                    <View style={textAreaStyle} >
                        <ContentTextMinor text={props.text1} />
                        <ContentSubtext text={props.text2} />
                    </View>
                        <ContentText style={{marginTop: 40}} text={props.num} />
                </View>
            </TouchableNativeFeedback>
    );
};

const styles = {

    containerStyle: {
        borderBottomWidth: 1,
        height: '26.3%',
        paddingTop: '4%',
        paddingBottom: '4%',
        paddingLeft: '6%',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#e7e7e7',
        position: 'relative',
        alignItems: 'center'
    },
    dotStyle: {
        marginBottom: 10,
        fontSize: 40,
        color: '#05b9c4'
    },
    textAreaStyle: {
        paddingLeft: '5%',
        // paddingTop: '1%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '85%',
        height: '90%',
    }
};

export { HomeItem };
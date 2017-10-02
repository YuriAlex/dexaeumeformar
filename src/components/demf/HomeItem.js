import React from 'react';
import { View, Text } from 'react-native';
import { ContentText, ContentTextMinor, ContentSubtext } from './';

const HomeItem = (props) => {
    const { containerStyle, dotStyle, textAreaStyle } = styles;

    return (<View style={containerStyle} >
                <Text style={dotStyle}>•</Text>
                <View style={textAreaStyle} >
                    <ContentTextMinor text={props.text1} />
                    <ContentSubtext text={props.text2} />
                </View>
                    <ContentText text={props.num} />
            </View>
    );
};

const styles = {

    containerStyle: {
        borderBottomWidth: 1,
        height: 62,
        padding: 10,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#a8a8aa50',
        position: 'relative'
    },
    dotStyle: {
        marginTop: -16,
        paddingLeft: 10,
        fontSize: 40,
        color: '#05b9c4'
    },
    textAreaStyle: {
        paddingLeft: 20,
        paddingTop: 2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '85%',
        height: '90%',
    }
};

export { HomeItem };
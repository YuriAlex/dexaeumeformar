import React from 'react';
import { View, Text, TextInput } from 'react-native';

const ProfileItem = ({ label, value, placeholder }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={'#17172150'}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                underlineColorAndroid={'transparent'}
            />
        </View>
    );
};

const styles = {

    containerStyle: {
        borderBottomWidth: 1,
        height: 62,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column',
        borderColor: '#a8a8aa50',
        position: 'relative'
    },
    inputStyle: {
        color: '#171721',
        paddingRight: 5,
        paddingLeft: 20,
        paddingTop: -20,
        fontSize: 12
    },

    labelStyle: {
        fontSize: 8,
        paddingLeft: 20,
        paddingTop: 20,
        color: '#17172150'
    }
};

export { ProfileItem };

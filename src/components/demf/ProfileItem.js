import React from 'react';
import { View, Text, TextInput } from 'react-native';

const ProfileItem = ({ label, value, placeholder, onChangeText }) => {
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
                onChangeText={onChangeText}
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
        borderColor: '#e7e7e7',
        position: 'relative'
    },
    inputStyle: {
        color: '#171721',
        paddingRight: 5,
        paddingLeft: 20,
        paddingTop: -20,
        fontSize: 14
    },

    labelStyle: {
        fontSize: 8,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 5,
        color: '#17172150'
    }
};

export { ProfileItem };

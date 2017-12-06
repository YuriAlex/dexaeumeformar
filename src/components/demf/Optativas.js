import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import ClassItemMatriz from './ClassItemMatriz';

class Optativas extends Component {

    renderClasses() {
        if(this.props.disciplinas.length === 0)
            return;

        return (
            this.props.disciplinas.map(info =>
                <ClassItemMatriz
                    key={info.Id}
                    classInfo={info}
                    onPress={() => {}}
                    done={false}
                />
            )
        );
    };

    render() {
        
        return (
            <View style={styles.containerStyle} >
                <ScrollView>
                    {this.renderClasses()}
                </ScrollView>
            </View>
        );
        }
}

const styles = {

    containerStyle: {
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#fff'
    }
};

export { Optativas };

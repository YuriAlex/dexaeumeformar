import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import ClassItemMatriz from './ClassItemMatriz';

class Optativas extends Component {

    renderClasses() {
        if(this.props.disciplinas.length === 0)
            return;

        return (
            this.props.disciplinas.map(item =>{

                let done = false;
                if(this.props.feitas !== [])
                    done = this.props.feitas.some(f => f.IdDisciplina === item.Id)

                return(
                    <ClassItemMatriz
                        key={item.Id}
                        classInfo={item}
                        onPress={() => {}}
                        done={done}
                    />
                )
            })
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

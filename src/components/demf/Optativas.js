import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import ClassItemMatriz from './ClassItemMatriz';

class Optativas extends Component {

    state = {
        disciplinas: []
    };
    
    componentWillMount() {
        this.setState({ disciplinas: this.sortByNome(this.props.disciplinas) });
    }

    sortByNome(array) {
        array = array.sort((a, b) => a.Nome.localeCompare(b.Nome));
        return array;
    }

    renderClasses() {
        if(this.state.disciplinas.length === 0)
            return;

        return (
            this.state.disciplinas.map(info =>
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

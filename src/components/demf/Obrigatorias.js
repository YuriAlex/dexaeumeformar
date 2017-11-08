import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { PurpleTab } from './';
import ClassItem from './ClassItem';

class Obrigatorias extends Component {

    state = { 
        disciplinas: []
    };
    
    componentWillMount() {
        fetch(this.props.url)
        .then(response => response.json())
        .then(data => this.setState({ disciplinas: data }));
    }

    renderClasses(idSemestre) {
        let disc = this.state.disciplinas.filter(item => item.IdSemestre === idSemestre);

        return (
            disc.map(info =>
                <ClassItem
                    key={info.Id}
                    classInfo={info}
                    onPress={() => {}}
                    done={false}
                />
            )
        );
    };

    renderPurpleBar(idSemestre) {
        if(idSemestre === "4f8a5602-4bd9-a5d8-ba35-c0c9727f7055") {
            return(
                <PurpleTab text= '1º SEMESTRE' />
            );
        }
    }

    render() {
        return (
            <View style={styles.containerStyle} >
                <ScrollView>
                    {this.renderPurpleBar("4f8a5602-4bd9-a5d8-ba35-c0c9727f7055")}
                    {this.renderClasses("4f8a5602-4bd9-a5d8-ba35-c0c9727f7055")}
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

export { Obrigatorias };

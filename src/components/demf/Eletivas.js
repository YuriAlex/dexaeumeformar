import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import ClassItem from './ClassItem';

class Eletivas extends Component {

    state = { 
        disciplinas: []
    };
    
    componentWillMount() {
        fetch(this.props.url)
        .then(response => response.json())
        .then(data => this.setState({ disciplinas: data }));
    }

    renderClasses() {
        return (
            this.state.disciplinas.map(info =>
                <ClassItem
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

export { Eletivas };

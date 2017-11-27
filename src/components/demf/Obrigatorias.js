import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { PurpleTab } from './';
import ClassItemMatriz from './ClassItemMatriz';

class Obrigatorias extends Component {

    state = {
        holder: [],
        
    }

    componentWillMount() {

        let d1 = [];
        let d2 = [];
        let d3 = [];
        let d4 = [];
        let d5 = [];
        let d6 = [];
        let d7 = [];
        let d8 = [];

        this.props.disciplinas.map(item =>{

            if(item.NumeroSemestre === 1)
                d1.push(item)
            else if(item.NumeroSemestre === 2)
                d2.push(item)
            else if(item.NumeroSemestre === 3)
                d3.push(item)
            else if(item.NumeroSemestre === 4)
                d4.push(item)
            else if(item.NumeroSemestre === 5)
                d5.push(item)
            else if(item.NumeroSemestre === 6)
                d6.push(item)
            else if(item.NumeroSemestre === 7)
                d7.push(item)
            else if(item.NumeroSemestre === 8)
                d8.push(item)    
        })

        let temp = [];
        
        temp.push(this.sortByNome(d1));
        temp.push(this.sortByNome(d2));
        temp.push(this.sortByNome(d3));
        temp.push(this.sortByNome(d4));
        temp.push(this.sortByNome(d5));
        temp.push(this.sortByNome(d6));
        temp.push(this.sortByNome(d7));
        temp.push(this.sortByNome(d8));

        this.setState({ holder: temp });
    }
    
    sortByNome(array) {
        array = array.sort((a, b) => a.Nome.localeCompare(b.Nome));
        return array;
    }

    renderClasses(pos) {
        if(this.state.holder[pos].length === 0)
            return;

        return (
            this.state.holder[pos].map(item =>
                <ClassItemMatriz
                    key={item.Id}
                    classInfo={item}
                    onPress={() => {}}
                    done={false}
                />
            )
        );
    };

    renderPurpleBar(pos) {
        if(this.state.holder[pos].length === 0)
            return;

        return(
            <View>
                <PurpleTab text= {(pos+1).toString() + 'º SEMESTRE'} />
            </View>
        )
    }

    manageDisciplinas() {

        if(this.state.holder.length === 0)
            return;

        return (
            this.state.holder.map((data, index, array) =>
                <View key={index}>
                    {this.renderPurpleBar(index)}
                    {this.renderClasses(index)}
                </View>
            )
        )
    }

    render() {
        return (
            <View style={styles.containerStyle} >
                <ScrollView>
                    {this.manageDisciplinas()}
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

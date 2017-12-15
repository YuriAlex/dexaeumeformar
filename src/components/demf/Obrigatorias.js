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
        console.log(this.props)
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
        
        temp.push(d1);
        temp.push(d2);
        temp.push(d3);
        temp.push(d4);
        temp.push(d5);
        temp.push(d6);
        temp.push(d7);
        temp.push(d8);

        this.setState({ holder: temp });
    }

    renderClasses(pos) {
        if(this.state.holder[pos].length === 0)
            return;

        return (
            this.state.holder[pos].map(item =>{

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

    gotoSemester() {
        
    }

    renderPurpleBar(pos) {
        if(this.state.holder[pos].length === 0)
            return;

        return(
            <View>
                <PurpleTab text= {this.applyLetterSpacing((pos+1).toString() + 'º SEMESTRE')} />
            </View>
        )
    }

    applyLetterSpacing(string, count = 1) {
        return string.split('').join('\u200A'.repeat(count));
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

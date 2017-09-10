import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, SemesterSquare } from './';

const semData = [
    {
        id: 1,
        semesterOrder: 'Primeiro',
        doneNum: 0
    },
    {
        id: 2,
        semesterOrder: 'Segundo',
        doneNum: 0
    },
    {
        id: 3,
        semesterOrder: 'Terceiro',
        doneNum: 0
    },
    {
        id: 4,
        semesterOrder: 'Quarto',
        doneNum: 0
    },
    {
        id: 5,
        semesterOrder: 'Quinto',
        doneNum: 0
    },
    {
        id: 6,
        semesterOrder: 'Sexto',
        doneNum: 0
    },
    {
        id: 7,
        semesterOrder: 'Sétimo',
        doneNum: 0
    },
    {
        id: 8,
        semesterOrder: 'Oitavo',
        doneNum: 0
    },
];


class Semester extends Component {
    
    componentWillMount() {
        
    }

    renderRows = (a, b) => {
        const { rowStyle } = styles;

        return (
            <View style={rowStyle}>
                <SemesterSquare semInfo={semData[a]} />
                <SemesterSquare semInfo={semData[b]} />
            </View>
        );
    }

    render() {
        return (
            <View>
                <Header headerText='Semestres' />

                <View 
                    style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center', }}
                >
                    {this.renderRows(0, 1)}
                    {this.renderRows(2, 3)}
                    {this.renderRows(4, 5)}
                    {this.renderRows(6, 7)}
                </View>
                
            </View>
        );
    }    
}

/* <View style={rowStyle}>
    {semData.map(info =>
        <SemesterSquare 
        onPress={this.semPress.bind(this)}
        key={info.id}
        semInfo={info}
        />
    )}
</View> */

const styles = {

    rowStyle: {
        backgroundColor: '#F8F8F8',
        flexDirection: 'row',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2
    }
};

export default Semester;

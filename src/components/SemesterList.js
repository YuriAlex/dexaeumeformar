import React, { Component } from 'react';
import { View, Dimensions, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import { HeaderRegular, SemesterSquare, DrawerContent } from './demf';

class Semester extends Component {    

    state = {
        toggle: () => {this.setState({ isOpen: !this.state.isOpen })},
        menuState: (isOpen) => {this.setState({ isOpen })},

        semestres: [],
        disciplinasFeitas: []
    };

    componentWillMount() {
        this.setState({ screenWidth: Dimensions.get('window').width });

        AsyncStorage.getItem('semestres')
        .then(data => {
            this.setState({ semestres: this.sortByOrdem(JSON.parse(data)) });
        })

        AsyncStorage.getItem('disciplinasFeitas')
        .then(data => {
            this.setState({ disciplinasFeitas: this.sortByOrdem(JSON.parse(data)) });
        })
    }

    sortByOrdem(array) {
        return array.sort(function(a, b) {
            var x = a.Ordem; var y = b.Ordem;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    
    gotoSemester = semestre => {
        let disc = [];

        AsyncStorage.getItem('disciplinas')
        .then(data => {

            JSON.parse(data).map(item =>{
                if(item.IdSemestre === semestre.Id)
                    disc.push(item)
            })
            
            if(semestre.QuantidadeOptativas === 0)
                Actions.semester({ semestre: semestre, disciplinas: disc })
            else {
                AsyncStorage.getItem('optativasModal')
                .then(data => {
                    Actions.semester({ semestre: semestre, disciplinas: disc, modalOptativas: JSON.parse(data) });
                })
            }
        })
    }

    renderRows = (a, b) => {
        const { rowStyle } = styles;
        const h = (Dimensions.get('window').height / 4) - 20;

        if(this.state.semestres === undefined || this.state.semestres.length === 0)
            return;
        
        const semestres =  this.state.semestres;
        let qntFeitasA = 0;
        let qntFeitasB = 0;

        this.state.disciplinasFeitas.map(item =>{
            if(item.IdSemestre === semestres[a].Id)
                qntFeitasA++;
            else if((item.IdSemestre === semestres[b].Id))
                qntFeitasB++
        })

        return (
            <View style={rowStyle}>
                <SemesterSquare semInfo={
                    semestres[a]} semHeight={h} qtdFeitas={qntFeitasA} onPress={() => this.gotoSemester(semestres[a])} />
                <SemesterSquare semInfo={
                    semestres[b]} semHeight={h} qtdFeitas={qntFeitasB} onPress={() => this.gotoSemester(semestres[b])
                } />
            </View>
        );
    }

    render() {
        const { toggle, screenWidth, menuState, isOpen } = this.state;

        return (
            <SideMenu
                menu={<DrawerContent closeDrawer={toggle.bind(this)} />}
                isOpen={isOpen}
                onChange={(isOpen) => menuState}
                openMenuOffset={screenWidth}
                disableGestures={true}
            >
                <View 
                    style={{
                        flexDirection: 'column',
                        height: '100%',
                        backgroundColor: '#fff'
                    }}

                    onLayout={this.onLayout}        
                >
                    <HeaderRegular iconPress={toggle.bind(this)} headerText='Semestres' />
                    {this.renderRows(0, 1)}
                    {this.renderRows(2, 3)}
                    {this.renderRows(4, 5)}
                    {this.renderRows(6, 7)}
                </View>
            </SideMenu>
        );
    }
    
    onLayout = event => {
        const { width, height } = event.nativeEvent.layout;
        this.setState({width, height})
    }
}

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

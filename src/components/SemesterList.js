import React, { Component } from 'react';
import { View, Dimensions, AsyncStorage } from 'react-native';
import SideMenu from 'react-native-side-menu';
import { HeaderRegular, SemesterSquare, DrawerContent } from './demf';

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

    state = {
        toggle: () => {this.setState({ isOpen: !this.state.isOpen })},
        menuState: (isOpen) => {this.setState({ isOpen })},

        semestres:[]
    };

    componentWillMount() {
        this.setState({ screenWidth: Dimensions.get('window').width });

        fetch('http://104.41.36.75:3070/semestre?idCurso=f7c44ded-9fc7-604b-94db-6d72446a10bb')
        .then(response => response.json())
        .then(data => this.setState({ semestres: data }));

        
    }

    componentDidMount() {
        var s = this.state.semestres;
        console.log(s);
        // AsyncStorage.setItem('semestres', JSON.stringify(this.state.semestres));
        AsyncStorage.setItem('teste', 'teste');
    }

    sortByOrdem(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    renderRows = (a, b) => {
        const { rowStyle } = styles;
        const h = (Dimensions.get('window').height / 4) - 20;

        return (
            <View style={rowStyle}>
                <SemesterSquare semInfo={semData[a]} semHeight={h} />
                <SemesterSquare semInfo={semData[b]} semHeight={h} />
            </View>
        );
    }

    render() {
        // console.log(this.state.semestres);
        // var a = JSON.stringify(this.state.semestres);
        // console.log(a);
        // var b = JSON.parse(a);
        // console.log(b);

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
                        justifyContent: 'center',
                        alignItems: 'center'
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
